import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Paper } from '@mui/material';

import welcomeImage from '../assets/welcome-image.jpg'; // Add your image to assets folder
import { isAuthenticated } from '../utils/apis/auth';
// Old import (deprecated)
import { Grid } from '@mui/material';


interface WelcomeProps {
    children: React.ReactNode;
  }
  
  const Welcome: React.FC<WelcomeProps> = ({ children }) => {
    return (
      <Grid container sx={{ height: '100vh' }}>
        {/* Left side - Image */}
        <Grid
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
        
        {/* Right side - Dynamic content (children) */}
        <Grid xs={12} sm={6} md={5}>
          <Paper elevation={6} sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {children}
          </Paper>
        </Grid>
      </Grid>
    );
  };
  
  export default Welcome;