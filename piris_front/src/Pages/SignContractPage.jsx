import ContractFormBody from "../Components/ContractFormBody";
import { ButtonGroup, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import requests from '../agent';
import { useState } from "react";
import { processErrRequest } from '../Helpers/ErrReqProcessor';


const SignContractPage = ({ isDebet = true }) => {
    const navigate = useNavigate();
    const [userVM, setUserVM] = useState({ //TODO
        sirname: '',
        name: '',
        middlename: '',
        birthDate: '',
        city: '',
        cityRegistered: '',
        citizenship: '',
        role: '',
        disability: '',
        familyStatus: '',
        sex: false,
        passportSeria: '',
        passportNumber: '',
        passportGivenBy: '',
        passportGivenAt: '',
        passportIdentityNumber: '',
        placeOfBirth: '',
        addressLiving: '',
        homePhone: undefined,
        mobilePhone: undefined,
        emailAddress: undefined,
        workPlace: undefined,
        workPosition: undefined,
        addressRegistered: '',
        pensioner: false,
        militarian: false,
        monthIncome: undefined
    });
    const onSubmit = () => { //TODO
        requests.users.create(userVM).then(resp => {
            console.log(resp);
            navigate('/');
        }).catch(err => {
            processErrRequest(err);
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <ContractFormBody userInfo={userVM} setUserInfo={setUserVM} isDebet={isDebet} />
            <ButtonGroup className='form-buttons'>
                <Button type='submit'>Заключить</Button>
                <Button onClick={() => navigate(-1)}>Отмена</Button>
            </ButtonGroup>
        </form>
    );
};

export default SignContractPage;