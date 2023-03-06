import { toast } from "react-hot-toast";

const processError = (err) => {
    console.error(err);
    toast.error(err?.response?.data ?? err.message);
}

export default processError;