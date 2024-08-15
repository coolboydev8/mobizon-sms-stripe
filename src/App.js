import React from 'react';
import FirstPage from './components/FirstPage';
import SignInPage from './components/SignInPage';
import AdminPage from './components/AdminPage';
import StripePage from './components/StripePage';
import UserInfoRegPage from './components/UserInfoRegPage';
import SuccessPage from './components/SuccessPage';
import OoopsPage from './components/OopsPage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/sign_in" element={<SignInPage />} />
          <Route path="/paystripe" element={<StripePage />} />
          <Route path="/info_regist" element={<UserInfoRegPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/oops" element={<OoopsPage />} />
          <Route path="/admin_page" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
