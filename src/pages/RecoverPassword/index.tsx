import { useState } from "react";
import {Box,Button,TextField,Typography,} from "@mui/material";
import { useNavigate } from "react-router";

const RecoverPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log(email);
  };

  return (
    <Box className="flex min-h-screen items-center justify-center p-6">
      <Box
        className="w-full max-w-md rounded-2xl p-8"
        sx={{
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography
          variant="h5"
          className="mb-2 font-bold"
          sx={{ color: "text.primary" }}
        >
          Recover Password
        </Typography>

        <Typography
          variant="body2"
          className="mb-6"
          sx={{ color: "text.secondary" }}
        >
          Enter your email to recover your password.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
          >
            Send Recovery Link
          </Button>

          <Button
            type="button"
            variant="text"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RecoverPassword;