import axios from "axios";
import { useState, useEffect } from "react";
import requests from "../agent";
import { processErrRequest } from "../Helpers/ErrReqProcessor";
import validators from "../Helpers/Validators";
import { Required } from "./UserFormBody";
import {dateToStr} from './ContractInfo';


const ContractFormBody = ({ contractInfo, setContractInfo, limiters, isDebet = true }) => {
    const [staticData, setStaticData] = useState({
        cities: [],
        currencies: [],
        today: new Date()
    });

    useEffect(() => {
        const getStaticData = [
            requests.staticData.cities(),
            requests.staticData.currencies(),
            requests.staticData.appDate()
        ];
        axios.all(getStaticData).then(resp => {
            const currencies = resp[1].data?.filter(cur => limiters.currencies.indexOf(cur) > -1);
            const newStaticData = {
                cities: resp[0].data,
                currencies: currencies,
                today: resp[2].data
            };
            setStaticData(newStaticData);
            setContractInfo({
                ...contractInfo,
                currency: contractInfo.currency ? contractInfo.currency : currencies?.[0]?.name,
                city: contractInfo.city ? contractInfo.city : resp[0].data?.[0]?.name,
                startDate: resp[2].data
            });
        }).catch(err => { processErrRequest(err) });
    }, []);

    const setFieldActionCreator = (fieldName, formatter = (newVal) => true) => (e) => {
        let newVal = e.target.value;
        if (newVal == 'false') newVal = false;
        if (newVal == 'true') newVal = true;

        console.log('set', fieldName, newVal, formatter(newVal))

        if (!formatter(newVal)) return;
        const newInfo = { ...contractInfo };
        newInfo[fieldName] = newVal;
        newInfo.endDate = addMonths(newInfo.startDate, newInfo.durationMonth);
        setContractInfo(newInfo);
    };

    const titlePart = isDebet ? 'Дебеторский' : 'Кредиторский';
    const addMonths = (date, months) => {
        if(!date || !months) return date;
        date = new Date(date);

        var d = date?.getDate();
        date.setMonth(date?.getMonth() + +months);
        if (date?.getDate() != d) {
            date.setDate(0);
        }
        return date;
    }

    return (
        <>
            <h5 style={{ textAlign: 'center', width: '100%' }}>{titlePart} договор №{contractInfo.number}</h5>

            Я, <Field val={contractInfo.personSurname} onChange={setFieldActionCreator('personSurname', validators.nameSurnameMiddlename)} />
            <Field val={contractInfo.personName} onChange={setFieldActionCreator('personName', validators.nameSurnameMiddlename)} />
            <Field val={contractInfo.personMiddlename} onChange={setFieldActionCreator('personMiddlename', validators.nameSurnameMiddlename)} />,
            проживающий по адресу г. <SelectField val={contractInfo.cityLiving} options={staticData.cities} onChange={setFieldActionCreator('cityLiving')} />,
            <Field val={contractInfo.addressLiving} onChange={setFieldActionCreator('addressLiving')} />
            , согласен заключить договор "{contractInfo.name}" на сумму
            <input type="number" value={contractInfo.sum} onChange={setFieldActionCreator('sum')} min={limiters.minSum} max={limiters.maxSum} />
            <SelectField val={contractInfo.currency} options={staticData.currencies} onChange={setFieldActionCreator('currency')} />
            на период <input type="number" value={contractInfo.durationMonth} onChange={setFieldActionCreator('durationMonth')} min={limiters.minDuration} max={limiters.maxDuration} /> месяцев
            (с {dateToStr(staticData.today)} по {dateToStr(addMonths(staticData.today, contractInfo.durationMonth))}) под {contractInfo.percentPerYear}% в год.
            Серия и номер пасспорта: <Field val={contractInfo.passportSeria} onChange={setFieldActionCreator('passportSeria', validators.passportSeria)} />
            <Field val={contractInfo.passportNumber} onChange={setFieldActionCreator('passportNumber', validators.passportNumber)} />.
            Идентификационный номер пасспорта: <Field val={contractInfo.passportIdentityNumber} onChange={setFieldActionCreator('passportIdentityNumber', validators.passportIdentityNumber)} />.<br />

            <div className="row justify">
                <div>Дата: {dateToStr(staticData.today)}</div>
            </div>
        </>
    );
}

const Field = ({ val, onChange }) => {
    if (val == undefined) return
    <input value={val} onChange={onChange} required className='form-input' />

    return <b>&nbsp;{val}&nbsp;</b>
}

const SelectField = ({ val, options, onChange }) => {
    if (val == undefined) return
    <select name="city" value={val} onChange={onChange}>
        {options.map(opt => <option vlaue={opt}>{opt}</option>)}
    </select>

    return <b>&nbsp;{val}&nbsp;</b>
}

export default ContractFormBody;