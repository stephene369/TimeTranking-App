import React from 'react';
import { 
  Box, 
  Typography, 
  IconButton 
} from '@mui/material';
import { 
  Close as CloseIcon 
} from '@mui/icons-material';
import { sidebarStyles } from '../../styles/sidebar.styles';

interface SidebarHeaderProps {
  onClose?: () => void;
}

/**
 * Header component for the sidebar
 */
const SidebarHeader: React.FC<SidebarHeaderProps> = ({ onClose }) => {
  const styles = sidebarStyles();
  
  return (
    <Box sx={styles.header}>
      <Box sx={styles.logoContainer}>
        {/* You can replace this with your actual logo */}
        <Typography variant="h6" sx={styles.logoText}>
          Time Management
        </Typography>
      </Box>
      
      {onClose && (
        <IconButton 
          onClick={onClose} 
          size="small"
          sx={styles.closeButton}
        >
          <CloseIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default SidebarHeader;
