import React from 'react';
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

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const SuccessPage = () => {
  return (
    <StyledContainer component="main" maxWidth="disable">
      <CssBaseline />
      <StyledBox>
        <StyledIcon />
        <Typography component="h1" variant="h5">
          Success.
        </Typography>
        <Typography variant="body1" align="center">
          Your operation was completed successfully.
        </Typography>
        <StyledButton variant="contained" color="primary" href="/">
          Go to Home
        </StyledButton>
      </StyledBox>
    </StyledContainer>
  );
}

export default SuccessPage;