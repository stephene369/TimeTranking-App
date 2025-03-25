import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

const WelcomeHome: React.FC = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default WelcomeHome;
