using PiRiS_back.Models;

namespace PiRiS_back.ViewModels
{
    public class TransactionViewModel
    {
        public int Id { get; set; }
        public decimal Debet { get; set; }
        public decimal Credit { get; set; }
        public DateTime Date { get; set; }
        public string Sum { get; set; }
        public string Account { get; set; }

        public TransactionViewModel(Transaction transaction, Account account, Currency currency)
        {//logic based on simulating transactions rollbacks. Transactions must be enumerated from latest to earliest
            this.Id = transaction.Id;
            this.Date = transaction.Time;
            this.Sum = $"{transaction.Sum}{currency.Name}";
            this.Debet = account.Debet;
            this.Credit = account.Credit;

            var accountCurrencyPrice = currency.BynPrice;
            var transactionCurrencyPrice = currency.BynPrice;

            var sumOfChange = transaction.Sum * transactionCurrencyPrice / accountCurrencyPrice;

            if(transaction.NumberFrom == account.Number)//transactions decreased current account sum => rollback will increase it
            {
                this.Account = transaction.NumberTo;
                account.Credit = transaction.FromDebet ? account.Credit : account.Credit + sumOfChange;
                account.Debet = transaction.FromDebet ? account.Debet + sumOfChange : account.Debet;
                return;
            }
            if(transaction.NumberTo == account.Number)//transactions increased current account sum => rollback will decrease it
            {
                this.Account = transaction.NumberFrom;
                account.Credit = transaction.ToDebet ? account.Credit : account.Credit - sumOfChange;
                account.Debet = transaction.ToDebet ? account.Debet - sumOfChange : account.Debet;
                return;
            }
            this.Sum = "0";
            this.Account = "";
        }
    }
}
