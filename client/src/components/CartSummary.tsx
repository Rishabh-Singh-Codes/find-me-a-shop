import { CartItemType } from "@/utils/types";

const CartSummary = ({cartItems}: {cartItems: CartItemType[]}) => {
  return (
    <div className="w-1/3">
      <h1 className="text-3xl font-bold text-center flex items-center px-6">
        Cart
      </h1>
      <div className="flex flex-col px-6 py-6 bg-teal-100 my-1 rounded-xl hover:bg-teal-200 group transition-all">
        <div className="flex font-semibold border-b border-teal-800 mb-2">
          <h3 className="w-4/6">Item</h3>
          <h3 className="w-1/6">Qty</h3>
          <h3 className="w-1/6">Price</h3>
        </div>
        {cartItems.map((item: CartItemType) => (
          <div key={item.itemId} className="flex justify-start">
            <h3 className="w-4/6">{item.itemName}</h3>
            <h3 className="w-1/6">{item.itemQty}</h3>
            <h3 className="w-1/6">{item.itemPrice}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartSummary;
