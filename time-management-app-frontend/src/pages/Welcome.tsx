import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Paper } from '@mui/material';

import welcomeImage from '../assets/welcome-image.jpg'; // Add your image to assets folder
import { isAuthenticated } from '../utils/apis/auth';
// Old import (deprecated)
import { Grid } from '@mui/material';


const Welcome: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      {/* Left side - Image */}
      <Grid
        item
        xs={false}
        sm={6}
        md={7}
        sx={{
          backgroundImage: `url(${welcomeImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Right side - Buttons */}
      <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80%',
          }}
        >
          <Typography component="h1" variant="h3" sx={{ mb: 6 }}>
            Time Management App
          </Typography>
          
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/signup')}
            sx={{ mb: 3, py: 1.5, fontSize: '1.1rem' }}
          >
            Sign Up
          </Button>
          
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => navigate('/signin')}
            sx={{ py: 1.5, fontSize: '1.1rem' }}
          >
            Sign In
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Welcome;