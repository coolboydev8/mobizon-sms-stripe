import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

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
  const phone = localStorage.getItem('phone');
  const option = localStorage.getItem('option');

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch('http://localhost:3000/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, option }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
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