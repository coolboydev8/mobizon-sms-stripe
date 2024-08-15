import React, { useState } from 'react';
import axios from 'axios';
import { TextField, 
  Button, 
  Box, 
  Typography, 
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Radio,
  Container,
  CssBaseline,
  Autocomplete

} from '@mui/material';
import { styled } from '@mui/system';

const dateLists = [
  { label: '07/23/2024' },
  { label: '08/15/2024' },
  { label: '09/3/2024' },
  { label: '10/16/2024' },
  { label: '11/14/2024' },

]
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
      date: data.get('date'),
      phone: data.get('phone'),
    };
    try {
      const response = await axios.post('http://localhost:3000/login', {
        formData
      });
      console.log(response.data);
      // localStorage.setItem('token', response.data.token);
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
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="female" control={<Radio />} label="Option 1" />
            <FormControlLabel sx={{visibility: 'hidden'}} value="1" control={<Radio />} label="Option 2" />
            <FormControlLabel value="male" control={<Radio />} label="Option 2" />
          </RadioGroup>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={dateLists}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Date" />}
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