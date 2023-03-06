using Microsoft.EntityFrameworkCore;
using PiRiS_back.Models;

namespace PiRiS_back.ViewModels
{
    public class AccountStatesViewModel
    {
        public List<TransactionViewModel> TransactionList { get; set; }
        public Account Account { get; set; }
        public AccountStatesViewModel (Account account, ApplicationDbContext context)
        {
            this.Account = account;
            var transactions = context.Transactions.Where(tr => tr.NumberFrom == account.Number || tr.NumberTo == account.Number).Reverse().AsEnumerable();
            this.TransactionList = transactions.Select(tr => new TransactionViewModel(tr, account, context)).ToList();
        }
    }
}
