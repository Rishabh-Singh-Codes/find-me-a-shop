import { PaymentIntentResponse } from "../../shared/validation/shop";
import { OrderFormData } from "./components/OrderForm";
import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { CartItemType, ShopType } from "./utils/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signInUser = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const signOutUser = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error during signout");
  }
};

export const getAllShops = async (): Promise<ShopType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/shops`);

  if (!response.ok) {
    throw new Error("Failed to fetch all shops");
  }

  return response.json();
};

export const getShopDetails = async (shopId: string): Promise<ShopType> => {
  const response = await fetch(`${API_BASE_URL}/api/shops/${shopId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch shop details");
  }

  return await response.json();
};

export const fetchCurrentUser = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching user");
  }

  return response.json();
};

export const createPaymentIntent = async (
  shopId: string,
  cartItems: CartItemType[]
): Promise<PaymentIntentResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/shops/${shopId}/orders/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ cartItems }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching payment intent");
  }

  return response.json();
};

export const createShopOrder = async (formData: OrderFormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/shops/${formData.shopId}/orders`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    throw new Error("Error creating order");
  }

  return response.json();
};
