import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import ContractOptionInfo from "../Components/ContractOptionInfo";
import requests from "../agent";
import { processErrRequest } from '../Helpers/ErrReqProcessor';
import { Button, ButtonGroup } from "@mui/material";


const ContractOptionPage = ({ isDebet = true }) => {
    const { contractId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [contractInfo, setContractInfo] = useState({});

    useEffect(() => {
        if (loading) {
            const request = isDebet ? requests.debet.option(contractId) : requests.credit.option(contractId);
            request.then(res => {
                console.log(res);
                setLoading(false);
                setContractInfo(res.data);
            }).catch(err => {
                console.err(err);
                processErrRequest(err);
            }).finally(() => setLoading(false));
        }
    }, [loading]);

    return (
        <>
            <ContractOptionInfo info={contractInfo} isDebet={isDebet}/>
            <ButtonGroup>
                <Button onClick={() => navigate(`/${isDebet ? 'debet' : 'credit'}/options/sign/${contractId}`)}>Заключить</Button>
                <Button color='error' onClick={() => navigate(-1)}>Назад</Button>
            </ButtonGroup>
        </>
    );
};

export default ContractOptionPage;