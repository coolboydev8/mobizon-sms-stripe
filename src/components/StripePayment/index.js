import React from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

import {
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

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const StripePage = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const phone = queryParams.get('phone');
  const option = queryParams.get('option');
  const date = queryParams.get('date');
  if(phone){
    localStorage.setItem('authUser', '12345'); // Store the token
    localStorage.setItem('phone', phone);
    localStorage.setItem('option', option);
    localStorage.setItem('date', date);
  }
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/stripe/create-checkout-session`);
    console.log(response)
    const { id } = response.data;
    
    const result = await stripe.redirectToCheckout({
      sessionId: id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <StyledContainer component="main" maxWidth="disable">
      <CssBaseline />
      <StyledBox>
        <Typography component="h1" variant="h5">
          Make a Payment
        </Typography>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleCheckout}
        >
          Pay Now
        </StyledButton>
      </StyledBox>
    </StyledContainer>
  );
};

export default StripePage;