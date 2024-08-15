import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, 
  Button, 
  Box, 
  Typography, 
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Radio,
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

const UserInfoRegPage = () => {
  let navigate = useNavigate();


  const handleSubmit = async(event) => {
    navigate('/paystripe'); 
        // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // const formData = {
    //   email: data.get('date'),
    //   password: data.get('phone'),
    // };
    // try {
    //   const response = await axios.post('http://localhost:3000/login', {
    //     formData
    //   });
    //   console.log(response.data);
    //   // localStorage.setItem('token', response.data.token);
    // } catch (err) {
    //   console.log("error");
    // }
  };

  return (
    <StyledContainer component="main" maxWidth="disable">
      <CssBaseline />
      <StyledBox>
        <Typography component="h1" variant="h5">
          Register Your Information
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="address"
            label="Address"
            id="address"
            autoComplete="address"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="personID"
            label="Personal ID"
            id="personID"
            autoComplete="personID"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type='email'
            id="email"
            autoComplete="email"
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

export default UserInfoRegPage;