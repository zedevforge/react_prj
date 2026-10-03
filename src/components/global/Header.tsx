import { DarkMode, LightMode, Logout } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import i18n from "../../i18n";
import useAuthStore from "../../store/authStore";
import useThemeStore from "../../store/themeStore";
import logo from "../../assets/logo.png";

const Header = () => {

    const navigate = useNavigate();

    const user = useAuthStore((state) => state.user);

    const logout = useAuthStore((state) => state.logout);

    const mode = useThemeStore((state) => state.mode);

    const handleLanguageChange = () => {
        const newLanguage =
            i18n.language === "en" ? "fa" : "en";

        i18n.changeLanguage(newLanguage);

        localStorage.setItem(
            "language",
            newLanguage
        );
    };

    const toggleTheme = useThemeStore((state) => state.toggleTheme);

    const handleLogout = () => {

        logout();

        navigate("/login", {
            replace: true,
        });
    };

    return (
        <Box className="flex h-20 items-center justify-between px-6" sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
        }}>

            {/* Logo */}
            <img
                src={logo}
                alt="PanelixLogo"
                className="h-12 w-auto"
            />

            {/* Right side */}
            <Box className="flex items-center gap-4">
                <Box
                    onClick={handleLanguageChange}
                    className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-gray-200/60 dark:hover:bg-gray-800"
                    sx={{
                        color: "text.primary",
                    }}
                >
                    {i18n.language === "en" ? "فارسی" : "English"}
                </Box>

                {/* Theme Toggle */}
                <Box
                    onClick={toggleTheme}
                    className={`relative flex h-10 w-[84px] cursor-pointer items-center justify-between rounded-full px-2 transition-colors duration-300 ${mode === "light"
                        ? "bg-orange-100"
                        : "bg-slate-700"
                        }`}
                >
                    <LightMode
                        fontSize="small"
                        className={
                            mode === "light"
                                ? "text-orange-500"
                                : "text-slate-400"
                        }
                    />

                    <DarkMode
                        fontSize="small"
                        className={
                            mode === "dark"
                                ? "text-blue-300"
                                : "text-slate-400"
                        }
                    />

                    <Box
                        className={`absolute top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ${mode === "dark"
                            ? "translate-x-[42px]"
                            : "translate-x-0"
                            }`}
                    >
                        {mode === "light" ? (
                            <LightMode
                                fontSize="small"
                                className="text-orange-500"
                            />
                        ) : (
                            <DarkMode
                                fontSize="small"
                                className="text-slate-700"
                            />
                        )}
                    </Box>
                </Box>

                {/* User */}
                <Box className="flex items-center gap-3">

                    <Avatar
                        src={user?.image}
                        alt={user?.username}
                    >
                        {user?.firstName?.charAt(0)}
                    </Avatar>

                    <Box className="hidden sm:block">
                        <Typography
                            variant="body2"
                            className="font-medium"
                            sx={{
                                color: "text.primary",
                            }}
                        >
                            {user?.firstName} {user?.lastName}
                        </Typography>
                    </Box>

                    <Logout
                        onClick={handleLogout}
                        className={`cursor-pointer text-red-500 transition hover:text-red-700 ${i18n.language === "fa" ? "scale-x-[-1]" : ""
                            }`}
                        fontSize="small"
                    />
                </Box>

            </Box>

        </Box>
    );
};

export default Header;