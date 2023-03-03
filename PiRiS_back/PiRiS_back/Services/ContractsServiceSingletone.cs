using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Client;
using PiRiS_back.Enums;
using PiRiS_back.Models;
using PiRiS_back.ViewModels;
using System.ComponentModel.DataAnnotations;

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

        public async Task<List<Transaction>> GetUserTransactionsAsync(string userName, ApplicationDbContext context)
        {
            var user = await context.Users.FirstAsync(u => u.UserName == userName);
            try
            {
                var userAccounts = context.Accounts.Where(acc => acc.UserId == user.Id).Select(acc => acc.Number);
                return await context.Transactions.Where(tr => userAccounts.Contains(tr.NumberFrom) || userAccounts.Contains(tr.NumberTo)).ToListAsync();
            } catch (NullReferenceException)
            {
                throw new TransactionValidationException($"No transactions found for user: {userName}!");
            }
            
        }

        public async Task SignDebetContractAsync(ContractViewModel contract, string userName, ApplicationDbContext context, AccountsService accountsService)
        {
            var user = await context.Users.FirstAsync(u => u.UserName == userName);
            var bankAcountActive = await context.Accounts.FirstAsync(ac => ac.Number == _config.Value.BankAccountActive);
            var bankAccountPassive = await context.Accounts.FirstAsync(ac => ac.Number == _config.Value.BankAccountPassive);

            var newAccountForMainSum = new Account()
            {
               UserId = user.Id,
               Number = "", //TODO
               Debet = 0,
               Credit = 0,
               IsActive = false
            };
            var newAccountForPercents = new Account()
            {
                UserId = user.Id,
                Number = "", //TODO
                Debet = 0,
                Credit = 0,
                IsActive = false
            };

            await accountsService.CreateTransactionAsync("", false, newAccountForMainSum.Number, true, contract.Sum, context, AppDateTime); //To cassa debet
            await accountsService.CreateTransactionAsync(bankAcountActive, false, newAccountForMainSum, false, contract.Sum, context, AppDateTime); //From cassa credit to main credit
            await accountsService.CreateTransactionAsync(newAccountForMainSum, true, bankAccountPassive, false, contract.Sum, context, AppDateTime); //From main debet to bank credit

            var newContract = new DebetContract()//TODO
            {
                DebetContractOptionId = contract.OptionId ?? -1,
                Account1 = newAccountForMainSum,
                Account2 = newAccountForPercents,
                PersonSurname = contract.PersonSurname,
                PersonName = contract.PersonName,
                PersonMiddlename = contract.PersonMiddlename,
                Sum = contract.Sum,
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
            var user = await context.Users.FirstAsync(u => u.UserName == userName);
            var bankAcountActive = await context.Accounts.FirstAsync(ac => ac.Number == _config.Value.BankAccountActive);
            var bankAccountPassive = await context.Accounts.FirstAsync(ac => ac.Number == _config.Value.BankAccountPassive);

            var newAccountForMainSum = new Account()
            {
                UserId = user.Id,
                Number = "", //TODO
                Debet = 0,
                Credit = 0,
                IsActive = true
            };
            var newAccountForPercents = new Account()
            {
                UserId = user.Id,
                Number = "", //TODO
                Debet = 0,
                Credit = 0,
                IsActive = true
            };

            await accountsService.CreateTransactionAsync(bankAccountPassive, true, newAccountForMainSum, true, contract.Sum, context, AppDateTime); //From bank debet to main debet
            await accountsService.CreateTransactionAsync(newAccountForMainSum, false, bankAcountActive, true, contract.Sum, context, AppDateTime); //From main credit to cassa debet
            await accountsService.CreateTransactionAsync(newAccountForMainSum.Number, false, "", false, contract.Sum, context, AppDateTime); //From cassa credit


            var newContract = new CreditContract()//TODO
            {
                CreditContractOptionId = contract.OptionId ?? -1,
                Account1 = newAccountForMainSum,
                Account2 = newAccountForPercents,
                PersonSurname = contract.PersonSurname,
                PersonName = contract.PersonName,
                PersonMiddlename = contract.PersonMiddlename,
                Sum = contract.Sum,
                PercentPerYear = contract.PercentPerYear,
                StartDate = AppDateTime,
                EndDate = AppDateTime.AddMonths(contract.DurationMonth)
            };

            await context.Accounts.AddAsync(newAccountForMainSum);
            await context.Accounts.AddAsync(newAccountForPercents);
            await context.CreditContracts.AddAsync(newContract);
            await context.SaveChangesAsync();
        }

        public async Task SkipDayAsync(ApplicationDbContext context, AccountsService accountsService)
        {
            AppDateTime += TimeSpan.FromDays(1);
            await closeBankDay(context, accountsService);
        }

        public async Task SkipMonth(ApplicationDbContext context, AccountsService accountsService)
        {
            var finishDate = AppDateTime.AddMonths(1);
            while(AppDateTime < finishDate) await SkipDayAsync(context, accountsService);
        }

        private async Task closeBankDay(ApplicationDbContext context, AccountsService accountsService) //TODO - contract conditions???
        {
            var bankAccountPassive = await context.Accounts.FirstAsync(ac => ac.Number == _config.Value.BankAccountPassive);

            foreach (var dc in context.DebetContracts.Include(dc => dc.Account1).Include(dc => dc.Account2))
            {
                if(dc.EndDate > AppDateTime && AppDateTime.Day == dc.StartDate.Day && AppDateTime.Month != dc.StartDate.Month) //fullfilling percents
                {
                    await accountsService.CreateTransactionAsync(bankAccountPassive, true, dc.Account2, false, (dc.PercentPerYear / 12) * dc.Sum, context, AppDateTime);
                } 
                else if(dc.EndDate == AppDateTime) //deposit end
                {
                    await accountsService.CreateTransactionAsync(bankAccountPassive, true, dc.Account1, false, dc.Sum, context, AppDateTime);
                }
            }
            foreach (var dc in context.CreditContracts.Include(dc => dc.Account1).Include(dc => dc.Account2))
            {
                if (dc.EndDate > AppDateTime && AppDateTime.Day == dc.StartDate.Day && AppDateTime.Month != dc.StartDate.Month) //paying percents
                {
                    await accountsService.CreateTransactionAsync(dc.Account2, false, bankAccountPassive, true, (dc.PercentPerYear / 12) * dc.Sum, context, AppDateTime);
                }
                else if (dc.EndDate == AppDateTime) //credit end
                {
                    await accountsService.CreateTransactionAsync(dc.Account1, false, bankAccountPassive, true, dc.Sum, context, AppDateTime);
                }
            }
            await context.SaveChangesAsync();
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