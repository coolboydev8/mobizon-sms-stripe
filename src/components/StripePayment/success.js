import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Container, CssBaseline, Box, Typography, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
  padding: 0,
  margin: 0,
  backgroundColor: '#e0f7fa', // Light cyan background
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

const StyledIcon = styled(CheckCircleIcon)(({ theme }) => ({
  fontSize: 80,
  color: '#4caf50', // Green color
  marginBottom: theme.spacing(2),
}));

const StyledFailedIcon = styled(CheckCircleIcon)(({ theme }) => ({
    fontSize: 80,
    color: '#f44336', // Red color
    marginBottom: theme.spacing(2),
}));
  
const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const SuccessPage = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const [session, setSession] = useState(null);
    const [payStatus, setPayStatus] = useState(3);//loading
    const phone = localStorage.getItem('phone');
    const role_option = localStorage.getItem('role_option');
  
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const sessionId = query.get('session_id');
        const payload = {
          session_id: sessionId,
          phone: phone
        };
        const checkPay = async() => {
          if (sessionId) {
            try{        
              const response = await axios.post(`${process.env.REACT_APP_API_URL}/stripe/checkout-session`, {
                payload
              });
              if(response.status === 200){
                setPayStatus(0);
                setSession(response.data.data);
              }else if(response.status === 201){
                setPayStatus(1);
                setSession(response.data.data);
              }else if(response.status === 202){
                setPayStatus(2);
                setSession(response.data.data);
              }  
            }catch(err){
                console.error(err);
            }
          }                   
        }
        checkPay();
    }, [location]);

  return (
    <StyledContainer component="main" maxWidth="disable">
      <CssBaseline />
      <StyledBox>
        {payStatus === 3 &&(
            <>
              <CircularProgress />
              <br/>
              <Typography component="h1" variant="h5" sx={{ marginTop: 2 }}>
                {t('stripe-loading')}
              </Typography>
              <Typography variant="body1" align="center" sx={{ marginTop: 1 }}>
                {t('stripe-wait')}
              </Typography>
            </>
        )}
        {(payStatus === 1) &&(
            <StyledIcon />
        )}
        {payStatus === 0 &&(
            <StyledFailedIcon />
        )}
        {payStatus === 0 &&(
          <Typography component="h1" variant="h5">
            {t('stripe-failed')}
          </Typography>
        )}
        {payStatus === 1 &&(
          <Typography component="h1" variant="h5">
            {t('stripe-success')}
          </Typography>
        )}
        {payStatus === 2 &&(
          <>
            <CircularProgress />
            <br/>
            <Typography component="h1" variant="h5">
              Hold tight, your order is being processed. We will message or email you when your order succeeds.
            </Typography>
          </>
        )}
        {(payStatus === 1) &&(
          <Typography variant="body1" align="center">
            {t('stripe-pay-before')} {session.amount_total / 100} {session.currency.toUpperCase()} {t('stripe-pay-after')}
          </Typography>
        )}
        {payStatus === 0 &&(
          <Typography variant="body1" align="center">
            {t('stripe-retry')}
          </Typography>
        )}
        <div style={{display: 'flex', gap: 10}}>
          {(payStatus === 1 && role_option === '2')&&(
            <StyledButton variant="contained" color="primary" href="/playgame">
              {t('game')}
            </StyledButton>
          )}
          {(payStatus === 1 && role_option === '1')&&(
            <StyledButton variant="contained" color="primary" href="/success">
              {t('game-next')}
            </StyledButton>
          )}
          {(payStatus === 1 || payStatus === 2) &&(
            <StyledButton variant="contained" color="primary" href="/">
              {t('home')}
            </StyledButton>
          )}
        </div>
        </StyledBox>
    </StyledContainer>
  );
}

export default SuccessPage;








