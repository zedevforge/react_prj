import { Box } from "@mui/material";
import { Outlet } from "react-router";

import Header from "./Header";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  return (
    <Box
      className="min-h-screen"
      sx={{
        backgroundColor: "background.default",
      }}
    >
      <Header />

      <Box className="flex gap-5 px-6 pb-6">
        <Sidebar />

        <Box className="min-w-0 flex-1">
          <Box
            className="min-h-[calc(100vh-7rem)] rounded-2xl p-6 shadow-sm"
            sx={{
              backgroundColor: "background.paper",
              border: "1px solid",
    borderColor: "divider",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;