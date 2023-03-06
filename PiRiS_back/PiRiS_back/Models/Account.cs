namespace PiRiS_back.Models
{
    public class Account
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }
        public string Number { get; set; }
        public string Code { get; set; }
        public string Pin { get; set; }
        public bool? IsActive { get; set; }
        public decimal Debet { get; set; }
        public decimal Credit { get; set; }
        public int CurrencyId { get; set; }
        public Currency Currency { get; set; }
    }
}
