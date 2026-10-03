import { Box, Typography } from "@mui/material";
import { useParams } from "react-router";
import Loading from "../../components/global/Loading";
import { getProduct } from "../../services/productService";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const ProductDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
   const {data,isLoading,isError,} = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id!),
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
        {data?.title}
      </Typography>

      <Typography className="mt-2">
        {data?.description}
      </Typography>

      <Typography className="mt-2">
        ${data?.price}
      </Typography>
    </Box>
  );
};

export default ProductDetails;