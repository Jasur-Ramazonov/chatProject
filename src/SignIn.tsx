import { useForm } from "react-hook-form";
import { checkUser, getUsers } from "./utils/requestsBack";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const { handleSubmit, register, reset } = useForm<{
    email: string;
    password: string;
  }>();

  const navigate = useNavigate();

  return (
    <div className="h-[80vh] flex flex-col gap-2 justify-center items-center">
      <h1 className="text-center font-bold text-3xl">Sign In</h1>
      <form
        onSubmit={handleSubmit((data) => {
          checkUser(data).then(() => {
            getUsers().then((res) => {
              let users = res.docs.map((itm) => {
                return { id: itm.id, ...itm.data() };
              });
              let user = users.find((itm) => itm.email === data.email);
              navigate(`/telegram/${user?.id}`);
              localStorage.setItem("userId", user!.id);
              reset();
            });
          });
        })}
        className="flex flex-col gap-2 justify-center items-center w-full"
      >
        <input
          {...register("email")}
          type="text"
          placeholder="email"
          className="form-control w-25"
        />
        <input
          {...register("password")}
          type="text"
          placeholder="password"
          className="form-control w-25"
        />
        <button type="submit" className="btn btn-primary w-25">
          Sign in
        </button>
        <Link to="/signup" className="btn btn-success w-25">
          Sign Up
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
