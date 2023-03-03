import { ButtonGroup, Button } from "@mui/material";
import {useState} from 'react';
import { useNavigate } from "react-router";
import UserFormBody from "../Components/UserFormBody";
import requests from '../agent';
import { toast } from "react-hot-toast";
import { baseUserVM } from "../Helpers/Constants";
import { processErrRequest } from "../Helpers/ErrReqProcessor";

const CreateUserPage = () => {
    const navigate = useNavigate();
    const [userVM, setUserVM] = useState(baseUserVM);
    const onSubmit = (e) => {
        e.preventDefault();
        requests.users.create(userVM).then(resp => {
            console.log(resp);
            navigate(-1);
        }).catch(err => {
            processErrRequest(err);
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <UserFormBody userInfo={userVM} setUserInfo={setUserVM} />
            <ButtonGroup className='form-buttons'>
                <Button type='submit'>Создать</Button>
                <Button onClick={() => navigate(-1)}>Назад</Button>
            </ButtonGroup>
        </form>
    );
}

export default CreateUserPage;