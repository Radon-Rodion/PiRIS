import { useContext, useEffect, useRef, useState } from "react"
import AccContext from "../Context/AccContext";
import OperationContext from "../Context/OperationContext";
import PageContext, { ANY_MORE_OPERATIONS, ENTER_SUM_FOR_TRANSACTION, OPERATION_COMPLETE } from "../Context/PageContext";
import processError from "../Helpers/ProcessError";
import requests from "../requests";

const EnterSumForTransaction = () => {
    const sumRef = useRef();
    const { operationReport, setOperationReport } = useContext(OperationContext);
    const {accNumber, setAccNumber} = useContext(AccContext);
    const { page, setPage } = useContext(PageContext);

    const performOperation = () => {
        requests.transaction({accountFrom: accNumber, accountTo: operationReport.accountTo, sum: sumRef.current.value}).then(() => {
            setOperationReport({ ...operationReport, sum: `${sumRef.current.value} BYN` });
            setPage(OPERATION_COMPLETE);
        }).catch(err => processError(err));
    }

    const enter = () => {
        requests.checkSum({acc: accNumber, sum: sumRef.current.value}).then(() => {
            performOperation();
        }).catch(err => processError(err));
    }

    const cancel = () => {
        setPage(ANY_MORE_OPERATIONS);
    }

    return (
        <div>
            <h5>Введите сумму перевода, BYN</h5><br />
            <input ref={sumRef} /><br />
            <div className="row justify">
                <button onClick={enter}>Далее</button>
                <button onClick={cancel}>Отмена</button>
            </div>
        </div>
    );
}

export default EnterSumForTransaction;