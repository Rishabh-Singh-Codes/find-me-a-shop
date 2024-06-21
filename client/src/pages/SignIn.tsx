import { useForm } from "react-hook-form";
import z from "zod";
import { loginUserSchema } from "../../../shared/validation/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { LOGIN_BG } from "../utils/constants";

export type SignInFormData = z.infer<typeof loginUserSchema>;

const SignIn = () => {
  const { register, handleSubmit } = useForm<SignInFormData>({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log("data", data);
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
      ></form>
    </div>
  );
};

export default SignIn;
