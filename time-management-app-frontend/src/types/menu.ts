import { ReactNode } from 'react';
import { UserRole } from './users';

/**
 * Interface for a sub-menu item
 */
export interface SubMenuItem {
  title: string;
  path?: string;
  roles: UserRole[];
}

/**
 * Interface for a main menu item
 */
export interface MenuItem {
  title: string;
  icon: ReactNode;
  path?: string;
  roles: UserRole[];
  subItems?: SubMenuItem[];
}

/**
 * Props for the Sidebar component
 */
export interface SidebarProps {
  userRole: UserRole;
  onMenuSelect: (menuTitle: string) => void;
}

/**
 * Props for the SidebarItem component
 */
export interface SidebarItemProps {
  item: MenuItem;
  activeMenu: string;
  expandedGroup: string | null;
  onMenuClick: (title: string) => void;
  onGroupClick: (title: string) => void;
}
