import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import Loading from "../../components/global/Loading";
import { getUser } from "../../services/userService";
import { useTranslation } from "react-i18next";


const UserDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const {data , isLoading , isError} = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>{t("common.error")}</div>;
  }

  return (
  <Box>
    <Typography variant="h4">
      {data?.firstName} {data?.lastName}
    </Typography>

    <Typography className="mt-2">
      {t("users.username")}: @{data?.username}
    </Typography>

    <Typography className="mt-2">
      {t("users.email")}: {data?.email}
    </Typography>

    <Typography className="mt-2">
      {t("users.phone")}: {data?.phone}
    </Typography>

    <Typography className="mt-2">
      {t("users.age")}: {data?.age}
    </Typography>

    <Typography className="mt-2">
      {t("users.gender")}: {data?.gender}
    </Typography>

    <Typography className="mt-2">
      {t("users.city")}: {data?.address.city}
    </Typography>
  </Box>
);
};

export default UserDetail;