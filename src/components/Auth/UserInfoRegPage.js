import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { TextField, 
  Button, 
  Box, 
  Typography, 
  Container,
  CssBaseline

} from '@mui/material';

import { styled } from '@mui/system';

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


const UserInfoRegPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const queryParams = new URLSearchParams(location.search);
  const phone = queryParams.get('phone');
  const role_option = queryParams.get('role_option');
  const date = queryParams.get('date');
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      info: {
        firstname: data.get('firstName'),
        lastname: data.get('lastName'),
        birthday: data.get('birthday'),
        personid: data.get('personId'),
        city: data.get('city'),
        streetname: data.get('streetName'),
        housenum: data.get('houseNum'),
        code: data.get('zipCode'),
      },  
      phone: phone
    };
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/update_info`, {
        formData
      });
      if(response.data.data === 200){
        alert("Saved Ok");
        localStorage.setItem('authUser', '12345'); // Store the token
        localStorage.setItem('phone', phone);
        localStorage.setItem('role_option', role_option);
        localStorage.setItem('date', date);
        navigate("/pay_stripe");
      }else if(response.data.data === 201){
        alert(`The customer already exists!.\n If you wish to update the appointment date or role option, please delete the customer's data in admin page and re-register.`);
      }
    } catch (err) {
      alert("Saved Failed");
    }
  };

  return (
    <StyledContainer component="main" maxWidth="disable">
      <CssBaseline />
      <StyledBox>
        <Typography component="h1" variant="h5">
          {t('regist-info')}
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <div style={{display: 'flex', gap: '10px'}}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label={t('admin-firstname')}
              name="firstName"
              inputProps={{
                style: { height: 15  } 
              }}
              autoComplete="firstName"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label={t('admin-lastname')}
              name="lastName"
              inputProps={{
                style: { height: 15  } 
              }}
              autoComplete="lastName"
            />
          </div>
          <div style={{display: 'flex', gap: '10px'}}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="birthday"
              type='date'
              id="birthday"
              inputProps={{
                style: { height: 15  } 
              }}
              autoComplete="birthday"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="personId"
              label={t('admin-person')}
              id="personId"
              inputProps={{
                style: { height: 15  } 
              }}
              autoComplete="personId"
            />
          </div>
          <div style={{display: 'flex', gap: '10px'}}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="city"
              label={t('admin-city')}
              id="city"
              inputProps={{
                style: { height: 15  } 
              }}
              autoComplete="city"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="streetName"
              label={t('admin-street')}
              id="streetName"
              inputProps={{
                style: { height: 15  } 
              }}
              autoComplete="streetName"
            />
          </div>
          <div style={{display: 'flex', gap: '10px'}}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="houseNum"
              label={t('admin-housenum')}
              id="houseNum"
              inputProps={{
                style: { height: 15  } 
              }}
              autoComplete="houseNum"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="zipCode"
              label={t('admin-zip')}
              id="zipCode"
              inputProps={{
                style: { height: 15  } 
              }}
              autoComplete="zipCode"
            />
          </div>
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

export default UserInfoRegPage;