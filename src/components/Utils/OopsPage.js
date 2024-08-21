import React from 'react';
import { Container, CssBaseline, Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import ErrorIcon from '@mui/icons-material/Error';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
  padding: 0,
  margin: 0,
  backgroundColor: '#ffebee', // Light red background
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

const StyledIcon = styled(ErrorIcon)(({ theme }) => ({
  fontSize: 80,
  color: '#f44336', // Red color
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const OopsPage = () => {
  return (
    <StyledContainer component="main" maxWidth='disable'>
      <CssBaseline />
      <StyledBox>
        <StyledIcon />
        <Typography component="h1" variant="h5">
          Oops!
        </Typography>
        <Typography variant="body1" align="center">
          Something went wrong. Please try again.
        </Typography>
        <StyledButton variant="contained" color="primary" href="/">
          Go to Home
        </StyledButton>
      </StyledBox>
    </StyledContainer>
  );
}

export default OopsPage;