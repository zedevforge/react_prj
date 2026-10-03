import type { ReactNode } from "react";
import { Button, CircularProgress } from "@mui/material";

interface DsButtonProps {
  children: ReactNode;
  variant?: "text" | "outlined" | "contained";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  color?: "primary" | "secondary" | "success" | "error" | "warning";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  iconButton?: boolean;
  onClick?: () => void;
  className?: string;
}

const DsButton = ({
  children,
  variant = "contained",
  type = "button",
  disabled = false,
  loading = false,
  color = "primary",
  size = "medium",
  fullWidth = false,
  iconButton = false,
  onClick,
  className,
}: DsButtonProps) => {
  return (
    <Button
      variant={variant}
      type={type}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      className={className}
      sx={{
        borderRadius: 2,
        ...(iconButton
          ? {
            minWidth: 40,
            width: 40,
            height: 40,
            padding: 0,
          }
          : {})
      }}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : children}
    </Button >
  );
};

export default DsButton;