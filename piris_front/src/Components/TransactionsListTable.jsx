import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router";

const TransactionsListTable = ({accState}) => {
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

    return <>
        Счёт: {accState.account.number}
        <DataGrid
            headerHeight={100}
            rowHeight={52}
            rows={accState.transactionList}
            columns={columns}
            getRowId={(x) => x.id}
            disableSelectionOnClick
            pageSize={10}
            pagination
            sx={{
                height: '75vh',
                my: '35px',
                '& .MuiDataGrid-columnHeaderTitle': {
                    textOverflow: "clip",
                    whiteSpace: "break-spaces",
                    lineHeight: 1,
                    textAlign: "left"
                },

            }}
        />
    </>
}

export default TransactionsListTable;