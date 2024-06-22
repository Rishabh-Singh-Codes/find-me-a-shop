import { useForm } from "react-hook-form";
import z from "zod";
import { loginUserSchema } from "../../../shared/validation/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { LOGIN_BG } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useDispatch } from "react-redux";
import { showToast } from "../store/toastSlice";

export type SignInFormData = z.infer<typeof loginUserSchema>;

const SignIn = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(loginUserSchema),
  });

  const mutation = useMutation(apiClient.signInUser, {
    onSuccess: async () => {
      console.log("user logged in");
      dispatch(
        showToast({
          message: "Login Successful",
          type: "SUCCESS",
        })
      );

      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      console.log(error);
      dispatch(showToast({ message: error.message, type: "ERROR" }));
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log("data", data);
    mutation.mutate(data);
  });

  return (
    <div>
      <img
        src={LOGIN_BG}
        alt="background"
        className="absolute object-cover h-full w-full z-0 top-0 left-0"
      />
      <form
        className="w-4/5 md:w-1/2 mx-auto bg-teal-950/90 flex flex-col px-8 md:px-16 rounded-2xl pt-8 relative"
        onSubmit={onSubmit}
      >
        <h2 className="text-white text-3xl font-bold mb-4">Sign-In</h2>
        <div className="flex flex-col flex-1">
          <label className="text-white text-sm font-bold flex flex-col mb-5">
            Email
            <input
              type="email"
              className="p-3 bg-transparent border border-gray-400 rounded-md focus:outline-none placeholder-gray-400 text-gray-100"
              {...register("email")}
            />
            <div className="h-2">
              {errors.email && (
                <span className={"text-rose-500 text-sm mt-1"}>
                  {errors.email.message}
                </span>
              )}
            </div>
          </label>

          <label className="text-white text-sm font-bold flex flex-col mb-5">
            Password
            <input
              type="password"
              className="p-3 bg-transparent border border-gray-400 rounded-md focus:outline-none placeholder-gray-400 text-gray-100"
              {...register("password")}
            />
            <div className="h-2">
              {errors.password && (
                <span className={"text-rose-500 text-sm mt-1"}>
                  {errors.password.message}
                </span>
              )}
            </div>
          </label>

          <span className="flex flex-col md:flex-row items-center justify-between py-10">
            <span className="text-sm text-white md:flex flex-col">
              Not registered?{" "}
              <Link to="/register" className="underline">
                Create an Account ↗
              </Link>
            </span>
            <button
              type="submit"
              className="flex bg-white rounded-md items-center p-3 font-bold hover:cursor-pointer hover:bg-gray-100 hover:text-teal-600 transition"
            >
              Login
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
