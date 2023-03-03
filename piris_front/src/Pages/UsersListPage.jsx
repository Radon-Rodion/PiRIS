import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import requests from "../agent";
import UsersListTable from '../Components/UsersListTable';
import { processErrRequest } from '../Helpers/ErrReqProcessor';


const UsersListPage = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        requests.users.index().then(resp => {
            console.log(resp);
            setUsers(resp.data);
        })
        .catch(err => processErrRequest(err));
    }, []);
    return (
        <>
            <h1 className="central">Список пользователей</h1>
            <UsersListTable usersList={users} />
        </>
    );
}

export default UsersListPage;