import { Badge, Box, Card, CardContent, IconButton, Typography } from "@mui/material"
import { ShoppingCart } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/global/Loading";
import { getProducts } from "../../services/productService";
import { Link, useNavigate } from "react-router";
import useCartStore from "../../store/cartStore";
import CartQuantityControl from "../../components/global/CartQuantityControl";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const items = useCartStore(
    (state) => state.items
  );

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>{t("common.error")}</div>;
  }

  return (
    <Box>
      <Box className="flex justify-end">
        <IconButton
          onClick={() => navigate("/app/cart")}
        >
          <Badge
            badgeContent={cartCount}
            color="error"
          >
            <ShoppingCart sx={{ fontSize: 30 , color: "primary.main" }}
              className="cursor-pointer" />
          </Badge>
        </IconButton>
      </Box>

      <Typography variant="h4">
        {t("common.products")}
      </Typography>

      <Box className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {data?.products.map((product) => {
          const cartItem = items.find(
            (item) => item.product.id === product.id
          );

          return (
            <Card key={product.id}>
              <Link
                to={`/app/products/${product.id}`}
              >
                <Box
                  component="img"
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-48 w-full object-contain"
                />

                <CardContent>
                  <Typography variant="h6">
                    {product.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    className="mt-2"
                  >
                    ${product.price}
                  </Typography>
                </CardContent>
              </Link>

              <Box className="px-4 pb-4">
                <CartQuantityControl
                  product={product}
                  quantity={
                    cartItem
                      ? cartItem.quantity
                      : 0
                  }
                />
              </Box>
            </Card>
          );
        })}
      </Box>
    </Box>

  );
}; export default Products;