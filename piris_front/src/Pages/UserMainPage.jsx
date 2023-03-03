import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import requests from "../agent";
import { Button, ButtonGroup } from "@mui/material";
import { ROLE } from "../Helpers/Constants";
import UserInfo from "../Components/UserInfo";
import { toast } from "react-hot-toast";
import { processErrRequest } from '../Helpers/ErrReqProcessor';


const UserMainPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if(loading){
            setLoading(false);
            if(id === undefined){
                requests.users.currentUser().then(resp => {
                    setUserData(resp.data);
                }).catch(err => processErrRequest(err));
            } else {
                requests.users.user(id).then(resp => {
                    setUserData(resp.data);
                }).catch(err=> processErrRequest(err))
            }
        }
    });

    const onEditClick = () => {
        if(id === undefined){
            navigate('/users/edit')
        } else {
            console.log('HHHERRHRR', id);
            navigate(`/users/edit/${id}`);
        }
    }

    const onDeleteClick = () => {
        if(window.confirm('Вы действительно желаете удалить аккаунт?')){
            if(id === undefined){
                requests.users.deleteCurrent().then(resp => {
                    console.log(resp);
                    sessionStorage.removeItem(ROLE);
                    navigate('/');
                })
            } else {
                requests.users.delete(id).then(resp => {
                    console.log(resp);
                });
            }
        }
    }

    return (
        <div>
            <h1 className="central">Просмотр информации о пользователе</h1>
            <UserInfo info={userData} />
            <ButtonGroup>
                <Button onClick={onEditClick}>Редактировать</Button>
                <Button color='error' onClick={onDeleteClick}>Удалить</Button>
            </ButtonGroup>
        </div>
    )
}

export default UserMainPage;