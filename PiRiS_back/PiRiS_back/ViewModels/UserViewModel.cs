using PiRiS_back.Models;

namespace PiRiS_back.ViewModels
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Middlename { get; set; }
        public DateTime BirthDate { get; set; }
        public string City { get; set; }
        public string CityRegistered { get; set; }
        public string Citizenship { get; set; }
        public string Role { get; set; }
        public string Disability { get; set; }
        public string FamilyStatus { get; set; }
        public bool Sex { get; set; }
        public string PassportSeria { get; set; }
        public string PassportNumber { get; set; }
        public string PassportGivenBy { get; set; }
        public DateTime PassportGivenAt { get; set; }
        public string PassportIdentityNumber { get; set; }
        public string PlaceOfBirth { get; set; }
        public string AddressLiving { get; set; }
        public string? HomePhone { get; set; }
        public string? MobilePhone { get; set; }
        public string? EmailAddress { get; set; }
        public string? WorkPlace { get; set; }
        public string? WorkPosition { get; set; }
        public string AddressRegistered { get; set; }
        public bool Pensioner { get; set; }
        public bool Militarian { get; set; }
        public decimal? MonthIncome { get; set; }

        public UserViewModel() { }
        public UserViewModel(User user, ApplicationDbContext context)
        {
            this.Id = user.Id;
            this.Name = user.Name;
            this.Surname = user.Surname;
            this.Middlename = user.Middlename;
            this.BirthDate = user.BirthDate;
            this.PassportSeria = user.PassportSeria;
            this.PassportNumber = user.PassportNumber;
            this.PassportGivenBy = user.PassportGivenBy;
            this.PassportGivenAt = user.PassportGivenAt;
            this.PassportIdentityNumber = user.PassportIdentityNumber;
            this.City = context.Cities.First(cit => user.CityId == cit.Id).Name;
            this.CityRegistered = context.Cities.First(cit => user.CityRegisteredId == cit.Id).Name;
            this.AddressLiving = user.AddressLiving;
            this.AddressRegistered = user.AddressRegistered;
            this.Role = context.Roles.First(cit => user.RoleId == cit.Id).Name;
            this.Sex = user.Sex;
            this.WorkPosition = user.WorkPosition;
            this.WorkPlace = user.WorkPlace;
            this.MonthIncome = user.MonthIncome;
            this.HomePhone = user.HomePhone;
            this.MobilePhone = user.MobilePhone;
            this.EmailAddress = user.EmailAddress;
            this.PlaceOfBirth = user.PlaceOfBirth;
            this.Citizenship = context.Citizenships.First(cit => user.CitizenshipId == cit.Id).Name;
            this.Disability = context.Disabilities.First(cit => user.DisabilityId == cit.Id).Name;
            this.FamilyStatus = context.FamilyStatuses.First(cit => user.FamilyStatusId == cit.Id).Name;
            this.Militarian = user.Militarian;
            this.Pensioner = user.Pensioner;
        }
    }
}
