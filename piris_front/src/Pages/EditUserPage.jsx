import { ButtonGroup, Button } from "@mui/material";
import {useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router";
import UserFormBody from "../Components/UserFormBody";
import requests from '../agent';
import { toast } from "react-hot-toast";
import { baseUserVM } from "../Helpers/Constants";
import { processErrRequest } from "../Helpers/ErrReqProcessor";

const EditUserPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [userVM, setUserVM] = useState(baseUserVM);

    const request = () => id==undefined ? requests.users.editCurrent(userVM) : requests.users.edit(id, userVM);

    useEffect(() => {
        if(loading){
            setLoading(false);
            if(id === undefined){
            requests.users.currentUser().then(resp => {
                setUserVM(resp.data);
            })
            } else {
                requests.users.user(id).then(resp => {
                    setUserVM(resp.data);
                }).catch(err=> toast(err.response.data))
            }
        }
    });
    const onSubmit = (e) => {
        e.preventDefault();
        request().then(resp => {
            console.log(resp);
            navigate('/users/user');
        }).catch(err => {
            processErrRequest(err);
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <UserFormBody userInfo={userVM} setUserInfo={setUserVM} />
            <ButtonGroup className='form-buttons'>
                <Button type='submit'>Редактировать</Button>
                <Button onClick={() => navigate(-1)}>Назад</Button>
            </ButtonGroup>
        </form>
    );
}

export default EditUserPage;