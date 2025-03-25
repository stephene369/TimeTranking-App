import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button, Container, Paper } from '@mui/material';
import { isAuthenticated, getCurrentUser, clearAuth } from '../apis/auth';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  
  useEffect(() => {
    // Protect this route - redirect to welcome if not authenticated
    if (!isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);
  
  const handleLogout = (): void => {
    clearAuth();
    navigate('/');
  };
  
  if (!user) {
    return null; // Don't render anything while checking authentication
  }
  
  return (
    <h1>
        Dashboard
    </h1>
    // <Container component="main" maxWidth="md">
    //   <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
    //     <Typography component="h1" variant="h4" sx={{ mb: 4 }}>
    //       Dashboard-
    //     </Typography>
        
    //     <Typography variant="h6" sx={{ mb: 2 }}>
    //       Welcome, {user.name}!
    //     </Typography>
        
    //     <Typography variant="body1" sx={{ mb: 4 }}>
    //       You are now logged in to the Time Management App.
    //     </Typography>
        
    //     <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
    //       <Button 
    //         variant="contained" 
    //         color="secondary" 
    //         onClick={handleLogout}
    //       >
    //         Logout
    //       </Button>
    //     </Box>
    //   </Paper>
    // </Container>
  );
};

export default Dashboard;
