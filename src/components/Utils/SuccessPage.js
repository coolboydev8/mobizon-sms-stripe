import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

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

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const SuccessPage = () => {
  const [payStatus, setPayStatus] = useState('');
  const [wrongTest, setWrongTest] = useState('');
  const [wrongTestCount, setWrongTestCount] = useState();
  const phone = localStorage.getItem('phone');
  const date = localStorage.getItem('date');
  const role_optioin = localStorage.getItem('role_option');
  const { t } = useTranslation();

  useEffect(() => {
    const  payload = {
      phone
    }
    const fetchData = async() => {
      try {
        const res_pay = await axios.post(`${process.env.REACT_APP_API_URL}/user//get_user_paystatus`, {
          payload
        });
        if(res_pay.status === 200){
          setPayStatus(res_pay.data.data);
        }
        
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/get_option2_game`, {
          payload
        });
        if(response.status === 200){
          let  wrongTest = response.data.data;
          setWrongTestCount(wrongTest.length);
          if(wrongTest.length !== 0){
            let tempText = '';
            for(let i = 0; i < wrongTest.length; i ++){
              if(i === wrongTest.length - 1){
                tempText = tempText + 'Test ' + wrongTest[i];  
              }else{
                tempText = tempText + 'Test ' + wrongTest[i] + ' and ';
              }
            }  
            setWrongTest(tempText);
          }
        }
      } catch (err) {
        alert(err);
      }  
    }
    if(payStatus !== '2'){
      fetchData();
    }
  }, []);

  return (
    <StyledContainer component="main" maxWidth="disable">
      <CssBaseline />
      <StyledBox>
        {payStatus === '2' &&(
          <>
            <CircularProgress />
            <br/>
            <Typography component="h1" variant="h5">
              Hold tight, your order is being processed. We will message or email you when your order succeeds.
            </Typography>
          </>
        )}
        {payStatus !== '2' &&(
          <>
            <StyledIcon />
            <Typography component="h1" variant="h5">
              {t('success-0')}
            </Typography>
            <Typography component="h1" variant="h5">
              {t('success-1')}
            </Typography>
            <Typography variant="body1" align="center">
              {t('admin-date') + ': ' + date}
            </Typography>
          </>
        )}
        {(role_optioin === '2' && wrongTestCount > 0) &&(
          <Typography variant="body1" align="center">
            {`Dear Customer, you have failed ${wrongTest} even after repeated tries. 
            It is strongly recommended to go back and try to understand how to pass those tests. 
            Repeating test on your appointment day could lead to increase costs for using up more office time. 
            Thank you for your understanding`}
          </Typography>
        )} 
        <StyledButton variant="contained" color="primary" href="/">
          {t('home')}
        </StyledButton>
      </StyledBox>
    </StyledContainer>
  );
}

export default SuccessPage;