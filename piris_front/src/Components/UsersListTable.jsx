import { useNavigate, NavLink } from 'react-router-dom';
import requests from "../agent";
import React from "react";
import Button from "@mui/material/Button/Button";
import edit from "../Assets/edit.png";
import { DataGrid } from "@mui/x-data-grid";

const UsersListTable = ({ usersList }) => {
    const navigate = useNavigate();
    const columns = [
        {
            field: 'id',
            headerName: 'id',
            flex: 0.05,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left',
            renderCell: (props) => (<NavLink to={`/users/user/${props.row.id}`}>{props.row.id}</NavLink>)
        },
        {
            field: 'surname',
            headerName: 'Фамилия',
            flex: 0.15,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left',
            cellClassName: 'subtext'
        },
        {
            field: 'name',
            headerName: 'Имя',
            flex: 0.15,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left',
            cellClassName: 'subtext'
        },
        {
            field: 'middlename',
            headerName: 'Отчество',
            flex: 0.15,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left',
            cellClassName: 'subtext'
        },
        {
            field: 'birthDate',
            headerName: 'Дата рождения',
            flex: 0.15,
            headerClassName: 'subtext',
            headerAlign: 'left',
            align: 'left',
            cellClassName: 'subtext'
        },
        {
            field: 'edit',
            headerName: '',
            width: 10,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                return params.row.canEdit ?
                    <Button style={{ width: '10px', minWidth: '10px' }} color="success" title='Редактирование' onClick={() => navigate(`/projects/edit/${params.row.userId}`)}>
                        <img src={edit} height="15px" />
                    </Button>
                    : undefined
            },
            headerClassName: "muiDatatableHeaderHideRightSeparator"
        },
        {
            field: 'delete',
            headerName: '',
            width: 10,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                return params.row.canDelete ?
                    <Button color="error" style={{ width: '10px', minWidth: '10px' }} title='Удаление'
                        onClick={() => {
                            if (window.confirm('Вы действительно желаете удалить пользователя?')) {
                                requests.users.delete(params.row.userId)
                            }
                        }
                        }>
                        <i className="fa fa-solid fa-trash" />
                    </Button>
                    : undefined
            },
            headerClassName: "muiDatatableHeaderHideRightSeparator"
        }
    ];

    return (
        <DataGrid
            headerHeight={100}
            rowHeight={52}
            rows={usersList}
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
    );
}

export default UsersListTable;