import {Box , Card , CardContent , Typography} from "@mui/material";
import CartQuantityControl from "../../components/global/CartQuantityControl";
import useCartStore from "../../store/cartStore";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { t } = useTranslation();
  const items = useCartStore((state) => state.items);

  const totalPrice = items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  return (
    <Box>
      <Typography variant="h4">
        {t("common.cart")}
      </Typography>

      {items.length === 0 ? (
        <Typography className="mt-6">
          {t("cart.empty")}
        </Typography>
      ) : (
        <>
          <Box className="mt-6 flex flex-col gap-4">
            {items.map((item) => (
              <Card key={item.product.id}>
                <CardContent className="flex items-center gap-4">
                  <Box
                    component="img"
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="h-24 w-24 object-contain"
                  />

                  <Box className="flex-1">
                    <Typography variant="h6">
                      {item.product.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      className="mt-2"
                    >
                      ${item.product.price}
                    </Typography>
                  </Box>

                  <CartQuantityControl
                    product={item.product}
                    quantity={item.quantity}
                  />

                  <Typography>
                    $
                    {(
                      item.product.price *
                      item.quantity
                    ).toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box className="mt-6 flex justify-end">
            <Typography variant="h5">
              {t("cart.total")}: ${totalPrice.toFixed(2)}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;