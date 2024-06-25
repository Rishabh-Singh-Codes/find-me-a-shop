import OrderForm from "@/components/OrderForm";
import { RootStateType } from "@/store/store";
import { Elements } from "@stripe/react-stripe-js";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import * as apiClient from "../api-client";
import { useLocation, useParams } from "react-router-dom";
import CartSummary from "@/components/CartSummary";
import { FiLoader } from "react-icons/fi";

const Order = () => {
  const { shopId } = useParams();
  const {
    state: { cartItems, shop },
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
    <div className="flex w-full flex-col md:flex-row gap-y-6">
      <div className="md:w-1/3 md:py-8">
        <CartSummary cartItems={cartItems} />
      </div>
      <div className="md:w-2/3 md:pl-20 md:mt-8">
        {currentUser && paymentIntentData ? (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret: paymentIntentData.clientSecret }}
          >
            <OrderForm
              currentUser={currentUser}
              cartItems={cartItems}
              shop={shop}
              paymentIntent={paymentIntentData}
            />
          </Elements>
        ): 
        <div className="flex justify-center items-center h-64 flex-col">
            <FiLoader className="text-5xl font-bold animate-spin"/>
            <h3 className="text-xl font-semibold">Loading payment data</h3>
        </div>
        }
      </div>
    </div>
  );
};

export default Order;
