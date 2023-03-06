import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";


export const processErrRequest = (err) => {
    setTimeout(() => {if(err.response.status == 401) window.location.href = '/'}, 1000);
    console.log(err.response);
    toast.error(err.response?.message ?? err.response?.data ?? err.message);
}