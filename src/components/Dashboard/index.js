import React, { useState } from 'react';
import axios from 'axios';
import { TextField, 
  Button, 
  Box, 
  Typography, 
  RadioGroup,
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

const FirstPage = () => {

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      option: data.get('option'),
      date: data.get('date'),
      phone: data.get('phone'),
    };
    try {
      await axios.post('http://localhost:3000/register_phone', {
        formData
      });
    } catch (err) {
      console.log("error");
    }
  };

  return (
    <StyledContainer component="main" maxWidth="disable">
      <CssBaseline />
      <StyledBox>
        <Typography component="h1" variant="h5">
          Welcome
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="option"
            defaultValue="1"
            id="option"
          >
            <FormControlLabel value="1" control={<Radio />} label="Option 1" />
            <FormControlLabel sx={{visibility: 'hidden'}} control={<Radio />} label="Option 2" />
            <FormControlLabel value="2" control={<Radio />} label="Option 2" />
          </RadioGroup>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            inputProps={{ readOnly: true }}
            name="date"
            label="2024-09-15"
            defaultValue="2024-09-15"  
            id="date"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Phone Number"
            type="number"
            id="phone"
            autoComplete="current-phone"
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

export default FirstPage;