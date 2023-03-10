using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Client;
using PiRiS_back.Enums;
using PiRiS_back.Models;
using PiRiS_back.ViewModels;
using System.ComponentModel.DataAnnotations;
using static PiRiS_back.Services.UserInfoFillerService;
using System.Text.RegularExpressions;
using System.Diagnostics.Contracts;
using System.Security.Principal;

namespace PiRiS_back.Services
{
    public class ContractsServiceSingletone
    {
        private AccountsService _accountsService;
        public DateTime AppDateTime { get; set; }
        readonly IOptions<BankAccConfig> _config;
        public ContractsServiceSingletone(AccountsService accountsService, IOptions<BankAccConfig> config)
        {
            AppDateTime = DateTime.Now;
            _accountsService = accountsService;
            _config = config;
        }

        public async Task<List<AccountStatesViewModel>> GetUserTransactionsAsync(string userName, ApplicationDbContext context)
        {
            var user = await context.Users.FirstAsync(u => u.UserName == userName);
            try
            {
                return context.Accounts.Where(acc => acc.UserId == user.Id).Select(acc => new AccountStatesViewModel()
                {
                    Account = acc,
                    TransactionList = context.Transactions.Include(tr => tr.Currency).Where(tr => tr.NumberFrom == acc.Number || tr.NumberTo == acc.Number)
                        .OrderByDescending(tr => tr.Id).Select(tr => new TransactionViewModel(tr, acc, tr.Currency)).ToList(),
                }
                ).ToList();
            } catch (NullReferenceException)
            {
                throw new TransactionValidationException($"No transactions found for user: {userName}!");
            }
        }

        public async Task<List<AccountStatesViewModel>> GetBankTransactionsAsync(ApplicationDbContext context)
        {
            try
            {
                return await context.Accounts.Where(acc => acc.Code == _config.Value.BankAccountPassive || acc.Code == _config.Value.BankAccountActive)
                    .Select(acc => new AccountStatesViewModel()
                    {
                        Account = acc,
                        TransactionList = context.Transactions.Include(tr => tr.Currency).Where(tr => tr.NumberFrom == acc.Number || tr.NumberTo == acc.Number)
                        .OrderByDescending(tr => tr.Id).Select(tr => new TransactionViewModel(tr, acc, tr.Currency)).ToList(),
                    }).ToListAsync();
            }
            catch (NullReferenceException)
            {
                throw new TransactionValidationException($"No transactions found for bank!");
            }
        }

        public async Task SignDebetContractAsync(ContractViewModel contract, string userName, ApplicationDbContext context, AccountsService accountsService)
        {
            await validateContractAsync(contract, context);
            var user = await context.Users.FirstAsync(u => u.UserName == userName);
            var bankAcountActive = await context.Accounts.Include(ac => ac.Currency).FirstAsync(ac => ac.Code == _config.Value.BankAccountActive);
            var bankAccountPassive = await context.Accounts.Include(ac => ac.Currency).FirstAsync(ac => ac.Code == _config.Value.BankAccountPassive);
            var contractCurrency = await context.Currencies.FirstOrDefaultAsync(cur => cur.Name == contract.Currency);
            if (contractCurrency is null) throw new ContractValidationException($"Неизвестная валюта: {contract.Currency}!");

            var code = await generateAccountCodeNumberAsync(user.Id, true, context);
            var newAccountForMainSum = new Account()
            {
                UserId = user.Id,
                Code = code.ToString(),
                Pin = "0000",
                Number = generateAccountNumber(user.Id),
                Debet = 0,
                Credit = 0,
                Currency = contractCurrency,
                IsActive = false
            };
            var newAccountForPercents = new Account()
            {
                UserId = user.Id,
                Code = (code+1).ToString(),
                Pin = "0000",
                Number = generateAccountNumber(user.Id),
                Debet = 0,
                Credit = 0,
                Currency = contractCurrency,
                IsActive = false
            };

            await accountsService.CreateTransactionAsync("", false, newAccountForMainSum.Number, true, contract.Sum, contractCurrency, context, AppDateTime); //To cassa debet
            await accountsService.CreateTransactionAsync(bankAcountActive, false, newAccountForMainSum, false, contract.Sum, contractCurrency, context, AppDateTime); //From cassa credit to main credit
            //if(contract.IsRequestable == false) 
                await accountsService.CreateTransactionAsync(newAccountForMainSum, true, bankAccountPassive, false, contract.Sum, contractCurrency, context, AppDateTime); //From main debet to bank credit

            var newContract = new DebetContract()
            {
                DebetContractOptionId = contract.OptionId ?? -1,
                Number = contract.Number,
                Account1 = newAccountForMainSum,
                Account2 = newAccountForPercents,
                PersonSurname = contract.PersonSurname,
                PersonName = contract.PersonName,
                PersonMiddlename = contract.PersonMiddlename,
                PassportSeria = contract.PassportSeria,
                PassportNumber = contract.PassportNumber,
                PassportIdentityNumber = contract.PassportIdentityNumber,
                CityLivingId = context.Cities.First(cit => cit.Name == contract.CityLiving).Id,
                AddressLiving = contract.AddressLiving,
                Sum = contract.Sum,
                CurrencyId = context.Currencies.First(cur => cur.Name == contract.Currency).Id,
                PercentPerYear = contract.PercentPerYear,
                StartDate = AppDateTime,
                EndDate = AppDateTime.AddMonths(contract.DurationMonth)
            };

            await context.Accounts.AddAsync(newAccountForMainSum);
            await context.Accounts.AddAsync(newAccountForPercents);
            await context.DebetContracts.AddAsync(newContract);
            await context.SaveChangesAsync();
        }

        public async Task SignCreditContractAsync(ContractViewModel contract, string userName, ApplicationDbContext context, AccountsService accountsService)
        {
            await validateContractAsync(contract, context);
            var user = await context.Users.FirstAsync(u => u.UserName == userName);
            var bankAcountActive = await context.Accounts.FirstAsync(ac => ac.Code == _config.Value.BankAccountActive);
            var bankAccountPassive = await context.Accounts.FirstAsync(ac => ac.Code == _config.Value.BankAccountPassive);
            var contractCurrency = await context.Currencies.FirstOrDefaultAsync(cur => cur.Name == contract.Currency);
            if (contractCurrency is null) throw new ContractValidationException($"Неизвестная валюта: {contract.Currency}!");

            var code = await generateAccountCodeNumberAsync(user.Id, false, context);
            var newAccountForMainSum = new Account()
            {
                UserId = user.Id,
                Code = code.ToString(),
                Pin = "0000",
                Number = generateAccountNumber(user.Id),
                Debet = 0,
                Credit = 0,
                Currency = contractCurrency,
                IsActive = true
            };
            var newAccountForPercents = new Account()
            {
                UserId = user.Id,
                Number = generateAccountNumber(user.Id),
                Code = (code+1).ToString(),
                Pin = "0000",
                Debet = 0,
                Credit = 0,
                Currency = contractCurrency,
                IsActive = true
            };

            await accountsService.CreateTransactionAsync(bankAccountPassive, true, newAccountForMainSum, true, contract.Sum, contractCurrency, context, AppDateTime); //From bank debet to main debet
            //await accountsService.CreateTransactionAsync(newAccountForMainSum, false, bankAcountActive, true, contract.Sum, contractCurrency, context, AppDateTime); //From main credit to cassa debet
            //await accountsService.CreateTransactionAsync(newAccountForMainSum.Number, false, "", false, contract.Sum, contractCurrency, context, AppDateTime); //From cassa credit


            var newContract = new CreditContract()
            {
                CreditContractOptionId = contract.OptionId ?? -1,
                Number = contract.Number,
                Account1 = newAccountForMainSum,
                Account2 = newAccountForPercents,
                PersonSurname = contract.PersonSurname,
                PersonName = contract.PersonName,
                PersonMiddlename = contract.PersonMiddlename,
                PassportSeria = contract.PassportSeria,
                PassportNumber = contract.PassportNumber,
                PassportIdentityNumber = contract.PassportIdentityNumber,
                CityLivingId = context.Cities.First(cit => cit.Name == contract.CityLiving).Id,
                AddressLiving = contract.AddressLiving,
                Sum = contract.Sum,
                CurrencyId = context.Currencies.First(cur => cur.Name == contract.Currency).Id,
                PercentPerYear = contract.PercentPerYear,
                StartDate = AppDateTime,
                EndDate = AppDateTime.AddMonths(contract.DurationMonth)
            };

            await context.Accounts.AddAsync(newAccountForMainSum);
            await context.Accounts.AddAsync(newAccountForPercents);
            await context.CreditContracts.AddAsync(newContract);
            await context.SaveChangesAsync();
        }

        private async Task validateContractAsync(ContractViewModel contract, ApplicationDbContext context)
        {
            contract.StartDate = AppDateTime;
            contract.EndDate = AppDateTime.AddMonths(contract.DurationMonth);

            if (contract.IsDifferentive is not null && !context.CreditContractOptions.Any(co => co.Id == contract.OptionId && co.Name == contract.Name)) throw new ContractValidationException("Не найден выбраный кредитный план (либо его имя не совпадает с ситемным)");
            if (contract.IsRequestable is not null && !context.DebetContractOptions.Any(co => co.Id == contract.OptionId && co.Name == contract.Name)) throw new ContractValidationException("Не найден выбраный дебеторский план (либо его имя не совпадает с ситемным)");
            if(!Regex.IsMatch(contract.Number, @"^\d{12}$")) throw new ContractValidationException("Неверный номер договора (должен состоять из 12 цифр)");
            if ((await context.DebetContracts.AnyAsync(dc => dc.Number == contract.Number)) || (await context.CreditContracts.AnyAsync(cc => cc.Number == contract.Number)))
                throw new ContractValidationException("Договор с таким номером уже существует!");
            //if (contract.StartDate?.AddMonths(contract.DurationMonth) != contract.EndDate) throw new ContractValidationException("Дата начала + Длительность в месяцах не равняется дате окончания");

            if (String.IsNullOrEmpty(contract.PersonName)) throw new ContractValidationException("Имя не должно быть пустым!");
            if (!Regex.IsMatch(contract.PersonName, @"^\w.+?$")) throw new ContractValidationException("Неверное имя!");
            if (String.IsNullOrEmpty(contract.PersonSurname)) throw new ContractValidationException("Фамилия не должна быть пустой!");
            if (!Regex.IsMatch(contract.PersonSurname, @"^\w.+?$")) throw new ContractValidationException("Неверная фамилия!");
            if (String.IsNullOrEmpty(contract.PersonMiddlename)) throw new ContractValidationException("Отчество не должно быть пустым!");
            if (!Regex.IsMatch(contract.PersonMiddlename, @"^\w.+?$")) throw new ContractValidationException("Неверное отчество!");

            if (String.IsNullOrEmpty(contract.PassportSeria)) throw new ContractValidationException("Серия паспорта не должна быть пустой!");
            if (!Regex.IsMatch(contract.PassportSeria, @"^\w{2}$")) throw new ContractValidationException("Неверная серия пасспорта!");
            if (String.IsNullOrEmpty(contract.PassportNumber)) throw new ContractValidationException("Номер паспорта не должен быть пустым!");
            if (!Regex.IsMatch(contract.PassportNumber, @"^\d{7}$")) throw new ContractValidationException("Неверный номер паспорта!");
            if (String.IsNullOrEmpty(contract.PassportIdentityNumber)) throw new ContractValidationException("Идентификационный номер паспорта не должен быть пустым!");
            if (!Regex.IsMatch(contract.PassportIdentityNumber, @"^\d{7}\w\d{3}\w{2}\d$")) throw new ContractValidationException("Неверный идентификационный номер паспорта!");
        }

        private async Task<long> generateAccountCodeNumberAsync(int userId, bool isDebet, ApplicationDbContext context)
        {
            long maxNumber = 0;
            if (isDebet && await context.DebetContracts.AnyAsync())
            {
                maxNumber = await context.DebetContracts.MaxAsync(dc => System.Convert.ToInt64(dc.Number));
            }
            if(!isDebet && await context.CreditContracts.AnyAsync())
            {
                maxNumber = await context.CreditContracts.MaxAsync(cc => System.Convert.ToInt64(cc.Number));
            }
            if (maxNumber == 0) return isDebet ? 3000 : 2000;
            return maxNumber + 1;
        }

        private string generateAccountNumber(int userId)
        {
            long now = (DateTime.Now.Ticks) & 0xFF_FF_FF_FF_FF; //BY06MMBN{0}
            return String.Format("{0:D4}{1:D12}", userId, now);
        }

        public async Task<string> GetContractNumberAsync(ApplicationDbContext context, int optionId, int userId, bool isDebet = true)
        {
            var contractsLastId = 0;
            if(isDebet ? await context.DebetContracts.AnyAsync() : await context.CreditContracts.AnyAsync())
                contractsLastId = isDebet? await context.DebetContracts.MaxAsync(op => op.Id) : await context.CreditContracts.MaxAsync(op => op.Id);

            string res = String.Format("{0:D1}{1:D5}{2:D3}{3:D3}", isDebet ? 2 : 3, contractsLastId, optionId, userId);
            return res;
        }

        public async Task SkipDayAsync(ApplicationDbContext context, AccountsService accountsService)
        {
            AppDateTime += TimeSpan.FromDays(1);
            await closeBankDay(context, accountsService);
        }

        public async Task SkipMonthAsync(ApplicationDbContext context, AccountsService accountsService)
        {
            var finishDate = AppDateTime.AddMonths(1);
            while(AppDateTime < finishDate) await SkipDayAsync(context, accountsService);
        }

        private async Task closeBankDay(ApplicationDbContext context, AccountsService accountsService)
        {
            var bankAccountPassive = await context.Accounts.Include(ac => ac.Currency).FirstAsync(ac => ac.Code == _config.Value.BankAccountPassive);

            foreach (var dc in await context.DebetContracts.Include(dc => dc.Account1).Include(dc => dc.Account2).Include(dc => dc.Currency).ToListAsync())
            {
                if (dc.StartDate >= AppDateTime) continue;
                var dco = await context.DebetContractOptions.FirstAsync(dco => dco.Id == dc.DebetContractOptionId);
                var monthGone = (AppDateTime - dc.StartDate).TotalDays / 30d;
                if (dc.EndDate >= AppDateTime && isInteger(monthGone)) //fullfilling percents
                {
                    if(dco.IsRequestable)
                    {
                        var mainAcc = await context.Accounts.FirstAsync(acc => acc.Id == dc.Account1Id);
                        var percentsSum = mainAcc.Credit * (dc.PercentPerYear / 12);
                        await accountsService.CreateTransactionAsync(bankAccountPassive, true, dc.Account2, false, percentsSum, dc.Currency, context, AppDateTime);
                    }
                }
                if((dc.EndDate.Day == AppDateTime.Day && dc.EndDate.Month == AppDateTime.Month && dc.EndDate.Year == AppDateTime.Year) && !dco.IsRequestable) //deposit end
                {
                    var duration = (int)Math.Round((dc.EndDate - dc.StartDate).TotalDays / 30d);
                    await accountsService.CreateTransactionAsync(bankAccountPassive, true, dc.Account2, false, dc.Sum * (dc.PercentPerYear * duration / 12), dc.Currency, context, AppDateTime); //percents
                    await accountsService.CreateTransactionAsync(bankAccountPassive, true, dc.Account1, false, dc.Sum, dc.Currency, context, AppDateTime); //body
                }
            }
            foreach (var cc in await context.CreditContracts.Include(cc => cc.Account1).Include(cc => cc.Account2).Include(dc => dc.Currency).ToListAsync())
            {
                if (cc.StartDate >= AppDateTime) continue;
                var cco = await context.CreditContractOptions.FirstAsync(cco => cco.Id == cc.CreditContractOptionId);
                var monthGone = (AppDateTime - cc.StartDate).TotalDays / 30d;
                double monthDuration = (cc.EndDate.Month - cc.StartDate.Month) + 12 *(cc.EndDate.Year - cc.StartDate.Year);
                if (cc.EndDate >= AppDateTime && isInteger(monthGone)) //paying percents
                {
                    if (cco.IsDifferentive)
                    {
                        var percentsToPay = (cc.PercentPerYear / 12) * (cc.Sum * (decimal)((monthDuration - monthGone + 1) / monthDuration));
                        var bodyToPay = cc.Sum * (decimal)(1 / monthDuration);
                        await accountsService.CreateTransactionAsync(cc.Account2, false, bankAccountPassive, false, percentsToPay, cc.Currency, context, AppDateTime);
                        await accountsService.CreateTransactionAsync(cc.Account1, false, bankAccountPassive, false, bodyToPay, cc.Currency, context, AppDateTime);
                    } else
                    {
                        var percMonth = (cc.PercentPerYear / 12);
                        var divider = (decimal)Math.Pow(1 + (double)percMonth, monthDuration) - 1;
                        var firstBody = cc.Sum * percMonth / divider;
                        var curBody = firstBody * (decimal)Math.Pow((double)(1+percMonth), monthGone-1);
                        var curPerc = cc.Sum * percMonth - (firstBody * (decimal)(Math.Pow(1+(double)percMonth, monthGone - 1) -1));

                        await accountsService.CreateTransactionAsync(cc.Account2, false, bankAccountPassive, false, curPerc, cc.Currency, context, AppDateTime);
                        await accountsService.CreateTransactionAsync(cc.Account1, false, bankAccountPassive, false, curBody, cc.Currency, context, AppDateTime);
                    }
                }
                if (cc.EndDate.Day == AppDateTime.Day && cc.EndDate.Month == AppDateTime.Month && cc.EndDate.Year == AppDateTime.Year) //credit end
                {
                    //await accountsService.CreateTransactionAsync(cc.Account1, false, bankAccountPassive, false, cc.Sum, cc.Currency, context, AppDateTime);
                }
            }
            await context.SaveChangesAsync();
        }

        private bool isInteger(double num)
        {
            int doubleToInt = (int)num;
            return Math.Abs(num - doubleToInt) < 0.02;
        }
    }

    public class ContractValidationException : ValidationException
    {
        public ContractValidationException(string message) : base(message) { }
        public ContractValidationException() : base() { }
    }

    public class TransactionValidationException : ValidationException
    {
        public TransactionValidationException(string message) : base(message) { }
        public TransactionValidationException() : base() { }
    }
}