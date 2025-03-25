import React from 'react';
import { Box, Typography } from '@mui/material';

const MyWork: React.FC = () => {
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
        My Work Page
      </Typography>
    </Box>
  );
};

export default MyWork;
