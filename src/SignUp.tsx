import { useForm } from "react-hook-form";
import { createAuth, registerUser } from "./utils/requestsBack";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const { handleSubmit, register, reset } = useForm<{
    email: string;
    password: string;
  }>();

  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center flex-col h-[80vh]">
      <h1 className="text-center text-3xl font-bold">Sign Up</h1>
      <form
        onSubmit={handleSubmit((data) => {
          createAuth(data).then(() => {
            registerUser(data).then(() => {
              navigate("/signin");
            });
          });
          reset();
        })}
        className="flex justify-center items-center gap-2 flex-col w-full"
      >
        <input
          {...register("email")}
          type="text"
          className="form-control w-25"
          placeholder="email"
        />
        <input
          {...register("password")}
          type="text"
          className="form-control w-25"
          placeholder="password"
        />
        <button className="btn btn-primary w-25">Sign Up</button>
        <Link to="/signin" className="btn btn-success w-25">
          Sign In
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
