using PiRiS_back.Models;

namespace PiRiS_back.ViewModels
{
    public class ContractViewModel
    {
        public int Id { get; set; }
        public int? OptionId { get; set; }
        public string Number { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string Account1Number { get; set; }
        public string Account2Number { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool? IsRequestable { get; set; }
        public bool? IsDifferentive { get; set; }
        public int DurationMonth { get; set; }
        public string PersonName { get; set; }
        public string PersonSurname { get; set; }
        public string PersonMiddlename { get; set; }
        public string PassportSeria { get; set; }
        public string PassportNumber { get; set; }
        public string PassportIdentityNumber { get; set; }
        public string CityLiving { get; set; }
        public string AddressLiving { get; set; }
        public decimal Sum { get; set; }
        public string Currency { get; set; }
        public decimal PercentPerYear { get; set; }

        public ContractViewModel() { }
        public ContractViewModel(DebetContract contract, ApplicationDbContext context)
        {
            Id = contract.Id;
            OptionId = contract.DebetContractOptionId;
            Number = contract.Number;
            Name = contract?.DebetContractOption?.Name ?? "";
            Description = contract?.DebetContractOption?.Description ?? "";
            Account1Number = contract.Account1?.Number ?? "";
            Account2Number = contract.Account2?.Number ?? "";
            StartDate = contract.StartDate;
            EndDate = contract.EndDate;
            IsRequestable = contract?.DebetContractOption?.IsRequestable;
            DurationMonth = (int)Math.Round((contract.StartDate - contract.EndDate).TotalDays / 30);
            PersonName = contract.PersonName;
            PersonSurname = contract.PersonSurname;
            PersonMiddlename = contract.PersonMiddlename;
            PassportSeria= contract.PassportSeria;
            PassportNumber= contract.PassportNumber;
            PassportIdentityNumber= contract.PassportIdentityNumber;
            CityLiving = context.Cities.First(cit => cit.Id == contract.CityLivingId).Name;
            AddressLiving = contract.AddressLiving;
            Sum = contract.Sum;
            Currency = context.Currencies.First(cur => cur.Id == contract.CurrencyId).Name;
            PercentPerYear = contract.PercentPerYear;
    }

        public ContractViewModel(CreditContract contract, ApplicationDbContext context)
        {
            Id = contract.Id;
            OptionId = contract.CreditContractOptionId;
            Number = contract.Number;
            Name = contract?.CreditContractOption?.Name ?? "";
            Description = contract?.CreditContractOption?.Description ?? "";
            Account1Number = contract.Account1?.Number ?? "";
            Account2Number = contract.Account2?.Number ?? "";
            StartDate = contract.StartDate;
            EndDate = contract.EndDate;
            IsDifferentive = contract?.CreditContractOption?.IsDifferentive;
            DurationMonth = (int)Math.Round((contract.StartDate - contract.EndDate).TotalDays / 30);
            PersonName = contract.PersonName;
            PersonSurname = contract.PersonSurname;
            PersonMiddlename = contract.PersonMiddlename;
            PassportSeria = contract.PassportSeria;
            PassportNumber = contract.PassportNumber;
            PassportIdentityNumber = contract.PassportIdentityNumber;
            CityLiving = context.Cities.First(cit => cit.Id == contract.CityLivingId).Name;
            AddressLiving = contract.AddressLiving;
            Sum = contract.Sum;
            Currency = context.Currencies.First(cur => cur.Id == contract.CurrencyId).Name;
            PercentPerYear = contract.PercentPerYear;
        }
    }
}
