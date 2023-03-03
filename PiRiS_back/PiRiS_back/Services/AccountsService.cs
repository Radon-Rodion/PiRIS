using Microsoft.EntityFrameworkCore;
using PiRiS_back.Models;

namespace PiRiS_back.Services
{
    public class AccountsService
    {
        public async Task CreateTransactionAsync(string numberFrom, bool fromDebet, string numberTo, bool toDebet, decimal sum, ApplicationDbContext context, DateTime? time=null, bool saveChanges = false)
        {
            var accountFrom = await context.Accounts.FirstOrDefaultAsync(acc => acc.Number == numberFrom);
            var accountTo = await context.Accounts.FirstOrDefaultAsync(acc => acc.Number == numberTo);

            await createTransactionAsync(numberFrom, numberTo, accountFrom, fromDebet, accountTo, toDebet, sum, context, time, saveChanges);
        }

        public async Task CreateTransactionAsync(Account accountFrom, bool fromDebet, Account accountTo, bool toDebet, decimal sum, ApplicationDbContext context, DateTime? time = null, bool saveChanges = false)
        {
            await createTransactionAsync(accountFrom.Number, accountTo.Number, accountFrom, fromDebet, accountTo, toDebet, sum, context, time, saveChanges);
        }

        private async Task createTransactionAsync(string numberFrom, string numberTo, Account? accountFrom, bool fromDebet, Account? accountTo, bool toDebet, decimal sum, ApplicationDbContext context, DateTime? time = null, bool saveChanges = false)
        {
            var newTransaction = new Transaction()
            {
                NumberFrom = numberFrom,
                AccountFrom = accountFrom,
                FromDebet = fromDebet,

                NumberTo = numberTo,
                AccountTo = accountTo,
                ToDebet = toDebet,

                Sum = sum,
                Time = time ?? DateTime.Now,
            };

            if (accountFrom != null)
            {
                if (fromDebet)
                {
                    accountFrom.Debet -= sum;
                } else
                {
                    accountFrom.Credit -= sum;
                }
            }
            if (accountTo != null)
            {
                if (toDebet)
                {
                    accountTo.Debet += sum;
                }
                else
                {
                    accountTo.Credit += sum;
                }
            }

            await context.AddAsync(newTransaction);
            if(saveChanges) await context.SaveChangesAsync();
        }
    }
}
