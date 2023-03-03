import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

const OptionsListTable = ({ contractsList, redirectPath }) => {
    const navigate = useNavigate();
    const columns = [
        {
            field: 'id',
            headerName: 'Id',
            flex: 0.05,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left',
            renderCell: (props) => (<NavLink to={redirectPath+props.row.id}>{props.row.id}</NavLink>)
        },
        {
            field: 'name',
            headerName: 'Название',
            flex: 0.15,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left'
        },
        {
            field: 'isRequestable',
            headerName: 'Отзывной',
            flex: 0.15,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left',
            renderCell: (props) => (props.row.isRequestable ? 'Да' : 'Нет')
        },
        {
            field: 'percentPerYear',
            headerName: 'Процент в год',
            flex: 0.15,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left'
        },
        {
            field: 'sumFrom',
            headerName: 'Сумма от',
            flex: 0.15,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left'
        },
        {
            field: 'sumTo',
            headerName: 'Сумма до',
            flex: 0.15,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left'
        },
        {
            field: 'minDurationInMonth',
            headerName: 'Минимальный срок, мес',
            flex: 0.15,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left'
        },
        {
            field: 'maxDurationInMonth',
            headerName: 'Максимальный срок, мес',
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

export default OptionsListTable;