import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  Box
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import { SidebarItemProps } from '../../types/menu';
import { sidebarStyles } from '../../styles/sidebar.styles';

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  activeMenu,
  expandedGroup,
  onMenuClick,
  onGroupClick
}) => {
  const styles = sidebarStyles();
  const isExpanded = expandedGroup === item.title;
  const navigate = useNavigate();
  
  // Check if this item or any of its subitems is active
  const isActive = activeMenu === item.title || 
    (item.subItems && item.subItems.some(subItem => activeMenu === subItem.title));

  const handleItemClick = () => {
    if (item.subItems && item.subItems.length > 0) {
      onGroupClick(item.title);
    } else if (item.path) {
      onMenuClick(item.title);
      navigate(item.path);
    }
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          onClick={handleItemClick}
          sx={{
            ...styles.menuItem,
            ...(isActive ? styles.activeMenuItem : {}),
          }}
        >
          {/* Active indicator */}
          {isActive && <Box sx={styles.activeIndicator} />}
          
          <ListItemIcon sx={styles.menuIcon}>
            {item.icon}
          </ListItemIcon>
          
          <ListItemText 
            primary={item.title} 
            primaryTypographyProps={styles.menuText}
          />
          
          {item.subItems && item.subItems.length > 0 && (
            isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />
          )}
        </ListItemButton>
      </ListItem>
      
      {/* Sub-items collapse */}
      {item.subItems && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.subItems.map((subItem) => (
              <ListItem key={subItem.title} disablePadding>
                <ListItemButton
                  onClick={() => {
                    onMenuClick(subItem.title);
                    if (subItem.path) {
                      navigate(subItem.path); // Naviguer vers le chemin du sous-élément
                    }
                  }}
                  sx={{
                    ...styles.subMenuItem,
                    ...(activeMenu === subItem.title ? styles.activeSubMenuItem : {}),
                  }}
                >
                  {/* Active indicator for sub-item */}
                  {activeMenu === subItem.title && <Box sx={styles.activeIndicator} />}
                  
                  <ListItemText 
                    primary={subItem.title} 
                    primaryTypographyProps={styles.subMenuText}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default SidebarItem;
