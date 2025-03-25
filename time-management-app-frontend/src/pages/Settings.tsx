import React from 'react';
import { Box, Typography } from '@mui/material';

const Settings: React.FC = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100%',
        minHeight: 400
      }}
    >
      <Typography variant="h4" color="primary">
        Settings Page
      </Typography>
    </Box>
  );
};

export default Settings;
