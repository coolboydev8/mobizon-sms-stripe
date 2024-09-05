import React from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

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
  backgroundColor: 'rgba(255, 251, 240, 0.95)', // Semi-transparent background
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const StripePage = () => {
  const { t } = useTranslation();
  const role_option = localStorage.getItem('role_option');
  const phone = localStorage.getItem('phone');
  const payload = {
    phone,
    role_option
  }
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/stripe/create-checkout-session`, {
      payload
    });
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
          {t('stripe-title')}
        </Typography>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleCheckout}
        >
          {t('stripe-btn')}
        </StyledButton>
      </StyledBox>
    </StyledContainer>
  );
};

export default StripePage;