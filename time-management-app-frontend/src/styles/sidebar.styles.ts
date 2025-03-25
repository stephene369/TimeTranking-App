import { Theme } from '@mui/material';

/**
 * Styles for the sidebar components
 */
export const sidebarStyles = () => ({
  drawer: {
    width: 280,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: 280,
      boxSizing: 'border-box',
      border: 'none',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.08)',
    },
  },
  
  drawerContainer: {
    width: 280, 
    bgcolor: '#FFFFFF',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  
  menuButton: {
    position: 'fixed',
    top: 10,
    left: 10,
    zIndex: 1200,
    bgcolor: 'white',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    '&:hover': {
      bgcolor: '#f5f5f5',
    },
  },
  
  header: {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    p: 2,
    borderBottom: '1px solid #f0f0f0',
  },
  
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  
  logoText: {
    fontWeight: 600, 
    color: '#333',
    fontSize: '1.2rem',
  },
  
  closeButton: {
    color: '#666',
  },
  
  menuList: {
    flexGrow: 1, 
    overflowY: 'auto', 
    pt: 0,
    pb: 2,
  },
  
  menuItem: {
    py: 1.5,
    px: 2,
    position: 'relative',
    '&:hover': {
      bgcolor: '#f5f9ff',
    },
  },
  
  activeMenuItem: {
    bgcolor: '#f0f7ff',
    '&:hover': {
      bgcolor: '#e6f2ff',
    },
  },
  
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 4,
    height: '70%',
    bgcolor: '#1976d2',
    borderRadius: '0 4px 4px 0',
  },
  
  menuIcon: {
    color: '#666', 
    minWidth: 40,
  },
  
  menuText: {
    fontSize: 15,
    fontWeight: 500,
    color: '#333',
  },
  
  subMenuItem: {
    py: 1.2,
    pl: 6,
    pr: 2,
    position: 'relative',
    '&:hover': {
      bgcolor: '#f5f9ff',
    },
  },
  
  activeSubMenuItem: {
    bgcolor: '#f0f7ff',
    '&:hover': {
      bgcolor: '#e6f2ff',
    },
  },
  
  subMenuText: {
    fontSize: 14,
    fontWeight: 400,
    color: '#555',
  },
});
