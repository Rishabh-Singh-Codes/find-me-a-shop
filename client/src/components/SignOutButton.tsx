import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useDispatch } from "react-redux";
import { showToast } from "../store/toastSlice";
import { clearCart } from "@/store/cartSlice";

const SignOutButton = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.signOutUser, {
    onSuccess: async () => {
      dispatch(
        showToast({
          message: "Signout Successful",
          type: "SUCCESS",
        })
      );

      dispatch(clearCart());

      await queryClient.invalidateQueries("validateToken");
    },
    onError: (error: Error) => {
      console.log(error);
      dispatch(showToast({ message: error.message, type: "ERROR" }));
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <div
      onClick={handleClick}
      className="flex bg-white rounded-md items-center px-3 font-bold hover:cursor-pointer hover:bg-gray-100 hover:text-teal-600 transition"
    >
      Sign Out
    </div>
  );
};

export default SignOutButton;
