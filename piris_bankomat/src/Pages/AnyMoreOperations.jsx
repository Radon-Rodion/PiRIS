import { useContext } from "react";
import PageContext, { ENTER_ACC_NUMBER, ENTER_ACC_PIN } from "../Context/PageContext";

const AnyMoreOperations = () => {
    const { page, setPage } = useContext(PageContext);

    const enter = () => {
        setPage(ENTER_ACC_PIN);
    }

    const cancel = () => {
        setPage(ENTER_ACC_NUMBER);
    }

    return (
        <div>
            <h5>Вы желаете продолжить?</h5><br /><br /><br />
            <div className="row justify">
                <button onClick={enter}>Да</button>
                <button onClick={cancel}>Нет</button>
            </div>
        </div>
    )
}

export default AnyMoreOperations;