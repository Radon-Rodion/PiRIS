import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import requests from '../agent';
import TransactionsListTable from "../Components/TransactionsListTable";
import AccountsStatisticsGraph from "../Components/AccountsStatisticsGraph";
import CloseBankDayLine from "../Components/ClosaBankDayLine";


const TransactionsPage = ({showBank = false}) => {
    const [loading, setLoading] = useState(true);
    const [accStates, setAccStates] = useState([]);
    useEffect(() => {
        if(loading){
            setLoading(false);
            const request = showBank ? requests.transactions.bank : requests.transactions.current;
            request.then(res => {
                console.log(res);
                setAccStates(res.data);
            }).catch(err => console.error(err));
        }
    }, [loading]);

    return (<>
        {accStates.map(as => <TransactionsListTable accState={as} />)}
        <AccountsStatisticsGraph data={accStates} />
        <CloseBankDayLine setLoading={setLoading} data={accStates}/>
    </>);
}

export default TransactionsPage;