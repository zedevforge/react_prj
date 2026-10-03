import { BASE_URL } from "../constants";
import type { Product, ProductsResponse } from "../types/product";


export const getProducts = async (): Promise<ProductsResponse> => {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const getProduct = async (
  id: string
): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
};