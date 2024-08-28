import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Container, CssBaseline, Box, Typography, Button } from '@mui/material';
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
    const [session, setSession] = useState(null);
    const [payStatus, setPayStatus] = useState(0);
    const phone = localStorage.getItem('phone');
    const role_option = localStorage.getItem('role_option');
    const date = localStorage.getItem('date');
  
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const sessionId = query.get('session_id');
        const payload = {
          session_id: sessionId,
          role_option: role_option, 
          phone: phone, 
          date: date
        };
        const checkPay = async() => {
          if (sessionId) {
            try{        
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/stripe/checkout-session`, {
                  payload
                });
                if(response.status === 200){
                    setPayStatus(1);
                    setSession(response.data.data);
                }else if(response.status === 201){
                    setPayStatus(0);
                }else if(response.status === 202){
                    setPayStatus(2);
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
        {(payStatus === 1 || payStatus === 2) &&(
            <StyledIcon />
        )}
        {payStatus === 0 &&(
            <StyledFailedIcon />
        )}
        {payStatus === 0 &&(
          <Typography component="h1" variant="h5">
            Payment Failed!
          </Typography>
        )}
        {payStatus === 1 &&(
          <Typography component="h1" variant="h5">
            Payment Success!
          </Typography>
        )}
        {payStatus === 2 &&(
          <Typography component="h1" variant="h5">
            You have already paid!
          </Typography>
        )}
        {payStatus === 1 &&(
          <Typography variant="body1" align="center">
            Payment for {session.amount_total / 100} {session.currency.toUpperCase()} was successful!
          </Typography>
        )}
        {payStatus === 0 &&(
          <Typography variant="body1" align="center">
            Payment was not successful. Please try again.
          </Typography>
        )}
        <StyledButton variant="contained" color="primary" href={(role_option === '2' && payStatus)?"/playgame":"/"}>
          {(role_option === '2' && payStatus)?'Play Game': 'Go to Home'}
        </StyledButton>
      </StyledBox>
    </StyledContainer>
  );
}

export default SuccessPage;