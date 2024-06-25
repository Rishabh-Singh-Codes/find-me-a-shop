import { CartItemType } from "@/utils/types";
import { HiOutlineMinusCircle } from "react-icons/hi";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ShopType } from "../../../shared/validation/shop";

type Props = {
  cartItems: CartItemType[];
  shop: ShopType;
  totalPrice: number;
  shopId: string;
  handleAddItem: (item: CartItemType) => void;
  handleDeleteItem: (item: CartItemType) => void;
  handleClearCart: () => void;
};

const CartOrderList = ({
  cartItems,
  shop,
  totalPrice,
  shopId,
  handleAddItem,
  handleDeleteItem,
  handleClearCart,
}: Props) => {
  return (
    <div className="">
      <h1
        className={`text-3xl font-bold text-center flex items-center ${
          cartItems.length > 0 ? "justify-between" : "justify-center"
        } px-6`}
      >
        Cart
        {cartItems.length > 0 && (
          <div className="has-tooltip flex flex-col ml-2">
            <span className="tooltip rounded-md -mt-6 -ml-4 p-1 bg-gray-100 text-rose-500 text-xs">
              Clear Cart
            </span>
            <span
              onClick={() => handleClearCart()}
              className="group-hover:visible transition-all ml-2"
            >
              <FaRegTrashAlt className="text-rose-500 hover:cursor-pointer text-2xl font-bold" />
            </span>
          </div>
        )}
      </h1>
      <div className="flex">
        <div className="w-full m-auto">
          <div className="flex flex-col border-b-4 border-dashed border-teal-700">
            <div className="flex justify-between px-6 py-2 bg-teal-100 my-1 rounded-md group transition-all text-xs font-bold">
              <h3 className="w-8/12">Item</h3>
              <h3 className="w-2/12">Qty</h3>
              <h3 className="w-2/12 text-end">Price</h3>
            </div>
            {cartItems.map((item) => (
              <div
                key={item.itemId}
                className="flex justify-between px-6 py-2 bg-teal-50 my-1 rounded-md hover:bg-teal-100 group transition-all"
              >
                <div className="w-8/12 flex justify-start items-center">
                  <h3 className="">{item.itemName}</h3>
                  <div className="has-tooltip flex flex-col ml-2">
                    <span className="tooltip rounded-md -mt-6 -ml-2 p-1 bg-gray-100 text-green-500 text-xs">
                      Add 1
                    </span>
                    <span
                      onClick={() => handleAddItem(item)}
                      className="invisible group-hover:visible transition-all ml-2"
                    >
                      <HiOutlinePlusCircle className="text-teal-500 hover:cursor-pointer text-2xl font-bold" />
                    </span>
                  </div>
                  <div className="has-tooltip flex flex-col ml-2">
                    <span className="tooltip rounded-md -mt-6 -ml-2 p-1 bg-gray-100 text-rose-500 text-xs">
                      Remove 1
                    </span>
                    <span
                      onClick={() => handleDeleteItem(item)}
                      className="invisible group-hover:visible transition-all ml-1"
                    >
                      <HiOutlineMinusCircle className="text-rose-500 hover:cursor-pointer text-2xl font-bold" />
                    </span>
                  </div>
                </div>
                <h3 className="w-2/12 text-start">{item.itemQty}</h3>
                <h3 className="w-2/12 flex flex-col items-end">
                  {item.itemPrice}
                </h3>
              </div>
            ))}
          </div>
          <div className="flex justify-between px-6 bg-teal-100 py-2 rounded-md my-1">
            <span className="font-semibold">Total: </span>
            <span className="text-lg font-bold">₹{totalPrice}</span>
          </div>
          <div className="flex justify-center mt-3">
            <Link
              to={`/shop/${shopId}/order`}
              state={{ cartItems, shop }}
              className="bg-teal-600 px-4 py-2 text-white hover:cursor-pointer hover:bg-teal-700 rounded-md font-semibold transition-all"
            >
              Proceed to Pay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartOrderList;
