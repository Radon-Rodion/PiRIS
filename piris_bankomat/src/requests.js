import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = `http://localhost:62424/api`;

const requests = {
    checkAccount: (accNumber) => axios.get(`bankomat/acc?accNumber=${accNumber}`),
    checkPin: (params) => axios.get(`bankomat/pin?accNumber=${params.acc}&accPin=${params.pin}`, ),
    checkSum: (params) => axios.get(`bankomat/sum?accNumber=${params.acc}&sum=${params.sum}`, params),
    accState: (accNumber) => axios.get(`bankomat/state?accNumber=${accNumber}`, accNumber),
    transaction: (params) => axios.post(`transactions/perform`, params),
    getMoney: (params) => axios.post(`transactions/getMoney`, params)
};

export default requests;