import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import requests from './agent';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ROLE } from "./Helpers/Constants";
import LoginPage from './Pages/LoginPage';
import CreateUserPage from './Pages/CreateUserPage';
import UserMainPage from './Pages/UserMainPage';
import { Provider, useSelector } from 'react-redux';
import EditUserPage from './Pages/EditUserPage';
import store from './Redux/Store/Store';
import UsersListPage from './Pages/UsersListPage';
import Header from './Components/Header';
import DebetContractsPage from './Pages/DebetContractsPage';
import DebetOptionsPage from './Pages/DebetOptionsPage';
import CreditContractsPage from './Pages/CreditContractsPage';
import CreditOptionsPage from './Pages/CreditOptionsPage';
import TransactionsPage from './Pages/TransactionsPage';
import SignContractPage from './Pages/SignContractPage';
import ContractOptionPage from './Pages/ContractOptionPage';
import ContractPage from './Pages/ContractPage';


function App() {
  const isAdmin = useSelector(state => state.user.info.isAdmin);

  const pathes = [
    { path: '/users/user', name: 'Главная', element: < UserMainPage />, authorizationLevel: 1 },
    { path: '/users/edit', name: 'Редактировать аккаунт', element: < EditUserPage />, authorizationLevel: 1 },
    { path: '/users/user/:id', name: undefined, element: < UserMainPage />, authorizationLevel: 2 },
    { path: '/users/edit/:id', name: undefined, element: < EditUserPage />, authorizationLevel: 2 },
    {path: '/debet/contracts', name: 'Вклады', element: <DebetContractsPage/>, authorizationLevel: 1},
    {path: '/debet/contracts/:contractId', name: undefined, element: <ContractPage isDebet={true}/>, authorizationLevel: 1},
    {path: '/debet/options', name: 'Варианты вкладов', element: <DebetOptionsPage />, authorizationLevel: 1},
    {path: '/debet/options/:contractId', name: undefined, element: < ContractOptionPage isDebet={true}/>, authorizationLevel: 1},
    {path: '/debet/options/sign/:id', name: undefined, element: < SignContractPage isDebet={true}/>, authorizationLevel: 1},

    {path: '/credit/contracts', name: 'Кредиты', element: <CreditContractsPage/>, authorizationLevel: 1},
    {path: '/credit/contracts/:contractId', name: undefined, element: <ContractPage isDebet={false}/>, authorizationLevel: 1},
    {path: '/credit/options/:contractId', name: undefined, element: < ContractOptionPage isDebet={false}/>, authorizationLevel: 1},
    {path: '/credit/options', name: 'Варианты кредитов', element: <CreditOptionsPage />, authorizationLevel: 1},
    {path: '/credit/options/sign/:id', name: undefined, element: < SignContractPage isDebet={false}/>, authorizationLevel: 1},
    
    {path: '/transactions/personal', name: 'Счета', element: < TransactionsPage showBank={false}/>, authorizationLevel: 1},
    // {path: '', name: '', element: < />, authorizationLevel: 1},
    { path: '/users/all', name: 'Пользователи', element: <UsersListPage />, authorizationLevel: 2 },
    //{path: '/debet/contracts/all', name: 'Все вклады пользователей', element: <DebetContractsPage />, authorizationLevel: 2},
    {path: '/transactions/bank', name: 'Счета банка', element: < TransactionsPage showBank={true}/>, authorizationLevel: 2},
    // {path: '', name: '', element: < />, authorizationLevel: 2},
    { path: '/users/create', name: undefined, element: <CreateUserPage />, authorizationLevel: 0 },
    { path: '/', name: 'Выйти', element: <LoginPage />, authorizationLevel: 0 },
  ];

  const authLevel = isAdmin == null ? 0 : isAdmin ? 2 : 1;
  const routing = pathes.filter(p => p.authorizationLevel <= authLevel);
  console.log(routing);

  return (
    <div>
      <Toaster
        position='top-center'
        reverseOrder={false}
        toastOptions={{
          duration: 3000
        }}
      />
      <BrowserRouter forceRefresh={false}>
        {authLevel > 0 ? <Header routes={routing} /> : undefined}
        <Routes>
          {routing.map(r => <Route key={r.path} path={r.path} exact element={r.element} />)}
          <Route path="*" element={<Navigate to={authLevel > 0 ? '/users/user' : "/"} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
