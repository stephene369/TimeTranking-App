import React from "react";
import { Box, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom"; // Utilisez Outlet pour le routage imbriqué
import Sidebar from "../Sidebar/Sidebar";
import { UserRole } from "../../types/users";

interface MainLayoutProps {
  userRole: UserRole;
}

const MainLayout: React.FC<MainLayoutProps> = ({ userRole }) => {
  const theme = useTheme();

  const handleMenuSelect = (menuTitle: string) => {
    // Cette fonction peut être utilisée pour d'autres actions lors de la sélection du menu
    // mais la navigation est maintenant gérée par SidebarItem
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#f5f7fa",
      }}
    >
      {/* Sidebar */}
      <Sidebar userRole={userRole} onMenuSelect={handleMenuSelect} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - 280px)` },
          ml: { sm: "280px" },
          overflow: "auto",
        }}
      >
        {/* App bar spacing */}
        <Box sx={{ height: { xs: 56, sm: 64 } }} />

        {/* Content from routes */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
