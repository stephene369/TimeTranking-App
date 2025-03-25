import React from 'react';
import { Box, Typography } from '@mui/material';

const Projects: React.FC = () => {
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
        Projects Page
      </Typography>
    </Box>
  );
};

export default Projects;
