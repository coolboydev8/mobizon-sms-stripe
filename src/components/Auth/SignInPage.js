import React from 'react';
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

const SignInPage = () => {
  const { t } = useTranslation();
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      password: data.get('password'),
    };
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/login`, {  
        formData
      });
      if(response.status === 200){
        localStorage.setItem('authUser', '12345'); // Store the token
        localStorage.setItem('authToken', '12345'); // Store the token
        window.location.href = '/admin_page'; // Redirect on successful login
      }else{
       window.location.href = '/oops';
      }
    } catch (err) {
      window.location.href = '/oops';
      console.log(err);
    }
  };

  return (
    <StyledContainer component="main" maxWidth="disable">
      <CssBaseline />
      <StyledBox>
        <Typography component="h1" variant="h5">
          {t('welcome-admin')}
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('admin-password')}
            type="password"
            id="password"
            autoComplete="password"
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {t('sign-admin')}
          </StyledButton>
        </StyledForm>
      </StyledBox>
    </StyledContainer>
  );
};

export default SignInPage;