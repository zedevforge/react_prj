import { Avatar, Box, Card, CardContent } from "@mui/material";
import DsTypography from "../../components/design-system/DsTypography";
import useAuthStore from "../../store/authStore";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);

  return (
    <Box>
      <DsTypography variant="h4">
        {t("profile.title")}
      </DsTypography>

      <Card className="mt-6">
        <CardContent>
          <Box className="flex flex-col items-center gap-4">
            <Avatar
              src={user?.image}
              alt={user?.username}
              sx={{
                width: 100,
                height: 100,
              }}
            >
              {user?.firstName?.charAt(0)}
            </Avatar>

            <DsTypography variant="h5">
              {user?.firstName} {user?.lastName}
            </DsTypography>

            <DsTypography variant="body2">
              @{user?.username}
            </DsTypography>
          </Box>

          <Box className="mt-6 flex flex-col items-center gap-4">
            <Box className="text-center">
              {t("profile.email")}

              <DsTypography>
                {user?.email}
              </DsTypography>
            </Box>

            <Box className="text-center">
              <DsTypography variant="body2">
                {t("profile.userId")}
              </DsTypography>

              <DsTypography>
                {user?.id}
              </DsTypography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
export default Profile;