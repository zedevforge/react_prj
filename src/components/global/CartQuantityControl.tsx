import { Box } from "@mui/material";
import {Add , Delete , Remove} from "@mui/icons-material";
import DsButton from "../design-system/DsButton";
import useCartStore from "../../store/cartStore";
import type { Product } from "../../types/product";
import ConfirmDialog from "./ConfirmDialog";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface CartQuantityControlProps {
  product: Product;
  quantity: number;
}

const CartQuantityControl = ({
  product,
  quantity,
}: CartQuantityControlProps) => {
  const { t } = useTranslation();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);

  const increaseQuantity = useCartStore((state) => state.increaseQuantity );

  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const removeFromCart = useCartStore((state) => state.removeFromCart);

  if (quantity === 0) {
    return (
      <DsButton
        variant="outlined"
        color="primary"
        iconButton
        onClick={() => addToCart(product)}
      >
        <Add fontSize="small" />
      </DsButton>
    );
  }

 return (
  <>
    <Box className="flex items-center gap-2">
      {quantity === 1 ? (
        <DsButton
          variant="outlined"
          color="error"
          iconButton
          onClick={() => setConfirmOpen(true)}
        >
          <Delete fontSize="small" />
        </DsButton>
      ) : (
        <DsButton
          variant="outlined"
          color="primary"
          iconButton
          onClick={() => decreaseQuantity(product.id)}
        >
          <Remove fontSize="small" />
        </DsButton>
      )}

      <Box className="min-w-8 text-center font-medium">
        {quantity}
      </Box>

      <DsButton
        variant="outlined"
        color="primary"
        iconButton
        onClick={() => increaseQuantity(product.id)}
      >
        <Add fontSize="small" />
      </DsButton>
    </Box>

    <ConfirmDialog
      open={confirmOpen}
      title={t("cart.removeTitle")}
      message={t("cart.removeMessage")}
      onCancel={() => setConfirmOpen(false)}
      onConfirm={() => {
        removeFromCart(product.id);
        setConfirmOpen(false);
      }}
    />
  </>
);
};

export default CartQuantityControl;