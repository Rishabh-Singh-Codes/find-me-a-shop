import { RootStateType } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineMinusCircle } from "react-icons/hi";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { addItem, removeItem } from "@/store/cartSlice";
import { CartItemType } from "@/utils/types";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import OrderForm from "@/components/OrderForm";

const Cart = () => {
  const { items: cartItems, store } = useSelector(
    (store: RootStateType) => store.cart
  );
  const dispatch = useDispatch();

  const total = cartItems.reduce((acc, curr) => {
    return (acc += Number(curr.itemPrice.split("₹")[1]) * curr.itemQty);
  }, 0);

  const handleDeleteItem = (item: CartItemType) => {
    console.log("item", item);
    dispatch(removeItem({ itemId: item.itemId }));
  };

  const handleAddItem = (item: CartItemType) => {
    dispatch(
      addItem({
        item: {
          itemId: item.itemId,
          itemName: item.itemName,
          itemPrice: item.itemPrice,
          itemCategory: item.itemCategory,
        },
        store,
      })
    );
  };

  console.log('cartItems', cartItems)

  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    () => apiClient.createPaymentIntent(store as string, cartItems),
    {
      enabled: !!store && cartItems.length > 0,
    }
  );

  console.log('paymentIntentData', paymentIntentData)

  return (
    <div className="w-4/5 m-auto py-6 border">
      <h1 className="text-3xl font-bold text-center">Cart</h1>
      {cartItems.length === 0 ? (
        <h2 className="text-center font-semibold">
          Your cart is empty!{" "}
          <Link to="/" className="hover:cursor-pointer underline">
            Add some items
          </Link>{" "}
          to your cart.
        </h2>
      ) : (
        <>
          <div className="flex">
            <div className="w-1/2 m-auto">
              <div className="flex flex-col border-b-4 border-dashed border-teal-700">
                <div className="flex justify-between px-6 py-2 bg-teal-100 my-1 rounded-md group transition-all text-xs font-bold">
                  <h3 className="w-8/12">Item</h3>
                  <h3 className="w-2/12">Qty</h3>
                  <h3 className="w-2/12">Price/Qty</h3>
                </div>
                {cartItems.map((item) => (
                  <div
                    key={item.itemId}
                    className="flex justify-between px-6 py-2 bg-teal-50 my-1 rounded-md hover:bg-teal-100 group transition-all"
                  >
                    <div className="w-8/12 flex justify-start items-center">
                      <h3 className="">{item.itemName}</h3>
                      <span
                        onClick={() => handleAddItem(item)}
                        className="invisible group-hover:visible transition-all ml-2"
                      >
                        <HiOutlinePlusCircle className="text-teal-500 hover:cursor-pointer text-2xl font-bold" />
                      </span>
                      <span
                        onClick={() => handleDeleteItem(item)}
                        className="invisible group-hover:visible transition-all ml-1"
                      >
                        <HiOutlineMinusCircle className="text-rose-500 hover:cursor-pointer text-2xl font-bold" />
                      </span>
                    </div>
                    <h3 className="w-2/12">{item.itemQty}</h3>
                    <h3 className="w-2/12 flex flex-col items-end">
                      {item.itemPrice}
                    </h3>
                  </div>
                ))}
              </div>
              <div className="flex justify-between px-6 bg-teal-100 py-2 rounded-md my-1">
                <span className="font-semibold">Total: </span>
                <span className="text-lg font-bold">₹{total}</span>
              </div>
            </div>
            {/* <OrderForm /> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
