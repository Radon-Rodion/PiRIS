import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import requests from '../agent';
import OptionsListTable from "../Components/OptionsListTable";
import ModalLoader from '../Elements/ModalLoader';
import { processErrRequest } from '../Helpers/ErrReqProcessor';


const DebetOptionsPage = () => {
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState([]);
    useEffect(() => {
        if(loading){
            setLoading(false);
            requests.debet.allOptions().then(res => {
                console.log(res);
                setOptions(res.data);
            }).catch(err => processErrRequest(err));
        }
    }, [loading]);

    return (<>
    <ModalLoader show={loading}/>
    <h1 className="central">Варианты вкладов</h1>
        <OptionsListTable contractsList={options} redirectPath='/debet/options/'/>
    </>);
}

export default DebetOptionsPage;