import { useContext } from "react";
import OperationContext from "../Context/OperationContext";
import PageContext, { ANY_MORE_OPERATIONS } from "../Context/PageContext";
import PrintButton from "../Helpers/PrintButton";

const OperationComplete= () => {
    const { page, setPage } = useContext(PageContext);
    const {operationReport, setOperationReport } = useContext(OperationContext);

    const go = () => {
        setPage(ANY_MORE_OPERATIONS);
    }

    return (
        <div>
            <h5>Операция завершена</h5><br />
            <h5>Печатать чек?</h5><br />
            <div className="row justify">
                <PrintButton operationReport={operationReport} text='Да' onClick={go}/>
                <button onClick={go}>Нет</button>
            </div>
        </div>
    )
}

export default OperationComplete;