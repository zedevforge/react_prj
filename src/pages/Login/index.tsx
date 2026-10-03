import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import DsButton from "../../components/design-system/DsButton";
import DsTypography from "../../components/design-system/DsTypography";
import { loginUser } from "../../services/authService";
import useAuthStore from "../../store/authStore";
import { useTranslation } from "react-i18next";


interface LoginFormData {
  username: string;
  password: string;
}

const Login = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();

  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const setUser = useAuthStore((state) => state.setUser);


  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginUser(data);

      setAccessToken(result.accessToken);

      setUser({
        id: result.id,
        username: result.username,
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName,
        image: result.image,
      });

      toast.success(t("auth.loginSuccess"));

      navigate("/app/home", {
        replace: true,
      });
    } catch {
      toast.error(t("auth.loginError"));
    }
  };

  return (
    <Box className="flex min-h-screen items-center justify-center">
      <Box className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <DsTypography variant="h4" component="h1">
          {t("common.login")}
        </DsTypography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 flex flex-col gap-4"
        >
          <TextField
            label={t("auth.username")}
            {...register("username", {
              required: "Username is required",
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            label={t("auth.password")}
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <DsButton
            type="submit"
            loading={isSubmitting}
          >
            {t("common.login")}
          </DsButton>

          <DsButton
            type="button"
            variant="text"
            onClick={() => navigate("/recover-password")}
          >
            {t("auth.forgotPassword")}
          </DsButton>


        </Box>
      </Box>
    </Box>
  );
};

export default Login;