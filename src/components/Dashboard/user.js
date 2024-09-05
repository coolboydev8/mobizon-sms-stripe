import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TextField, 
  Button, 
  Box, 
  Typography, 
  Container,
  CssBaseline, 
} from '@mui/material';
import { styled } from '@mui/system';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '100vw',
  height: '100vh',
  backgroundImage: `url(background.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}));

const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 251, 240, 0.95)', // Semi-transparent background
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%', // Fix IE 11 issue.
  marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const UserPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const handleSubmit = async(event) => {
    event.preventDefault();
    const formData = {
      phone: phone
    };
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/signin_phone`, {
        formData
      });
      if(response.status === 201){
        localStorage.setItem('authUser', '12345'); // Store the token
        localStorage.setItem('phone', response.data.data.phone);
        localStorage.setItem('role_option', response.data.data.role_option);
        localStorage.setItem('date', response.data.data.appointmentdate);
        navigate(`/success`);
      }else if(response.status === 202){
        localStorage.setItem('authUser', '12345'); // Store the token
        localStorage.setItem('phone', response.data.data.phone);
        localStorage.setItem('role_option', response.data.data.role_option);
        localStorage.setItem('date', response.data.data.appointmentdate);
        navigate(`/check_game`);
      }else if(response.status === 203){
        localStorage.setItem('authUser', '12345'); // Store the token
        navigate("/success");
      }else if(response.status === 200){
        console.log(response.data.data)
        localStorage.setItem('authUser', '12345'); // Store the token
        localStorage.setItem('phone', response.data.data.phone);
        localStorage.setItem('role_option', response.data.data.role_option);
        localStorage.setItem('date', response.data.data.appointmentdate);
        navigate("/pay_stripe");
      }else if(response.status === 205 || response.status === 500){
        navigate("/oops");
      }
    } catch (err) {
      navigate("/oops");
    }
  };

  return (
    <StyledContainer component="main" maxWidth="disable">
      <CssBaseline />
      <StyledBox>
        <Typography component="h1" variant="h5">
          {t('welcome')}
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <PhoneInput
            id="phone"
            value={phone}
            onChange={(phone) => setPhone(phone)}
            copyNumbersOnly 
            inputProps={{
              name: 'phone',
              required: true,
              autoFocus: true,
              height: '50px'
            }}
            containerStyle={{height: '50px', background: 'none'}}
            inputStyle={{height: '50px', background: 'none'}} 
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {t('submit')}
          </StyledButton>
        </StyledForm>
      </StyledBox>
    </StyledContainer>
  );
};

export default UserPage;