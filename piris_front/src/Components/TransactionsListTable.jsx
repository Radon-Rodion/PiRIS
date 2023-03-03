import { useNavigate } from "react-router";

const TransactionsListTable = ({transactions}) => {
    const navigate = useNavigate();
    const columns = [
        {
            field: 'id',
            headerName: 'Id',
            flex: 0.1,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left'
        },
    ];
}

export default TransactionsListTable;