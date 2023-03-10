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
            headerName: 'Дебет после операции',
            flex: 0.15,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left'
        },
        {
            field: 'credit',
            headerName: 'Кредит после операции',
            flex: 0.15,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left'
        },
        {
            field: 'sum',
            headerName: 'Переведено',
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
        Счёт: <span style={{color: accState.account.isWorking ? 'black' : 'red'}}>{accState.account.code} {accState.account.number}</span>
        <DataGrid
            headerHeight={100}
            rowHeight={27}
            rows={accState.transactionList}
            columns={columns}
            getRowId={(x) => x.id}
            disableSelectionOnClick
            pageSize={10}
            pagination
            sx={{
                height: '59vh',
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