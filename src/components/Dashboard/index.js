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

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

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
  const [btnClicked, setBtnClicked] = useState(false);

  const handleSubmit = async(event) => {
    event.preventDefault();
    setBtnClicked(true);
    const data = new FormData(event.currentTarget);
    const formData = {
      role_option: data.get('role_option'),
      date: data.get('date'),
      phone: data.get('phone'),
    };
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/register_phone`, {
        formData
      });
      if(response.status === 203){
        alert(response.data.data);
      }
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
            name="role_option"
            defaultValue="1"
            id="role_option"
          >
            <FormControlLabel value="1" control={<Radio />} label="Option 1" />
            <FormControlLabel sx={{visibility: 'hidden'}} control={<Radio />} />
            <FormControlLabel value="2" control={<Radio />} label="Option 2" />
          </RadioGroup>
          <LocalizationProvider required dateAdapter={AdapterDayjs} >
            <DemoContainer required components={['DateTimePicker']} sx={{marginBottom: '8px', marginTop:'8px'}}>
              <DateTimePicker
                required
                id='date'
                name='date'
                label='Appointment Date' 
              />
            </DemoContainer>
          </LocalizationProvider>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="phone"
            label="12345678901"
            type="number"
            id="phone"
            autoComplete="current-phone"
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={btnClicked}
          >
            Submit
          </StyledButton>
        </StyledForm>
      </StyledBox>
    </StyledContainer>
  );
};

export default FirstPage;