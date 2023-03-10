import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import requests from '../agent';
import ContractsListTable from "../Components/ContractsListTable";
import ModalLoader from '../Elements/ModalLoader';


const CreditContractsPage = ({ showAll = false }) => {
    const [loading, setLoading] = useState(true);
    const [contracts, setContracts] = useState([]);
    useEffect(() => {
        if (loading) {
            setLoading(false);
            const request = showAll ? requests.credit.allContracts : requests.credit.currentContracts;
            request().then(res => {
                console.log(res);
                setContracts(res.data);
            }).catch(err => console.error(err));
        }
    }, [loading]);

    return (<>
        <ModalLoader show={loading} />
        <h1 className="central">Кредиты</h1>
        <ContractsListTable contractsList={contracts} redirectPath='/credit/contracts' isDebet={false} />
    </>);
}

export default CreditContractsPage;