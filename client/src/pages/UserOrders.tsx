import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const UserOrders = () => {
  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  console.log('currentUser', currentUser)
  return <div>UserOrders</div>;
};

export default UserOrders;
