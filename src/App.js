import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import FirstPage from './components/Dashboard';
import UserPage from './components/Dashboard/user';

import SignInPage from './components/Auth/SignInPage';
import AdminPage from './components/Admin';
import StripePage from './components/StripePayment';
import StripeSuccess from './components/StripePayment/success';

import UserInfoRegPage from './components/Auth/UserInfoRegPage';
import SuccessPage from './components/Utils/SuccessPage';
import OoopsPage from './components/Utils/OopsPage';
import PrivateAdminRoute  from './components/Utils/PrivateAdminRoute';
import PrivateUserRoute  from './components/Utils/PrivateUserRoute';
import Game  from './components/Game';

import './App.css';

const App = () => {

  return (
    <Router>  
        <Routes>
          <Route path="/" element={<UserPage />} />
          <Route path="/admin" element={<FirstPage />} />
          <Route path="/admin_login" element={<SignInPage />} />
          <Route path="/pay_stripe" element={<PrivateUserRoute element={<StripePage />}/>} />
          <Route path="/stripe_success" element={<PrivateUserRoute element={<StripeSuccess />}/>} />
          <Route path="/info_regist" element={<UserInfoRegPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/oops" element={<OoopsPage />} />
          <Route path="/admin_page" element={<PrivateAdminRoute element={<AdminPage />}/>} />
          <Route path="/playgame" element={<PrivateUserRoute element={<Game />}/>} />
        </Routes>
      </Router>
  );
}

export default App;
