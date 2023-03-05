import ContractFormBody from "../Components/ContractFormBody";
import { ButtonGroup, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import requests from '../agent';
import { useEffect, useState } from "react";
import { processErrRequest } from '../Helpers/ErrReqProcessor';
import { useParams } from "react-router";
import axios from "axios";


const SignContractPage = ({ isDebet = true }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [contractVM, setContractVM] = useState({ //TODO
        name: '',
        description: '',
        number: '',
        account1Number: undefined,
        account2Number: undefined,
        isRequestable: isDebet ? false : undefined,
        isDifferentive: !isDebet ? false : undefined,
        durationMonth: 0,
        personName: undefined,
        personSurname: undefined,
        personMiddlename: undefined,
        passportSeria: undefined,
        passportNumber: undefined,
        passportIdentityNumber: undefined,
        cityLiving: undefined,
        addressLiving: undefined,
        sum: 0,
        currency: undefined,
        percentPerYear: 0,
    });
    const [limiters, setLimiters] = useState({
        minDuration: 0,
        maxDuration: 360,
        minSum: 0,
        maxSum: 0,
        currencies: []
    });
    const requestForNumber = () => isDebet ? requests.debet.contractNumber(id) : requests.credit.contractNumber(id);
    const requestForOption = () => isDebet ? requests.debet.option(id) : requests.credit.option(id);

    useEffect(() => {
        if (loading) {
            const requestsArr = [requests.users.currentUser(), requestForOption(), requestForNumber()];
            axios.all(requestsArr).then(res => {
                const newVM = { ...contractVM };
                newVM.personName = res[0].personName;
                newVM.personSurname = res[0].personSurname;
                newVM.personMiddlename = res[0].personMiddlename;
                newVM.passportSeria = res[0].passportSeria;
                newVM.passportNumber = res[0].passportNumber;
                newVM.passportIdentityNumber = res[0].passportIdentityNumber;
                newVM.cityLiving = res[0].city;
                newVM.addressLiving = res[0].addressLiving;

                newVM.isRequestable = res[1].isRequestable;
                newVM.isDifferentive = res[1].isDifferentive;
                newVM.name = res[1].name;
                newVM.description = res[1].description;
                newVM.currency = res[1].availableCurrencies.split('/')?.[0];
                newVM.durationMonth = res[1].minDurationInMonth ?? 0;
                newVM.percentPerYear = res[1].percentPerYear;

                newVM.number = res[2];

                const newLimiters = { ...limiters };
                newLimiters.minDuration = res[1].minDurationInMonth ?? 0;
                newLimiters.maxDuration = res[1].maxDurationInMonth ?? 360;
                newLimiters.minSum = res[1].sumFrom ?? 0;
                newLimiters.maxSum = res[1].sumTo ?? 100000000;
                newLimiters.currencies = res[1].availableCurrencies.split('/');
                setLoading(false);
                setLimiters(newLimiters);
                setContractVM(newVM);
            }).catch(err => processErrRequest(err))
                .finally(() => setLoading(false));
        }
    }, [])

    const onSubmit = () => {
        const request = isDebet ? requests.debet.sign(id, contractVM) : requests.credit.sign(id, contractVM);
        request.then(resp => {
            console.log(resp);
            navigate(-1);
        }).catch(err => processErrRequest(err));
    }

    return (
        <form onSubmit={onSubmit}>
            <ContractFormBody contractInfo={contractVM} setContractInfo={setContractVM} limiters={limiters} isDebet={isDebet} />
            <ButtonGroup className='form-buttons'>
                <Button type='submit'>Заключить</Button>
                <Button onClick={() => navigate(-1)}>Отмена</Button>
            </ButtonGroup>
        </form>
    );
};

export default SignContractPage;