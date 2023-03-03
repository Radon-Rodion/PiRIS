import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import requests from '../agent';
import TransactionsListTable from "../Components/TransactionsListTable";


const TransactionsPage = ({showAll = false}) => {
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        if(loading){
            setLoading(false);
            const request = showAll ? requests.transactions.all : requests.transactions.current;
            request.then(res => {
                console.log(res);
                setTransactions(res.data);
            }).catch(err => console.error(err));
        }
    }, [loading]);

    return (<>
        <TransactionsListTable transactions={transactions} />
    </>);
}

export default TransactionsPage;