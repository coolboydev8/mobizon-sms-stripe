import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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
import PrivateGameRoute  from './components/Utils/PrivateGameRoute';

import Game  from './components/Game';
import GameStatusPage  from './components/Game/status';

import './App.css';
import './i18n';

const StyledSelect = styled(Select)({
  backgroundColor: 'white',
  color: 'black',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'gray',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'black',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'blue',
  }
});


const App = () => {
  const { i18n } = useTranslation();
  const handleChangeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };
  return (
    <>
      <div className='headerbar'>
        <div style={{color: 'white'}}>
          
        <a style={{cursor: 'pointer', color: 'white', textDecoration: 'none'}} href="/"><p>Appointment System</p></a>
        </div>
        <StyledSelect
          sx={{position: 'absolute', right: '100px', height: '30px', border: 0}}
          value={i18n.language}
          onChange={(e) => handleChangeLanguage(e)}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="de">Deutsch</MenuItem>
          <MenuItem value="pl">Polski</MenuItem>
          <MenuItem value="ar">العربية</MenuItem>
          <MenuItem value="tr">Türkçe</MenuItem>
          <MenuItem value="ro">Română</MenuItem>        
        </StyledSelect>
      </div>
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
          <Route path="/check_game" element={<PrivateUserRoute element={<GameStatusPage />}/>} />
          <Route path="/playgame" element={<PrivateGameRoute element={<Game />}/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
