import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Drawer, 
  IconButton, 
  useMediaQuery, 
  useTheme,
  List,
  Button,
  Divider
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Close as LogoutIcon
} from '@mui/icons-material';
import { SidebarProps } from '../../types/menu';
import { menuItems } from '../../data/menuItems';
import SidebarItem from './SidebarItem';
import SidebarHeader from './SidebarHeader';
import { sidebarStyles } from '../../styles/sidebar.styles';
import { logout } from '../../apis/auth';

/**
 * Sidebar component that displays navigation menu based on user role
 */
const Sidebar: React.FC<SidebarProps> = ({ userRole, onMenuSelect }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const styles = sidebarStyles();


  useEffect(() => {
    const currentPath = location.pathname;
    for (const item of menuItems) {
      if (item.path === currentPath) {
        setActiveMenu(item.title);
        return;
      }
      
      if (item.subItems) {
        for (const subItem of item.subItems) {
          if (subItem.path === currentPath) {
            setActiveMenu(subItem.title);
            setExpandedGroup(item.title);
            return;
          }
        }
      }
    }
  }, [location.pathname]);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (title: string) => {
    setActiveMenu(title);
    onMenuSelect(title);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleGroupClick = (title: string) => {
    setExpandedGroup(expandedGroup === title ? null : title);
  };

  const handleLogout = () => {
    logout();
  };

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  );

  const drawer = (
    <Box sx={styles.drawerContainer}>
      <SidebarHeader onClose={isMobile ? handleDrawerToggle : undefined} />
      
      <List sx={styles.menuList}>
        {filteredMenuItems.map((item) => (
          <SidebarItem
            key={item.title}
            item={item}
            activeMenu={activeMenu}
            expandedGroup={expandedGroup}
            onMenuClick={handleMenuClick}
            onGroupClick={handleGroupClick}
          />
        ))}
      </List>
      
      {/* Logout button at the bottom */}
      <Box sx={{ mt: 'auto', p: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <Button
          variant="outlined"
          color="error"
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            justifyContent: 'flex-start',
            textTransform: 'none',
            py: 1
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile hamburger menu button */}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={styles.menuButton}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* The sidebar for mobile (temporary drawer) */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={styles.drawer}
        >
          {drawer}
        </Drawer>
      ) : (
        // The sidebar for desktop (permanent drawer)
        <Drawer
          variant="permanent"
          sx={styles.drawer}
          open
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
