import axios from "axios";
axios.defaults.withCredentials = true;

const server = 'http://localhost:62424/api'; ////023872

const requests = {
    auth: {
        index: () => axios.post(server+'/auth'),
        logout: () => axios.post(server+'/auth/logout')
    },
    users: {
        index: () => axios.get(server+'/users'),
        currentUser: () => axios.get(server+'/users/user'),
        user: (id) => axios.get(server+`/users/user/${id}`),
        create: (userViewModel) => axios.post(server+'/users/create', userViewModel),
        editCurrent: (userViewModel) => axios.put(server+'/users/edit', userViewModel, { headers: { 'Content-Type': 'multipart/form-data' } }),
        edit: (id, userViewModel) => axios.put(server+`/users/edit/${id}`, userViewModel, { headers: { 'Content-Type': 'multipart/form-data' } }),
        deleteCurrent: () => axios.delete(server+'/users/delete'),
        delete: (id) => axios.delete(server+`/users/delete/${id}`),
    },
    staticData: {
        roles: () => axios.get(server+'/staticData/roles'),
        citizenships: () => axios.get(server+'/staticData/citizenships'),
        disabilities: () => axios.get(server+'/staticData/disabilities'),
        familyStatuses: () => axios.get(server+'/staticData/familyStatuses'),
        cities: () => axios.get(server+'/staticData/cities'),
        currencies: () => axios.get(server + '/staticData/currencies')
    },
    transactions: {
        current: () => axios.get(server+'/transactions'),
        all: () => axios.get(server+'/transactions/all'),
        perform: (transactionViewModel) => axios.post(server+'/transactions/perform', transactionViewModel)
    },
    debet: {
        currentContracts: () => axios.get(server+'/debet'),
        contract: (id) => axios.get(server+`/debet/${id}`),
        allContracts: () => axios.get(server+'/debet/all'),
        allOptions: () => axios.get(server+'/debet/options'),
        option: (id) => axios.get(server+`/debet/options/${id}`),
        sign: (id, contractViewModel) => axios.post(server+`/debet/options/${id}`, contractViewModel)
    },
    credit: {
        currentContracts: () => axios.get(server+'/credit'),
        contract: (id) => axios.get(server+`/credit/${id}`),
        allContracts: () => axios.get(server+'/credit/all'),
        allOptions: () => axios.get(server+'/credit/options'),
        option: (id) => axios.get(server+`/credit/options/${id}`),
        sign: (id, contractViewModel) => axios.post(server+`/credit/options/${id}`, contractViewModel)
    }
};

export default requests;