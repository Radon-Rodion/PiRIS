import { useContext, useEffect } from "react"
import AccContext from "../Context/AccContext";
import PageContext, { ENTER_ACC_NUMBER } from "../Context/PageContext";

const TakeCard = () => {
    const { accNumber, setAccNumber } = useContext(AccContext);
    const {page, setPage} = useContext(PageContext);

    useEffect(() => {
        setAccNumber('');
    }, []);

    const enter = () => {
        setPage(ENTER_ACC_NUMBER);
    }

    return (
        <div>
            <h5>Заберите карту</h5><br/><br/><br/>
            <button onClick={enter}>Ок</button>
        </div>
    )
}

export default TakeCard;