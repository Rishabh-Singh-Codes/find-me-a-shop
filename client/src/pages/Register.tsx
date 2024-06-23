import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_BG } from "../utils/constants";
import { z } from "zod";
import { registerUserSchema } from "../../../shared/validation/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useDispatch } from "react-redux";
import { showToast } from "../store/toastSlice";

export type RegisterFormData = z.infer<typeof registerUserSchema> & {
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient =useQueryClient();
  const location = useLocation();
  const fromLocation = location?.state?.from || "/";
  console.log('fromLocation', fromLocation, location)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerUserSchema),
  });

  const mutation = useMutation(apiClient.registerUser, {
    onSuccess: async () => {
      dispatch(
        showToast({
          message: "Registration Successful",
          type: "SUCCESS",
        })
      );
      await queryClient.invalidateQueries("validateToken");
      navigate(fromLocation);
    },
    onError: (error: Error) => {
      console.log(error);
      dispatch(showToast({ message: error.message, type: "ERROR" }));
    },
  });

  const onSubmit = handleSubmit((data) => {
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
        className="w-4/5 md:w-1/2 mx-auto bg-teal-950/90 h-5/6 flex flex-col px-8 md:px-16 rounded-2xl pt-8 relative"
        onSubmit={onSubmit}
      >
        <h2 className="text-white text-3xl font-bold mb-4">
          Create an Account
        </h2>
        <div className="flex flex-col flex-1 ">
          <label className="text-white text-sm font-bold flex flex-col mb-5">
            First Name
            <input
              type="text"
              className="p-3 bg-transparent border border-gray-400 rounded-md focus:outline-none placeholder-gray-400 text-gray-100"
              {...register("firstName")}
            />
            <div className="h-2">
              {errors.firstName && (
                <span className={"text-rose-500 text-sm mt-1"}>
                  {errors.firstName.message}
                </span>
              )}
            </div>
          </label>

          <label className="text-white text-sm font-bold flex flex-col mb-5">
            Last Name
            <input
              type="text"
              className="p-3 bg-transparent border border-gray-400 rounded-md focus:outline-none placeholder-gray-400 text-gray-100"
              {...register("lastName")}
            />
            <div className="h-2">
              {errors.lastName && (
                <span className="text-rose-500 text-sm mt-1">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </label>

          <label className="text-white text-sm font-bold flex flex-col mb-5">
            Email
            <input
              type="email"
              className="p-3 bg-transparent border border-gray-400 rounded-md focus:outline-none placeholder-gray-400 text-gray-100"
              {...register("email")}
            />
            <div className="h-2">
              {errors.email && (
                <span className="text-rose-500 text-sm mt-1">
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
                <span className="text-rose-500 text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>
          </label>

          <label className="text-white text-sm font-bold flex flex-col mb-5">
            Confirm Password
            <input
              type="password"
              className="p-3 bg-transparent border border-gray-400 rounded-md focus:outline-none placeholder-gray-400 text-gray-100"
              {...register("confirmPassword")}
            />
            <div className="h-2">
              {errors.confirmPassword && (
                <span className="text-rose-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </label>
        </div>

        <span className="flex flex-col md:flex-row items-center justify-between py-10">
          <span className="text-sm text-white md:flex flex-col">
            Already have an account?{" "}
            <Link to="/sign-in" state={{from: fromLocation}} className="underline">
              Sign In ↗
            </Link>
          </span>
          <button
            type="submit"
            className="flex bg-white rounded-md items-center p-3 font-bold hover:cursor-pointer hover:bg-gray-100 hover:text-teal-600 transition"
          >
            Create Account
          </button>
        </span>
      </form>
    </div>
  );
};

export default Register;
