import { useContext, useEffect } from "react";
import PageContext, { ACC_STATE, ENTER_ACC_NUMBER, ENTER_CARD_NUMBER_FOR_TRANSACTION, ENTER_SUM_TO_TAKE } from "../Context/PageContext";
import OperationContext from "../Context/OperationContext";

const ChooseOperation = () => {
    const { page, setPage } = useContext(PageContext);
    const {operationReport, setOperationReport} = useContext(OperationContext);

    useEffect(() => {
        setOperationReport({});
    }, []);

    const take = () => {
        setPage(ENTER_SUM_TO_TAKE);
    }

    const transact = () => {
        setPage(ENTER_CARD_NUMBER_FOR_TRANSACTION);
    }

    const view = () => {
        setPage(ACC_STATE);
    }

    const cancel = () => {
        setPage(ENTER_ACC_NUMBER);
    }

    return (
        <div>
            <h5>Выберите операцию</h5><br />
            <div className="row justify">
                <div className="col">
                    <button onClick={take}>Снятие наличных</button>
                    <button onClick={transact}>Денежный перевод</button>
                </div>
                <div className="col">
                    <button onClick={view}>Просмотр счёта</button>
                    <button onClick={cancel}>Забрать карту</button>
                </div>
            </div>
        </div>
    )
}

export default ChooseOperation;