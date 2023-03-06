import { useContext, useEffect, useRef, useState } from "react"
import OperationContext from "../Context/OperationContext";
import PageContext, { ANY_MORE_OPERATIONS, ENTER_SUM_FOR_TRANSACTION } from "../Context/PageContext";
import processError from "../Helpers/ProcessError";
import requests from "../requests";

const EnterCardNumberForTransaction = () => {
    const numberRef = useRef();
    const { operationReport, setOperationReport } = useContext(OperationContext);
    const { page, setPage } = useContext(PageContext);

    useEffect(() => {
        setOperationReport({ ...operationReport, operation: 'Денежный перевод' });
    }, []);

    const enter = () => {
        requests.checkAccount(numberRef.current.value).then(() => {
            setOperationReport({ ...operationReport, accountTo: numberRef.current.value });
            setPage(ENTER_SUM_FOR_TRANSACTION);
        }).catch(err => processError(err));
    }

    const cancel = () => {
        setPage(ANY_MORE_OPERATIONS);
    }

    return (
        <div>
            <h5>Введите номер счёта получателя</h5><br />
            <input ref={numberRef} /><br />
            <div className="row justify">
                <button onClick={enter}>Далее</button>
                <button onClick={cancel}>Отмена</button>
            </div>
        </div>
    );
}

export default EnterCardNumberForTransaction;