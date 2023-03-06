import { useContext, useEffect, useRef, useState } from "react"
import { toast } from "react-hot-toast";
import AccContext from "../Context/AccContext";
import PageContext, { ENTER_ACC_PIN, TAKE_CARD } from "../Context/PageContext";
import processError from "../Helpers/ProcessError";
import requests from "../requests";


const EnterAccPin = () => {
    const pinRef = useRef();
    const [attemtsLeft, setAttemptsLeft] = useState(3);
    const { accNumber, setAccNumber } = useContext(AccContext);
    const { page, setPage } = useContext(PageContext);

    useEffect(() => {
        if (attemtsLeft <= 0) {
            toast.error('Вы 3 раза ввели неверный PIN-код');
            setPage(TAKE_CARD);
        }
    }, [attemtsLeft]);

    const enter = () => {
        requests.checkPin({acc: accNumber, pin: pinRef.current.value}).then(() => {
            setPage(ENTER_ACC_PIN);
        }).catch(err => {
            processError(err);
            setAttemptsLeft(attemtsLeft - 1);
        });
    }

    const cancel = () => {
        setPage(TAKE_CARD);
    }

    return (
        <div>
            <h5>Введите PIN-код</h5>
            <h5>(осталось попыток: {attemtsLeft})</h5><br />
            <input ref={pinRef} /><br />
            <div className="row justify">
                <button onClick={enter}>Далее</button>
                <button onClick={cancel}>Отмена</button>
            </div>
        </div>
    );
}

export default EnterAccPin;