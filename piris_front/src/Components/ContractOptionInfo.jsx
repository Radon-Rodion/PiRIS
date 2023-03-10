

const ContractOptionInfo = ({ info, isDebet=true }) => {
    return (
        <div className='row'>
            <div className='col'>
                <p className='text row'>Название:&nbsp;<span>{info.name}</span></p>
                <p className='text row'>Описание:&nbsp;<span>{info.description}</span></p>
            </div>
            <div className='col'>
                <p className='text row'>Сумма от:&nbsp;<span>{info.sumFrom} до {info.sumTo}</span>&nbsp;{info.availableCurrencies}</p>
                <p className='text row'>Длительность от:&nbsp;<span>{info.minDurationInMonth} до {info.maxDurationInMonth} мес.</span></p>
                {isDebet ? <p className='text row'>Отзывной:&nbsp;<span>{info.isRequestable ? 'Да' : 'Нет'}</span></p> :
                <p className='text row'>Тип:&nbsp;<span>{info.isDifferentive ? 'Дифференцированный' : 'Аннуитетный'}</span></p>}
                <p className='text row'>Процент в год:&nbsp;<span>{info.percentPerYear*100}%</span></p>
            </div>
        </div>
    );
}

export default ContractOptionInfo;