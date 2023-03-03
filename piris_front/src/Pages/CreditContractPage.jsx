import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router";
import ContractInfo from "../Components/ContractInfo";
import requests from "../agent";
import { processErrRequest } from '../Helpers/ErrReqProcessor';


const CreditContractPage = () => {
    const {contractId} = useParams();
    const [loading, setLoading] = useState(true);
    const [contractInfo, setContractInfo] = useState({});

    useEffect(() => {
        if(loading){
            setLoading(false);
            requests.credit.contract(contractId).then(res => {
                console.log(res);
                setContractInfo(res.data);
            }).catch(err => {
                console.err(err);
                processErrRequest(err);
            })
        }
    }, [loading]);

    return(
        <ContractInfo info={contractInfo} />
    );
};

export default CreditContractPage;