using PiRiS_back.ViewModels;
using PiRiS_back.Models;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace PiRiS_back.Services
{
    public class UserInfoFillerService
    {
        public void FillUserInfo(UserViewModel user, ApplicationDbContext context, User userToFill, bool isNew = true)
        {
            if (String.IsNullOrEmpty(user.Name)) throw new UserValidationException("Имя не должно быть пустым!");
            if (!Regex.IsMatch(user.Name, @"^\w.+?$")) throw new UserValidationException("Неверное имя!");
            if (String.IsNullOrEmpty(user.Surname)) throw new UserValidationException("Фамилия не должна быть пустой!");
            if (!Regex.IsMatch(user.Surname, @"^\w.+?$")) throw new UserValidationException("Неверная фамилия!");
            if (String.IsNullOrEmpty(user.Middlename)) throw new UserValidationException("Отчество не должно быть пустым!");
            if (!Regex.IsMatch(user.Middlename, @"^\w.+?$")) throw new UserValidationException("Неверное отчество!");
            if (user.BirthDate.Year > 2004) throw new UserValidationException("Дата рождения должна быть ранее 01.01.2005!");

            if (String.IsNullOrEmpty(user.PassportSeria)) throw new UserValidationException("Серия паспорта не должна быть пустой!");
            if (!Regex.IsMatch(user.PassportSeria, @"^\w{2}$")) throw new UserValidationException("Неверная серия пасспорта!");

            if (String.IsNullOrEmpty(user.PassportNumber)) throw new UserValidationException("Номер паспорта не должен быть пустым!");
            if (!Regex.IsMatch(user.PassportNumber, @"^\d{7}$")) throw new UserValidationException("Неверный номер паспорта!");
            if (isNew && context.Users.Any(us => user.PassportNumber == us.PassportNumber && user.PassportSeria == us.PassportSeria))
                throw new UserValidationException("Пользователь с такими серией и номером пасспорта уже существует!");

            if (String.IsNullOrEmpty(user.PassportGivenBy)) throw new UserValidationException("Орган выдачи паспорта не должен быть пустым!");
            if (user.PassportGivenAt < user.BirthDate) throw new UserValidationException("Дата выдачи паспорта не может быть меньше даты рождения!");
            if (String.IsNullOrEmpty(user.PassportIdentityNumber)) throw new UserValidationException("Идентификационный номер паспорта не должен быть пустым!");
            if (!Regex.IsMatch(user.PassportIdentityNumber, @"^\d{7}\w\d{3}\w{2}\d$")) throw new UserValidationException("Неверный идентификационный номер паспорта!");
            if (isNew && context.Users.Any(us => user.PassportIdentityNumber == us.PassportIdentityNumber)) 
                throw new UserValidationException("Пользователь с данным идентификационным номером пасспорта уже зарегистрирован!");

            if (String.IsNullOrEmpty(user.PlaceOfBirth)) throw new UserValidationException("Место рождения не должно быть пустым!");
            if (String.IsNullOrEmpty(user.City)) throw new UserValidationException("Город проживания не должен быть пустым!");
            if (!context.Cities.Any(cit => cit.Name == user.City)) throw new UserValidationException($"Город проживания {user.City} отсутствует в базе!");
            if (String.IsNullOrEmpty(user.AddressLiving)) throw new UserValidationException("Адрес проживания не должен быть пустым!");
            if (!String.IsNullOrEmpty(user.HomePhone) && !Regex.IsMatch(user.HomePhone, @"^\d{6,8}$")) throw new UserValidationException("Неверный домашний телефон!");
            if (!String.IsNullOrEmpty(user.MobilePhone) && !Regex.IsMatch(user.MobilePhone, @"^([+]\d{12})|(\d{11})$")) throw new UserValidationException("Неверный мобильный телефон!");
            if (!String.IsNullOrEmpty(user.EmailAddress) && !Regex.IsMatch(user.EmailAddress, @"^\S+?@\S+?[.]\w{2,3}$")) throw new UserValidationException("Неверный адрес электронной почты!");
            if (String.IsNullOrEmpty(user.CityRegistered)) throw new UserValidationException("Город прописки не должен быть пустым!");
            if (!context.Cities.Any(cit => cit.Name == user.CityRegistered)) throw new UserValidationException($"Город прописки {user.CityRegistered} отсутствует в базе!");
            if (String.IsNullOrEmpty(user.AddressRegistered)) throw new UserValidationException("Адрес прописки не должен быть пустым!");
            if (String.IsNullOrEmpty(user.FamilyStatus)) throw new UserValidationException("Семейное положение не должно быть пустым!");
            if (String.IsNullOrEmpty(user.Citizenship)) throw new UserValidationException("Гражданство не должно быть пустым!");
            if (String.IsNullOrEmpty(user.Disability)) throw new UserValidationException("Инвалидность не должна быть пустой!");
            //if (String.IsNullOrEmpty(user.Pensioner)) throw new UserValidationException("Статус пенсионера не должен быть пустым!");
            //if (String.IsNullOrEmpty(user.Militarian)) throw new UserValidationException("Статус военнообязанного не должен быть пустым!");
            userToFill.Name = user.Name;
            userToFill.Surname= user.Surname;
            userToFill.Middlename = user.Middlename;
            userToFill.BirthDate = user.BirthDate;
            userToFill.Sex = user.Sex;
            userToFill.PassportSeria = user.PassportSeria;
            userToFill.PassportNumber = user.PassportNumber;
            userToFill.PassportGivenBy = user.PassportGivenBy;
            userToFill.PassportGivenAt = user.PassportGivenAt;
            userToFill.PassportIdentityNumber = user.PassportIdentityNumber;
            userToFill.PlaceOfBirth = user.PlaceOfBirth;
            userToFill.CityId = context.Cities.First(cit => cit.Name == user.City).Id;
            userToFill.AddressLiving= user.AddressLiving;
            userToFill.HomePhone= user.HomePhone;
            userToFill.MobilePhone= user.MobilePhone;
            userToFill.EmailAddress= user.EmailAddress;
            userToFill.WorkPlace= user.WorkPlace;
            userToFill.WorkPosition= user.WorkPosition;
            userToFill.CityRegisteredId = context.Cities.First(cit => cit.Name == user.CityRegistered).Id;
            userToFill.AddressRegistered = user.AddressRegistered;
            userToFill.FamilyStatusId = context.FamilyStatuses.First(fs => fs.Name == user.FamilyStatus).Id;
            userToFill.CitizenshipId = context.Citizenships.First(cz => cz.Name == user.Citizenship).Id;
            userToFill.DisabilityId = context.Disabilities.First(dis => dis.Name == user.Disability).Id;
            userToFill.Pensioner = user.Pensioner;
            userToFill.MonthIncome = user.MonthIncome;
            userToFill.Militarian = user.Militarian;
            userToFill.RoleId = context.Roles.First(rol => rol.Name == user.Role).Id;
        }

        public class UserValidationException: ValidationException {
            public UserValidationException(string message) : base(message) { }
            public UserValidationException(): base() { }
        }
    }
}
