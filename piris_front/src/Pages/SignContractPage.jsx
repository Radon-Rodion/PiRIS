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
                newVM.personName = res[0].data.name;
                newVM.personSurname = res[0].data.surname;
                newVM.personMiddlename = res[0].data.middlename;
                newVM.passportSeria = res[0].data.passportSeria;
                newVM.passportNumber = res[0].data.passportNumber;
                newVM.passportIdentityNumber = res[0].data.passportIdentityNumber;
                newVM.cityLiving = res[0].data.city;
                newVM.addressLiving = res[0].data.addressLiving;

                newVM.isRequestable = res[1].data?.value?.isRequestable;
                newVM.isDifferentive = res[1].data?.value?.isDifferentive;
                newVM.name = res[1].data?.value?.name;
                newVM.description = res[1].data?.value?.description;
                newVM.currency = res[1].data?.value?.availableCurrencies?.split('/')?.[0];
                newVM.durationMonth = res[1].data?.value?.minDurationInMonth ?? 0;
                newVM.percentPerYear = res[1].data?.value?.percentPerYear*100;

                newVM.number = res[2].data;

                const newLimiters = { ...limiters };
                newLimiters.minDuration = res[1].data?.value?.minDurationInMonth ?? 0;
                newLimiters.maxDuration = res[1].data?.value?.maxDurationInMonth ?? 360;
                newLimiters.minSum = res[1].data?.value?.sumFrom ?? 0;
                newLimiters.maxSum = res[1].data?.value?.sumTo ?? 100000000;
                newLimiters.currencies = res[1].data?.value?.availableCurrencies?.split('/') ?? [];
                setLoading(false);
                setLimiters(newLimiters);
                setContractVM(newVM);
            }).catch(err => processErrRequest(err))
                .finally(() => setLoading(false));
        }
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        const request = isDebet ? requests.debet.sign(id, contractVM) : requests.credit.sign(id, contractVM);
        request.then(resp => {
            console.log(resp);
            //navigate(-1);
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