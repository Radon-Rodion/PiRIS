import { Button } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import requests from "../agent";
import { processErrRequest } from "../Helpers/ErrReqProcessor";


const CloseBankDayLine = ({ setLoading = (val)=>{}, data={} }) => {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        requests.staticData.appDate().then(resp => setDate(resp.data))
        .catch(err => processErrRequest(err));
    }, [data]);

    const onClickCreator = (request) => {
        request().then(() => setLoading(true)).catch(err => processErrRequest(err));
    }

    return <div className="row justify" style={{position: 'fixed', bottom: '0', width: '100%'}}>
        <Button onClick={onClickCreator(requests.transactions.closeDay)}>Закрыть день</Button>
        <Button onClick={onClickCreator(requests.transactions.closeMonth)}>Закрыть месяц</Button>
        <span>Дата: {date.toDateString()}</span>
    </div>
}

export default CloseBankDayLine;