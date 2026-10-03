import { Article, CheckCircle, Home, Inventory2, People, Person } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router";
import useThemeStore from "../../store/themeStore";
import { useTranslation } from "react-i18next";

const Sidebar = () => {

  const { t } = useTranslation();
  const mode = useThemeStore((state) => state.mode);

  
  return (
    <Box
      className={`sticky top-4 flex h-[calc(100vh-2rem)] w-64 shrink-0 flex-col rounded-xl border p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 ${mode === "dark"
          ? "border-gray-700 bg-gray-900 text-white"
          : "border-gray-200 bg-white text-gray-900"
        }`}
    >

      {/* Logo */}
      <Box className="mb-8 flex items-center gap-3 px-3 py-2">
        <Box className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
          🛍
        </Box>

        <Typography
          variant="h6"
          className="font-bold"
        >
           {t("common.dashboard")}
          
        </Typography>
      </Box>

      {/* Menu */}
      <Box className="flex flex-1 flex-col gap-2">
        <NavLink
          to="/app/home"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-3 transition ${isActive
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <Home fontSize="small" />
          <span>{t("common.home")}</span>
        </NavLink>

        <NavLink
          to="/app/products"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-3 transition ${isActive
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <Inventory2 fontSize="small" />
          <span>{t("common.products")}</span>
        </NavLink>

        <NavLink
          to="/app/users"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-3 transition ${isActive
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <People fontSize="small" />
          <span>{t("common.users")}</span>
        </NavLink>

        <NavLink
          to="/app/posts"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-3 transition ${isActive
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <Article fontSize="small" />
          <span>{t("common.posts")}</span>
        </NavLink>

        <NavLink
          to="/app/todos"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-3 transition ${isActive
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <CheckCircle fontSize="small" />
          <span>{t("common.todos")}</span>
        </NavLink>

        <NavLink
          to="/app/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-3 transition ${isActive
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          <Person fontSize="small" />
          <span>{t("common.profile")}</span>
        </NavLink>
      </Box>
     
    </Box>
  );
};

export default Sidebar;