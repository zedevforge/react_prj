import { Avatar, Box, Card, CardContent, Typography, } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/global/Loading";
import { getUsers } from "../../services/userService";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

const Users = () => {
  const { t } = useTranslation();
  const {data , isLoading , isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
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
         {t("users.title")}
      </Typography>

      <Box className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.users.map((user) => (
          <Link key={user.id} to={`/app/users/${user.id}`}>
            <Card>
              <CardContent className="flex items-center gap-4">
                <Avatar
                  src={user.image}
                  alt={`${user.firstName} ${user.lastName}`}
                />

                <Box>
                  <Typography variant="h6">
                    {user.firstName} {user.lastName}
                  </Typography>

                  <Typography variant="body2">
                    @{user.username}
                  </Typography>

                  <Typography variant="body2">
                    {user.email}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Users;