import { RootStateType } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItem, clearCart, removeItem } from "@/store/cartSlice";
import { CartItemType } from "@/utils/types";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import CartShopDetails from "@/components/CartShopDetails";
import CartOrderList from "@/components/CartOrderList";

const Cart = () => {
  const { items: cartItems, store } = useSelector(
    (store: RootStateType) => store.cart
  );
  const dispatch = useDispatch();

  const { data: shop } = useQuery(
    "getShopDetails",
    () => apiClient.getShopDetails(store as string),
    {
      enabled: !!store,
    }
  );

  //   console.log("shop", shop);

  const totalPrice = cartItems.reduce((acc, curr) => {
    return (acc += Number(curr.itemPrice.split("₹")[1]) * curr.itemQty);
  }, 0);

  const handleDeleteItem = (item: CartItemType) => {
    // console.log("item", item);
    dispatch(removeItem({ itemId: item.itemId }));
  };

  const handleAddItem = async (item: CartItemType) => {
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

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      {cartItems.length === 0 || shop === undefined ? (
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-center">Cart</h1>
          <h2 className="text-center font-semibold">
            Your cart is empty!{" "}
            <Link to="/" className="hover:cursor-pointer underline">
              Add some items
            </Link>{" "}
            to your cart.
          </h2>
        </div>
      ) : (
        <div className="flex">
          <CartShopDetails shop={shop} />
          <CartOrderList
            cartItems={cartItems}
            totalPrice={totalPrice}
            shopId={shop._id}
            handleAddItem={handleAddItem}
            handleDeleteItem={handleDeleteItem}
            handleClearCart={handleClearCart}
          />
        </div>
      )}
    </>
  );
};

export default Cart;
