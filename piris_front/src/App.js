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
import DebetContractPage from './Pages/DebetContractPage';
import CreditContractsPage from './Pages/CreditContractsPage';
import CreditOptionsPage from './Pages/CreditOptionsPage';
import CreditContractPage from './Pages/CreditContractPage';
import TransactionsPage from './Pages/TransactionsPage';
import SignContractPage from './Pages/SignContractPage';


function App() {
  const isAdmin = useSelector(state => state.user.info.isAdmin);

  const pathes = [
    { path: '/users/user', name: 'Главная', element: < UserMainPage />, authorizationLevel: 1 },
    { path: '/users/edit', name: 'Редактировать аккаунт', element: < EditUserPage />, authorizationLevel: 1 },
    { path: '/users/user/:id', name: undefined, element: < UserMainPage />, authorizationLevel: 2 },
    { path: '/users/edit/:id', name: undefined, element: < EditUserPage />, authorizationLevel: 2 },
    {path: '/debet/contracts', name: 'Вклады', element: <DebetContractsPage/>, authorizationLevel: 1},
    {path: '/debet/contract/:id', name: undefined, element: <DebetContractPage />, authorizationLevel: 1},
    {path: '/debet/options', name: 'Варианты вкладов', element: <DebetOptionsPage />, authorizationLevel: 1},
    {path: '/debet/options/:id', name: undefined, element: < SignContractPage isDebet={true}/>, authorizationLevel: 1},
    {path: '/credit/contracts', name: 'Кредиты', element: <CreditContractsPage/>, authorizationLevel: 1},
    {path: '/credit/contract/:id', name: undefined, element: <CreditContractPage />, authorizationLevel: 1},
    {path: '/credit/options', name: 'Варианты кредитов', element: <CreditOptionsPage />, authorizationLevel: 1},
    {path: '/credit/options/:id', name: undefined, element: < SignContractPage isDebet={false}/>, authorizationLevel: 1},
    // {path: '/transactions', name: 'Статистика счетов', element: < TransactionsPage showAll={false}/>, authorizationLevel: 1},
    // {path: '', name: '', element: < />, authorizationLevel: 1},
    { path: '/users/all', name: 'Список пользователей', element: <UsersListPage />, authorizationLevel: 2 },
    {path: '/debet/contracts/all', name: 'Все вклады пользователей', element: <DebetContractsPage />, authorizationLevel: 2},
    // {path: '/transactions/all', name: 'Статистика счетов банка', element: < TransactionsPage showAll={true}/>, authorizationLevel: 2},
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
