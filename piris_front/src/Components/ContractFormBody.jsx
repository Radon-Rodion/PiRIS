import { useState } from "react";
import validators from "../Helpers/Validators";


const ContractFormBody = ({contractInfo, setContractInfo, isDebet=true}) => {
    const setFieldActionCreator = (fieldName, formatter = (newVal) => true) => (e) => {
        console.log('set', e.target.value);
        const newVal = e.target.value;
        if (!formatter(newVal)) return;
        const newContractInfo = { ...contractInfo };
        newContractInfo[fieldName] = newVal;
        setContractInfo(newContractInfo);
    };

    return (
        <div className='col'>
            <div className='row'>
                <label className='form-label'>Фамилия</label>
                <input value={contractInfo.surname} onChange={setFieldActionCreator('surname', validators.nameSurnameMiddlename)} required className='form-input' />
            </div>
        </div>
    );
}

export default ContractFormBody;