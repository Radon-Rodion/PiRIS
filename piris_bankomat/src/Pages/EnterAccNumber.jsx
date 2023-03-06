import { useContext, useEffect, useRef, useState } from "react"
import AccContext from "../Context/AccContext";
import PageContext, { ENTER_ACC_PIN, TAKE_CARD } from "../Context/PageContext";
import processError from "../Helpers/ProcessError";
import requests from "../requests";


const EnterAccNumber = () => {
    const numberRef = useRef();
    const { accNumber, setAccNumber } = useContext(AccContext);
    const {page, setPage} = useContext(PageContext);

    const enter = () => {
        requests.checkAccount(numberRef.current.value).then(() => {
            setAccNumber(numberRef.current.value);
            setPage(ENTER_ACC_PIN);
        }).catch(err => processError(err));
    }

    return (
        <div>
            <h5>Вставьте, пожалуйста, карту</h5>
            <h5>(введите её номер)</h5><br />
            <input ref={numberRef} /><br/>
            <button onClick={enter}>Далее</button>
        </div>
    );
}

export default EnterAccNumber;