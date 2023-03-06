import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const Check = React.forwardRef(({ operationReport }, ref) => (
    <div ref={ref}>
        <h5>отчёт об операции</h5>

        <p>Операция: {operationReport.operation}</p>

        {operationReport.sum == undefined ? undefined : (
            <p>Сумма: operationReport.sum</p>
        )}
        {operationReport.accountTo == undefined ? undefined : (
            <p>Получатель: operationReport.accountTo</p>
        )}
        {operationReport.debet == undefined ? undefined : (
            <p>Дебет: operationReport.debet</p>
        )}
        {operationReport.debet == undefined ? undefined : (
            <p>Кредит: operationReport.credit</p>
        )}

        <p>Дата и время: {new Date().toLocaleString()}</p>
    </div>
));

const PrintButton = ({ operationReport, text='Печать', onClick = () => { } }) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (<>
        <div style={{display: 'none'}}><Check operationReport={operationReport} ref={componentRef} /></div>
        <button onClick={() => {handlePrint(); onClick();}}>{text}</button>
    </>);
}

export default PrintButton;