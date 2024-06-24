import OrderForm from "@/components/OrderForm";
import { RootStateType } from "@/store/store";
import { Elements } from "@stripe/react-stripe-js";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import * as apiClient from "../api-client";
import { useLocation, useParams } from "react-router-dom";
import CartSummary from "@/components/CartSummary";

const Order = () => {
  const { shopId } = useParams();
  const {
    state: { cartItems },
  } = useLocation();

  const stripePromise = useSelector(
    (state: RootStateType) => state.auth.stripePromise
  );

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    () => apiClient.createPaymentIntent(shopId as string, cartItems),
    {
      enabled: !!shopId && cartItems.length > 0,
    }
  );

  return (
    <div className="flex w-full">
      <CartSummary cartItems={cartItems} />
      <div className="w-2/3 pl-20">
        {currentUser && paymentIntentData && (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret: paymentIntentData.clientSecret }}
          >
            <OrderForm
              currentUser={currentUser}
              cartItems={cartItems}
              paymentIntent={paymentIntentData}
            />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Order;
