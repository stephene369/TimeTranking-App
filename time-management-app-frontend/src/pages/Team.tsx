import React from 'react';
import { Box, Typography } from '@mui/material';

const Team: React.FC = () => {
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
        Team Management Page
      </Typography>
    </Box>
  );
};

export default Team;
