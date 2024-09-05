import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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

const StyledIcon = styled(CheckCircleIcon)(({ theme }) => ({
    fontSize: 80,
    color: '#4caf50', // Green color
    marginBottom: theme.spacing(2),
}));
  
const GameStatusPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [appointmentStatus, setAppointmentStatus] = useState(false);
  const date = localStorage.getItem('date');
  const phone = localStorage.getItem('phone');
  useEffect(() => {
    const  payload = {
      phone
    }
    const fetchData = async() => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/get_one_user_game`, {
          payload
        });
        const status = response.data.data;
        if(response.status === 200){
          let tmpStat = status.split('.');
          const confirm_stat = parseInt(tmpStat[tmpStat.length - 1]);        
          if(status !== '00000.0.0.0.0.0' && confirm_stat > 0){
            setAppointmentStatus(true);
          }        
        }
      } catch (err) {
        alert(err);
      }  
    }
    fetchData();    
  }, [])

  return (
    <StyledContainer component="main" maxWidth="disable">
      <CssBaseline />
      <StyledBox>
      <StyledIcon />
        {appointmentStatus === false &&(
            <Typography component="h1" variant="h5">
                Play to make a reservation.
            </Typography>
        )}
        {appointmentStatus === true &&(
            <>
                <Typography component="h1" variant="h5">
                    Your reservation has been confirmed.
                </Typography>
                <Typography variant="body1" align="center">
                  {t('admin-date') + ': ' + date}
                </Typography>
            </>
        )}
        <div style={{display: 'flex', gap: 10}}>
          <StyledButton
              variant="contained"
              color="primary"
              onClick={()=>navigate('/')}
          >
              {t('home')}
          </StyledButton>
          <StyledButton
              variant="contained"
              color="primary"
              onClick={()=>navigate('/playgame')}
          >
            {t('game')}
          </StyledButton>
        </div>
      </StyledBox>
    </StyledContainer>
  );
};

export default GameStatusPage;