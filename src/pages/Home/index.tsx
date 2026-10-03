import { Box } from "@mui/material";
import DsTypography from "../../components/design-system/DsTypography";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <DsTypography
        variant="h4"
        component="h1"
      >
        {t("home.title")}
      </DsTypography>

      <DsTypography
        variant="body1"
        className="mt-2"
      >
        {t("home.welcome")}
      </DsTypography>
    </Box>
  );
};

export default Home;