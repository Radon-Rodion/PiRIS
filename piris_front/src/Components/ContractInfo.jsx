

const ContractInfo = ({ info, isDebet }) => {
    const titlePart = isDebet ? 'Дебеторский' : 'Кредиторский';

    return (
        <>
            <h5 style={{ textAlign: 'center', width: '100%' }}>{titlePart} договор №{info.number}</h5>

            Я, {info.personSurname}&nbsp;{info.personName}&nbsp;{info.personMiddlename},
            проживающий по адресу г. {info.cityLiving},&nbsp;{info.addressLiving}
            , согласен заключить договор "{info.name}" на сумму&nbsp;{info.sum}{info.currency}
            на период {info.durationMonth}&nbsp;месяцев&nbsp;
            (с {info.startDate} по {info.endDate}) 
            под {info.percentPerYear}% в год.
            Серия и номер пасспорта:&nbsp;{info.passportSeria}{info.passportNumber}.
            Идентификационный номер пасспорта:&nbsp;{info.passportIdentityNumber}.<br />

            <div className="row justify">
                <div>Дата: {info.startDate}</div>
            </div>
        </>
    );
}

export default ContractInfo;