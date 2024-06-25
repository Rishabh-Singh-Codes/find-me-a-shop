import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { OrderType } from "../../../shared/validation/shop";
import OrderReceipt from "@/components/OrderReceipt";
import { Link } from "react-router-dom";

const UserOrders = () => {
  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  if (!currentUser) {
    return <></>;
  }

  const { orders } = currentUser;
  
  return (
    <>
      {orders.length === 0 ? (
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-center">Orders</h1>
          <h2 className="text-center font-semibold">
            You haven't made any orders yet!{" "}
            <Link to="/" className="hover:cursor-pointer underline">
              Add some items
            </Link>{" "}
            to your cart.
          </h2>
        </div>
      ) : (
        <div className="flex flex-col gap-y-6">
          <h1 className="text-5xl font-bold">Orders</h1>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            {orders
              .sort(
                (a: OrderType, b: OrderType) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((order: OrderType) => (
                <OrderReceipt key={order._id} order={order} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UserOrders;
