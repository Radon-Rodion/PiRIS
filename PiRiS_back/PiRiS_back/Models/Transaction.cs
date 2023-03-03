namespace PiRiS_back.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public string NumberFrom { get; set; }
        public bool FromDebet { get; set; }
        public int? AccountFromId { get; set; }
        public Account? AccountFrom { get; set; }

        public string NumberTo { get; set; }
        public bool ToDebet { get; set; }
        public int? AccountToId { get; set; }
        public Account? AccountTo { get; set; }
        public DateTime Time { get; set; }
        public decimal Sum { get; set; }
        public int CurrencyId { get; set; }
        public Currency Currency { get; set; }
    }
}
