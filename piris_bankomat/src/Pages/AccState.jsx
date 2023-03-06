import { useContext, useEffect } from "react";
import AccContext from "../Context/AccContext";
import OperationContext from "../Context/OperationContext";
import PageContext, { ANY_MORE_OPERATIONS } from "../Context/PageContext";
import PrintButton from "../Helpers/PrintButton";
import requests from "../requests";

const AccState = () => {
    const { page, setPage } = useContext(PageContext);
    const {accNumber, setAccNumber} = useContext(AccContext);
    const {operationReport, setOperationReport } = useContext(OperationContext);

    useEffect(() => {
        requests.accState(accNumber).then(resp => {
            setOperationReport({...operationReport,
            operation: 'Просмотр счёта',
            debet: `${resp.data.debet} BYN`,
            credit: `${resp.data.credit} BYN`});
        });
    }, []);
    
    const go = () => {
        setPage(ANY_MORE_OPERATIONS);
    }

    return (
        <div>
            <h5>Состояние счёта</h5><br />
            <h5>Печатать чек?</h5><br />
            <p>Дебет: {operationReport.debet}</p>
            <p>Кредит: {operationReport.credit}</p>
            <div className="row justify">
                <PrintButton operationReport={operationReport} text='Да' onClick={go}/>
                <button onClick={go}>Нет</button>
            </div>
        </div>
    )
};

export default AccState;