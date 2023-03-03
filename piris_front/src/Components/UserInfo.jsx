

const UserInfo = ({ info }) => {
    return (
        <>
            <div className="row">
                <div className='col'>
                    <p className='text row justify'>Фамилия: <span>{info.surname}</span></p>
                    <p className='text row justify'>Имя: <span>{info.name}</span></p>
                    <p className='text row justify'>Отчество: <span>{info.middlename}</span></p>
                    <p className='text row justify'>Дата рождения: <span>{info.birthDate?.split('T')?.[0]}</span></p>
                    <p className='text row justify'>Место рождения: <span>{info.placeOfBirth}</span></p>
                    <p className='text row justify'>Пол: <span>{info.sex ? 'Женский' : 'Мужской'}</span></p>
                </div>
                <div className='col'>
                    <p className='text row justify'>Серия паспорта: <span>{info.passportSeria}</span></p>
                    <p className='text row justify'>Номер паспорта: <span>{info.passportNumber}</span></p>
                    <p className='text row justify'>Орган, выдаший паспорт: <span>{info.passportGivenBy}</span></p>
                    <p className='text row justify'>Дата выдачи паспорта: <span>{info.passportGivenAt?.split('T')?.[0]}</span></p>
                    <p className='text row justify'>Идентификационный номер паспорта: <span>{info.passportIdentityNumber}</span></p>
                </div>
            </div><hr/>
            <div className="row">
                <div className='col'>
                    <p className='text row justify'>Город проживания: <span>{info.city}</span></p>
                    <p className='text row justify'>Адрес проживания: <span>{info.addressLiving}</span></p>
                    <p className='text row justify'>Телефон мобильный: <span>{info.mobilePhone}</span></p>
                    <p className='text row justify'>Телефон домашний: <span>{info.homePhone}</span></p>
                    <p className='text row justify'>Адрес электронной почты: <span>{info.emailAddress}</span></p>
                    <p className='text row justify'>Место работы: <span>{info.workPlace}</span></p>
                    <p className='text row justify'>Должность: <span>{info.workPosition}</span></p>
                </div>
                <div className='col'>
                    <p className='text row justify'>Город прописки: <span>{info.cityRegistered}</span></p>
                    <p className='text row justify'>Адрес прописки: <span>{info.addressRegistered}</span></p>
                    <p className='text row justify'>Семейное положение: <span>{info.familyStatus}</span></p>
                    <p className='text row justify'>Гражданство: <span>{info.citizenship}</span></p>
                    <p className='text row justify'>Инвалидность: <span>{info.disability}</span></p>
                    <p className='text row justify'>Пенсионер: <span>{info.pensioner ? 'Да' : 'Нет'}</span></p>
                    <p className='text row justify'>Военнообязанный: <span>{info.militarian ? 'Да' : 'Нет'}</span></p>
                    <p className='text row justify'>Ежемесячный доход: <span>{info.monthIncome}</span></p>
                </div>
            </div></>
    );
}

export default UserInfo;