import './styles.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import requests from '../agent';
import { useState, useEffect } from 'react';
import validators from '../Helpers/Validators';
import { processErrRequest } from '../Helpers/ErrReqProcessor';


const UserFormBody = ({ userInfo, setUserInfo }) => {
    const [staticData, setStaticData] = useState({
        cities: [],
        citizenships: [],
        disabilities: [],
        familyStatuses: [],
        roles: []
    });

    useEffect(() => {
        const getStaticData = [
            requests.staticData.cities(),
            requests.staticData.citizenships(),
            requests.staticData.disabilities(),
            requests.staticData.familyStatuses(),
            requests.staticData.roles()
        ];
        axios.all(getStaticData).then(resp => {
            const newStaticData = {
                cities: resp[0].data,
                citizenships: resp[1].data,
                disabilities: resp[2].data,
                familyStatuses: resp[3].data,
                roles: resp[4].data
            };
            setStaticData(newStaticData);
            setUserInfo({
                ...userInfo,
                cityRegistered: userInfo.cityRegistered ? userInfo.cityRegistered : resp[0].data?.[0]?.name,
                city: userInfo.city ? userInfo.city : resp[0].data?.[0]?.name,
                citizenship: userInfo.citizenship ? userInfo.citizenship : resp[1].data?.[0]?.name,
                disability: userInfo.disability ? userInfo.disability : resp[2].data?.[0]?.name,
                familyStatus: userInfo.familyStatus ? userInfo.familyStatus : resp[3].data?.[0]?.name
            });
        }).catch(err => { processErrRequest(err) });
    }, []);

    const setFieldActionCreator = (fieldName, formatter = (newVal) => true) => (e) => {
        let newVal = e.target.value;
        if(newVal == 'false') newVal = false;
        if(newVal == 'true') newVal = true;

        console.log('set', fieldName, newVal, formatter(newVal))
        
        if (!formatter(newVal)) return;
        const newUserInfo = { ...userInfo };
        newUserInfo[fieldName] = newVal;
        console.log(newUserInfo);
        setUserInfo(newUserInfo);
    };

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    return (
        <>
            <div className='row'>
                <div className='col'>
                    <div className='row'>
                        <label className='form-label'>Фамилия<Required /></label>
                        <input value={userInfo.surname} onChange={setFieldActionCreator('surname', validators.nameSurnameMiddlename)} required className='form-input' />
                    </div>
                    <div className='row'>
                        <label className='form-label'>Имя<Required /></label>
                        <input value={userInfo.name} onChange={setFieldActionCreator('name', validators.nameSurnameMiddlename)} required className='form-input' />
                    </div>
                    <div className='row'>
                        <label className='form-label'>Отчество<Required /></label>
                        <input value={userInfo.middlename} onChange={setFieldActionCreator('middlename', validators.nameSurnameMiddlename)} required className='form-input' />
                    </div>
                    <div className='row'>
                        <label className='form-label'>Дата рождения<Required /></label>
                        <input value={userInfo.birthDate?.split('T')?.[0]} type='date' onChange={setFieldActionCreator('birthDate')} required className='form-input' min='1900-01-01' max='2004-12-31' />
                    </div>
                    <div className='row'>
                        <label className='form-label'>Место рождения<Required /></label>
                        <input value={userInfo.placeOfBirth} onChange={setFieldActionCreator('placeOfBirth')} required className='form-input' />
                    </div>
                    <div className='row' onChange={setFieldActionCreator('sex')}>
                        <label className='form-label' for='sex'>Пол<Required /></label>
                        <input type='radio' name='sex' className='form-input' checked={!userInfo.sex || userInfo.sex == 'false'} value={false} /><label>Мужской</label>
                        <input type='radio' name='sex' className='form-input' checked={userInfo.sex && userInfo.sex != 'false'} value={true} /><label>Женский</label>
                    </div>
                </div>
                <div className='col'>
                    <div className='row'>
                        <label className='form-label'>Серия и номер паспорта<Required /></label>
                        <input value={userInfo.passportSeria} onChange={setFieldActionCreator('passportSeria', validators.passportSeria)} required className='form-input' />
                        <input value={userInfo.passportNumber} onChange={setFieldActionCreator('passportNumber', validators.passportNumber)} required className='form-input' />
                    </div>
                    <div className='row'>
                        <label className='form-label'>Орган, выдавший паспорт<Required /></label>
                        <input value={userInfo.passportGivenBy} onChange={setFieldActionCreator('passportGivenBy')} required className='form-input' />
                    </div>
                    <div className='row'>
                        <label className='form-label'>Дата выдачи паспорта<Required /></label>
                        <input value={userInfo.passportGivenAt?.split('T')?.[0]} type='date' onChange={setFieldActionCreator('passportGivenAt')} required className='form-input' min='1900-01-01' max={todayStr} />
                    </div>
                    <div className='row'>
                        <label className='form-label'>Идентификационный номер паспорта<Required /></label>
                        <input value={userInfo.passportIdentityNumber} onChange={setFieldActionCreator('passportIdentityNumber', validators.passportIdentityNumber)} required className='form-input' />
                    </div>
                </div>
            </div>
            <hr/>
            <div className='row'>
                <div className='col'>
                    <div className='row'>
                        <label className='form-label'>Город проживания<Required /></label>
                        <select name="city" value={userInfo.city} onChange={setFieldActionCreator('city')}>
                            {staticData.cities.map(cit => <option vlaue={cit.name}>{cit.name}</option>)}
                        </select>
                    </div>
                    <div className='row'>
                        <label className='form-label'>Адрес проживания<Required /></label>
                        <input value={userInfo.addressLiving} onChange={setFieldActionCreator('addressLiving')} required className='form-input' />
                    </div>
                    <div className='row'>
                        <label className='form-label'>Домашний телефон</label>
                        <input value={userInfo.homePhone} onChange={setFieldActionCreator('homePhone', validators.homePhone)} className='form-input' />
                    </div>
                    <div className='row'>
                        <label className='form-label'>Мобильный телефон</label>
                        <input value={userInfo.mobilePhone} onChange={setFieldActionCreator('mobilePhone', validators.mobilePhone)} className='form-input' />
                    </div>
                    <div className='row'>
                        <label className='form-label'>Адрес электронной почты</label>
                        <input value={userInfo.emailAddress} onChange={setFieldActionCreator('emailAddress', validators.email)} className='form-input' />
                    </div>
                    <div className='row'>
                        <label className='form-label'>Место работы</label>
                        <input value={userInfo.workPlace} onChange={setFieldActionCreator('workPlace')} className='form-input' />
                    </div>
                    <div className='row'>
                        <label className='form-label'>Должность</label>
                        <input value={userInfo.workPosition} onChange={setFieldActionCreator('workPosition')} className='form-input' />
                    </div>
                    <div className='row'><div className='form-label' style={{width: '90%'}}><Required /> - Пометка для обязательных полей</div></div>
                </div>
                <div className='col'>
                    <div className='row'>
                        <label className='form-label'>Город прописки<Required /></label>
                        <select name="city" value={userInfo.cityRegistered} onChange={setFieldActionCreator('cityRegistered')}>
                            {staticData.cities.map(cit => <option vlaue={cit.name}>{cit.name}</option>)}
                        </select>
                    </div>
                    <div className='row'>
                        <label className='form-label'>Адрес прописки<Required /></label>
                        <input value={userInfo.addressRegistered} onChange={setFieldActionCreator('addressRegistered')} required className='form-input' />
                    </div>
                    <div className='row'>
                        <label className='form-label'>Семейное положение<Required /></label>
                        <select name="familyStatus" value={userInfo.familyStatus} onChange={setFieldActionCreator('familyStatus')}>
                            {staticData.familyStatuses.map(fs => <option vlaue={fs.name}>{fs.name}</option>)}
                        </select>
                    </div>
                    <div className='row'>
                        <label className='form-label'>Гражданство<Required /></label>
                        <select name="citizenship" value={userInfo.citizenship} onChange={setFieldActionCreator('citizenship')}>
                            {staticData.citizenships.map(fs => <option vlaue={fs.name}>{fs.name}</option>)}
                        </select>
                    </div>
                    <div className='row'>
                        <label className='form-label'>Инвалидность<Required /></label>
                        <select name="disability" value={userInfo.disability} onChange={setFieldActionCreator('disability')}>
                            {staticData.disabilities.map(fs => <option vlaue={fs.name}>{fs.name}</option>)}
                        </select>
                    </div>
                    <div className='row'>
                        <label className='form-label'>Пенсионер<Required /></label>
                        <input type='checkbox' checked={userInfo.pensioner} onClick={() => setUserInfo({...userInfo, pensioner: !userInfo.pensioner})} className='form-input' />
                    </div>
                    <div className='row'>
                        <label className='form-label'>Военнообязанный<Required /></label>
                        <input type='checkbox' checked={userInfo.militarian} onClick={() => setUserInfo({...userInfo, militarian: !userInfo.militarian})} className='form-input' />
                    </div>
                    <div className='row'>
                        <label className='form-label'>Ежемесячный доход, BYN<Required /></label>
                        <input type='number' value={userInfo.monthIncome} onChange={setFieldActionCreator('monthIncome', validators.monthIncome)} required className='form-input' />
                    </div>
                </div>
            </div>
        </>
    );
}

export const Required = () => {
    return <span style={{color: 'red'}}>*</span>;
}

export default UserFormBody;