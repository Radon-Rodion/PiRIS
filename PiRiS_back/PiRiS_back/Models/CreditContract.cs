﻿namespace PiRiS_back.Models
{
    public class CreditContract
    {
        public int Id { get; set; }
        public string Number { get; set; }
        public int CreditContractOptionId { get; set; }
        public CreditContractOption CreditContractOption { get; set; }
        public int Account1Id { get; set; }
        public Account Account1 { get; set; }
        public int Account2Id { get; set; }
        public Account Account2 { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string PersonName { get; set; }
        public string PersonSurname { get; set; }
        public string PersonMiddlename { get; set; }
        public string PassportSeria { get; set; }
        public string PassportNumber { get; set; }
        public string PassportIdentityNumber { get; set; }
        public int CityLivingId { get; set; }
        public City CityLiving { get; set; }
        public string AddressLiving { get; set; }
        public int CurrencyId { get; set; }
        public Currency Currency { get; set; }
        public decimal Sum { get; set; }
        public decimal PercentPerYear { get; set; }

    }
}
