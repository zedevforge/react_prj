import { Box, Button, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/postService";
import Loading from "../../components/global/Loading";
import { Link } from "react-router";
import {  useTranslation } from "react-i18next";

const Posts = () => {
  const { t, i18n  } = useTranslation();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: t("posts.id"),
      width: 80,
    },
    {
      field: "title",
      headerName: t("posts.titleColumn"),
      flex: 1,
      minWidth: 250,
    },
    {
      field: "views",
      headerName: t("posts.views"),
      width: 120,
    },
    {
      field: "likes",
      headerName: t("posts.likes"),
      width: 120,
    },
    {
      field: "dislikes",
      headerName: t("posts.dislikes"),
      width: 120,
    },
    {
      field: "userId",
      headerName: t("posts.userId"),
      width: 120,
    },
    {
      field: "actions",
      headerName: t("posts.action"),
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          component={Link}
          to={`/app/posts/${params.row.id}`}
          variant="outlined"
          size="small"
        >
          {t("posts.view")}
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>{t("common.error")}</div>;
  }

  const rows =
    data?.posts.map((post) => ({
      id: post.id,
      title: post.title,
      views: post.views,
      likes: post.reactions.likes,
      dislikes: post.reactions.dislikes,
      userId: post.userId,
    })) ?? [];

  return (
    <Box>
      <Typography variant="h4">
        {t("posts.title")}
      </Typography>

      <Box className="mt-6" dir={i18n.language === "fa" ? "rtl" : "ltr"}>

        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
           

          // Pagination
          pageSizeOptions={[5, 10, 20, 50]}
          initialState={{
            pagination: {
              paginationModel: {
                page: 0,
                pageSize: 10,
              },
            },
          }}

          // Sorting
          sortingOrder={["asc", "desc", null]}

          // Filtering
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default Posts;