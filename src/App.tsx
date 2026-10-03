import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider } from '@mui/material';
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { useEffect, useMemo } from 'react';
import { useTranslation } from "react-i18next";
import './App.css';
import AppRoutes from './routes/AppRoutes';
import useThemeStore from './store/themeStore';
import createCache from "@emotion/cache";

function App() {
  const mode = useThemeStore((state) => state.mode);
  const { i18n } = useTranslation();



  const direction =
    i18n.language === "fa" ? "rtl" : "ltr";


  const cache = useMemo(() => {
    return createCache({
      key: direction === "rtl" ? "muirtl" : "muiltr",
      stylisPlugins:
        direction === "rtl"
          ? [rtlPlugin]
          : [],
    });
  }, [direction]);


  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      mode === "dark"
    );
  }, [mode]);

  useEffect(() => { 
    document.documentElement.dir = direction; 
  }, [direction]);


  const theme = createTheme({
    direction,
    palette: {
      mode,

      ...(mode === "light"
        ? {
          background: {
            default: "#f5f6f8",
            paper: "#ffffff",
          },
          divider: "#e5e7eb",
          text: {
            primary: "#1f2937",
            secondary: "#6b7280",
          },
        }
        : {
          background: {
            default: "#151922",
            paper: "#1d232e",
          },
          divider: "#343b48",
          text: {
            primary: "#f1f3f5",
            secondary: "#aeb6c2",
          },
        }),
    },
  });
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App