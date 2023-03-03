using Microsoft.AspNetCore.Identity;
using PiRiS_back.ViewModels;

namespace PiRiS_back.Models
{
    public class User : IdentityUser<int>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Middlename { get; set; }
        public DateTime BirthDate { get; set; }

        public int CityId { get; set; }
        public City City { get; set; }

        public int CityRegisteredId { get; set; }
        public City CityRegistered { get; set; }
        public int CitizenshipId { get; set; }
        public Citizenship Citizenship { get; set; }
        public int RoleId { get; set; }
        public Role Role { get; set; }
        public int DisabilityId { get; set; }
        public Disability Disability { get; set; }
        public int FamilyStatusId { get; set; }
        public FamilyStatus FamilyStatus { get; set; }
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
    }
}
