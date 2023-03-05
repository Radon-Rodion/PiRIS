import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import requests from "../agent";
import { processErrRequest } from '../Helpers/ErrReqProcessor';
import { Button, ButtonGroup } from "@mui/material";
import ContractInfo from "../Components/ContractInfo";


const ContractPage = ({ isDebet = true }) => {
    const { contractId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [contractInfo, setContractInfo] = useState({});

    useEffect(() => {
        if (loading) {
            const request = isDebet ? requests.debet.contract(contractId) : requests.credit.contract(contractId);
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
            <ContractInfo info={contractInfo} isDebet={isDebet}/>
            <ButtonGroup>
                <Button onClick={() => navigate(-1)}>Назад</Button>
            </ButtonGroup>
        </>
    );
};

export default ContractPage;