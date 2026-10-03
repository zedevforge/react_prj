import { Box, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { getPost } from "../../services/postService";
import Loading from "../../components/global/Loading";
import { useTranslation } from "react-i18next";



const PostDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading, isError, } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id!),
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
      <Box className="flex items-center justify-between gap-4">
        <Typography variant="h4">
          {data?.title}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate("/app/posts")}
        >
          {t("posts.back")}
        </Button>

      </Box>

      <Typography className="mt-4">
        {data?.body}
      </Typography>

      <Typography className="mt-4">
        {t("posts.views")}: {data?.views}
      </Typography>

      <Typography className="mt-2">
        {t("posts.likes")}: {data?.reactions.likes}
      </Typography>

      <Typography className="mt-2">
        {t("posts.dislikes")}: {data?.reactions.dislikes}
      </Typography>

      <Typography className="mt-2">
        {t("posts.userId")}: {data?.userId}
      </Typography>
    </Box>
  );
};

export default PostDetail;