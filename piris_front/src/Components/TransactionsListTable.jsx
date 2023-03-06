import { useNavigate } from "react-router";

const TransactionsListTable = ({transactions}) => {
    const columns = [
        {
            field: 'id',
            headerName: 'Id',
            flex: 0.1,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left'
        },
        {
            field: 'date',
            headerName: 'Дата',
            flex: 0.15,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left'
        },
        {
            field: 'debet',
            headerName: 'Дебет после',
            flex: 0.15,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left'
        },
        {
            field: 'credit',
            headerName: 'Кредит после',
            flex: 0.15,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left'
        },
        {
            field: 'sum',
            headerName: 'Сумма',
            flex: 0.15,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left'
        },
        {
            field: 'account',
            headerName: 'Другой счёт',
            flex: 0.15,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left'
        },
    ];
}

export default TransactionsListTable;