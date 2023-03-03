import { useNavigate } from "react-router"
import { ROLE } from "../Helpers/Constants";
import { Button, ButtonGroup } from "@mui/material";
import requests from "../agent";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {resetUserAction, setUserAction } from '../Redux/ActionCreators/UserActionsCreator';
import { useEffect } from "react";


const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetUserAction());
    }, []);

    const loginAction = (e) => {
        e.preventDefault();
        requests.auth.index().then(resp => {
            dispatch(setUserAction({isAdmin: resp.data>1}));
            navigate('/users/user');
        }
        ).catch(err => {
            processErrRequest(err)
        })
    }
    return (
        <div className='col'>
            <h1 className="central">Вход на сайт</h1><br />
            <ButtonGroup>
                <Button className='central' onClick={loginAction}>Вход</Button>
                <Button color='secondary' className='central' onClick={() => navigate('/users/create')}>Создать аккаунт</Button>
            </ButtonGroup>
        </div>
    );
}

export default LoginPage;