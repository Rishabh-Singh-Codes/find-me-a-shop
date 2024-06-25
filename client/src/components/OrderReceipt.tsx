import { Link } from "react-router-dom";
import { CartItemType, OrderType } from "../../../shared/validation/shop";
import { LuStore } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";

const OrderReceipt = ({ order }: { order: OrderType }) => {
  return (
    <div className="border border-teal-600 rounded-lg p-4 mb-6 md:mb-0 bg-teal-50">
      <Link
        to={`/detail/${order.shopId}`}
        className="text-2xl font-bold hover:text-teal-600 flex items-center"
      >
        <LuStore className="mr-2 text-lg font-black" />
        {order.shopName}
      </Link>
      <h3 className="font-semibold flex items-center mb-1">
        <GrLocation className="mr-2 text-lg font-black" /> {order.shopLocality}
      </h3>
      <h3 className="text-sm font-semibold mb-4 flex items-center">
        <FaRegCalendarAlt className="mr-2 text-lg font-black" />
        {new Date(order.createdAt).toLocaleDateString()}&nbsp;|&nbsp;
        <MdOutlineAccessTime className="mr-1 text-xl font-black" />{" "}
        {new Date(order.createdAt).toLocaleTimeString()}
      </h3>
      <h4 className="mb-4 text-sm">
        <span className="font-semibold">Order ID: </span>
        {order._id}
      </h4>
      <div className="flex font-semibold border-b border-teal-800 mb-2">
        <h3 className="w-4/6">Item</h3>
        <h3 className="w-1/6">Qty</h3>
        <h3 className="w-1/6 flex justify-end">Price</h3>
      </div>
      <div className="border-b-2 border-dashed pb-1 mb-1 border-teal-800">
        {order.cartItems.map((item: CartItemType) => (
          <div key={item.itemId} className="flex justify-start">
            <h3 className="w-4/6">{item.itemName}</h3>
            <h3 className="w-1/6">{item.itemQty}</h3>
            <h3 className="w-1/6 flex justify-end">{item.itemPrice}</h3>
          </div>
        ))}
      </div>
      <div className="flex justify-between font-semibold">
        <span>Total: </span>
        <span>₹{order.totalCost}</span>
      </div>
    </div>
  );
};

export default OrderReceipt;
