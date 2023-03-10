import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

const ContractsListTable = ({ contractsList, redirectPath, isDebet = true }) => {
    const columns = [
        {
            field: 'id',
            headerName: 'Id',
            flex: 0.05,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left',
            renderCell: (props) => (<NavLink to={redirectPath+'/'+props.row.id}>{props.row.id}</NavLink>)
        },
        {
            field: 'name',
            headerName: 'Название',
            flex: 0.15,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left'
        },
        isDebet ? {
            field: 'isRequestable',
            headerName: 'Отзывной',
            flex: 0.15,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left',
            renderCell: (props) => (props.row.isRequestable ? 'Да' : 'Нет')
        } : {
            field: 'isDifferentive',
            headerName: 'Дифференцированный',
            flex: 0.15,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left',
            renderCell: (props) => (props.row.isDifferentive ? 'Да' : 'Нет')
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
            field: 'percentPerYear',
            headerName: 'Процент в год',
            flex: 0.15,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left',
            renderCell: (props) => (`${props.row.percentPerYear*100}%`)
        },
        {
            field: 'startDate',
            headerName: 'Заключён',
            flex: 0.15,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left'
        },
        {
            field: 'endDate',
            headerName: 'Действует до',
            flex: 0.15,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left'
        }
    ];

    return (
        <DataGrid
            headerHeight={100}
            rowHeight={52}
            rows={contractsList}
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
    )
}

export default ContractsListTable;