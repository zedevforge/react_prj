import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      className="flex items-center justify-center p-6"
    >
      <CircularProgress size={28} />
    </Box>
  );
};

export default Loading;