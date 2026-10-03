import { Box, CircularProgress } from "@mui/material";

const MainLoading = () => {
  return (
    <Box
      className="flex min-h-screen items-center justify-center"
    >
      <CircularProgress size={40} />
    </Box>
  );
};

export default MainLoading;