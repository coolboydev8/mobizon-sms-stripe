import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
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
  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      phone: data.get('phone')
    };
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/signin_phone`, {
        formData
      });
      console.log(response);
      if(response.status === 200){
        localStorage.setItem('authUser', '12345'); // Store the token
        localStorage.setItem('phone', response.data.data.phone);
        localStorage.setItem('option', response.data.data.option);
        localStorage.setItem('date', response.data.data.option);
        navigate("/playgame");
      }else if(response.status === 201){
        localStorage.setItem('authUser', '12345'); // Store the token
        localStorage.setItem('phone', response.data.data.phone);
        localStorage.setItem('option', response.data.data.option);
        localStorage.setItem('date', response.data.data.option);
        navigate("/success");
      }else if(response.status === 202){
        localStorage.setItem('authUser', '12345'); // Store the token
        localStorage.setItem('phone', response.data.data.phone);
        localStorage.setItem('option', response.data.data.option);
        localStorage.setItem('date', response.data.data.option);
        navigate("/pay_stripe");
      }else if(response.status === 203 || response.status === 500){
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
          Welcome
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="phone"
            label="12345678901"
            type="number"
            id="phone"
            autoComplete="current-phone"
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Submit
          </StyledButton>
        </StyledForm>
      </StyledBox>
    </StyledContainer>
  );
};

export default UserPage;