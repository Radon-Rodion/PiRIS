import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:62424/api';

const requests = {
    checkAccount: (accNumber) => axios.patch('bankomat/acc', accNumber, { headers: { 'Content-Type': 'application/json' } }),
    checkPin: (params) => axios.patch('bankomat/pin', params, { headers: { 'Content-Type': 'application/json' } }),
    checkSum: (params) => axios.patch('bankomat/sum', params, { headers: { 'Content-Type': 'application/json' } }),
    accState: (accNumber) => axios.patch('bankomat/state', accNumber, { headers: { 'Content-Type': 'application/json' } }),
    transaction: (params) => axios.post('transactions/perform', params),
    getMoney: (params) => axios.post('transactions/getMoney', params)
};

export default requests;