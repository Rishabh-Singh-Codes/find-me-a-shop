import { useForm } from "react-hook-form";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { FaCircleInfo } from "react-icons/fa6";
import {
  OrderType,
  PaymentIntentResponse,
} from "../../../shared/validation/shop";
import { UserType } from "../../../shared/validation/user";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/toastSlice";
import { CartItemType } from "@/utils/types";
import { useState } from "react";
import { clearCart } from "@/store/cartSlice";

type Props = {
  currentUser: UserType;
  cartItems: CartItemType[];
  paymentIntent: PaymentIntentResponse;
};

export type OrderFormData = OrderType & {
  paymentIntentId: string;
};

const OrderForm = ({ currentUser, cartItems, paymentIntent }: Props) => {
  const { shopId } = useParams();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createOrder, isLoading } = useMutation(
    apiClient.createShopOrder,
    {
      onSuccess: () => {
        dispatch(showToast({ message: "Order Confirmed", type: "SUCCESS" }));
        dispatch(clearCart());
      },
      onError: () => {
        dispatch(showToast({ message: "Error saving order", type: "ERROR" }));
      },
    }
  );

  const { register, handleSubmit } = useForm<OrderFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      cartItems: cartItems,
      shopId: shopId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const [paymentInProcess, setPaymentInProcess] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (formData: OrderFormData) => {
    if (!stripe || !elements) {
      return;
    }

    console.log('formData', formData)

    setPaymentInProcess(true);
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });
    setPaymentInProcess(false);

    if (result.paymentIntent?.status === "succeeded") {
      createOrder({ ...formData, paymentIntentId: result.paymentIntent.id });

      await queryClient.invalidateQueries("createPaymentIntent");

      navigate("/my-orders");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center flex items-center px-6">
        Confirm details
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 my-1 border-slate-300 rounded-lg p-6 bg-teal-100"
      >
        <div className="grid grid-cols-2 gap-6">
          <label className="text-gray-700 text-sm font-bold flex-1">
            First Name
            <input
              type="text"
              className="border rounded w-full py-1 px-2 font-normal text-gray-700 focus:outline-none bg-gray-300"
              readOnly
              disabled
              {...register("firstName")}
            />
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Last Name
            <input
              type="text"
              className="border rounded w-full py-1 px-2 font-normal text-gray-700 focus:outline-none bg-gray-300"
              readOnly
              disabled
              {...register("lastName")}
            />
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Email
            <input
              type="email"
              className="border rounded w-full py-1 px-2 font-normal text-gray-700 focus:outline-none bg-gray-300"
              readOnly
              disabled
              {...register("email")}
            />
          </label>
        </div>

        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Price Summary</h2>
          <div className="bg-teal-300 p-4 rounded-lg">
            <div className="font-semibold text-lg">
              Total Cost: ₹{paymentIntent.totalCost.toFixed(2)}
            </div>
            <div className="text-xs">Includes taxes and charges.</div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold flex items-center">
              Payment Details &nbsp;
            </h2>
            <div className="group flex relative">
              <FaCircleInfo className="animate-bounce text-lg" />
              <span
                className="group-hover:opacity-100 transition-opacity bg-gray-800 p-3 text-xs text-gray-100 rounded-md absolute 
    translate-x-5 -translate-y-24 opacity-0 m-4 mx-auto w-80"
              >
                <span className="block font-semibold">Testing?</span>
                💳 Use Card No.: 4000003560000008, any future date for MM/YY &
                any 3 digits for CVC.
              </span>
            </div>
          </div>
          <CardElement
            id="payment-element"
            className="border border-teal-800 rounded-lg p-3"
          />
        </div>

        <div className="flex justify-center">
          <button
            disabled={isLoading || paymentInProcess}
            type="submit"
            className="bg-teal-800 px-4 py-2 text-white hover:cursor-pointer hover:bg-teal-900 rounded-md font-semibold transition-all disabled:bg-gray-500"
          >
            {paymentInProcess
              ? "Processing..."
              : isLoading
              ? "Saving..."
              : "Confirm Payment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
