import type { ReactNode } from "react";
import { Typography } from "@mui/material";

interface DsTypographyProps {
  children: ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2";
  component?: React.ElementType;
  className?: string;
}

const DsTypography = ({
  children,
  variant = "body1",
  component = "span",
  className,
}: DsTypographyProps) => {
  return (
    <Typography
      variant={variant}
      component={component}
      className={className}
    >
      {children}
    </Typography>
  );
};

export default DsTypography;