import { useContext } from "react"
import PageContext, { ACC_STATE, ANY_MORE_OPERATIONS, CHOOSE_OPERATION, ENTER_ACC_NUMBER, ENTER_ACC_PIN, ENTER_CARD_NUMBER_FOR_TRANSACTION, ENTER_SUM_FOR_TRANSACTION, ENTER_SUM_TO_TAKE, OPERATION_COMPLETE, TAKE_CARD } from "../Context/PageContext";
import EnterAccNumber from "./EnterAccNumber";
import EnterAccPin from "./EnterAccPin";
import TakeCard from "./TakeCard";
import AnyMoreOperations from "./AnyMoreOperations";
import ChooseOperation from "./ChooseOperation";
import EnterSumToTake from "./EnterSumToTake";
import AccState from "./AccState";
import OperationComplete from "./OperationComplete";
import EnterCardNumberForTransaction from "./EnterCardNumberForTransaction";
import EnterSumForTransaction from "./EnterSumForTransaction";


const SwitchPage = () => {
    const {page, setPage} = useContext(PageContext);

    switch(page){
        case ANY_MORE_OPERATIONS:
            return <AnyMoreOperations />;
        case TAKE_CARD:
            return <TakeCard />;
        case ENTER_ACC_NUMBER:
            return <EnterAccNumber />;
        case ENTER_ACC_PIN:
            return <EnterAccPin />;
        case CHOOSE_OPERATION:
            return <ChooseOperation />;
        case ENTER_CARD_NUMBER_FOR_TRANSACTION:
            return <EnterCardNumberForTransaction />;
        case ENTER_SUM_FOR_TRANSACTION:
            return <EnterSumForTransaction />;
        case ENTER_SUM_TO_TAKE:
            return <EnterSumToTake />;
        case ACC_STATE:
            return <AccState />;
        case OPERATION_COMPLETE:
            return <OperationComplete />;
    };

    setPage(ENTER_ACC_NUMBER);
    return undefined;
}

export default SwitchPage;