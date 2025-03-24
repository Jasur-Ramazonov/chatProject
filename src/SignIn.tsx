import { useForm } from "react-hook-form";
import { checkUser, getUsers } from "./utils/requestsBack";
import { Link, useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  password: string;
}

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
              let users: User[] = res.docs.map((itm) => {
                return {
                  id: itm.id,
                  ...(itm.data() as { email: string; password: string }),
                };
              });
              let user = users.find((itm) => itm.email === data.email);
              navigate(`/telegram/${user?.id}`);
              localStorage.setItem("userId", user!.id);
              reset();
            });
          });
        })}
        className="flex flex-col gap-2 justify-center items-center w-full p-2"
      >
        <input
          {...register("email")}
          type="text"
          placeholder="email"
          className="p-2 outline-none rounded-md text-dark focus:outline-[#3498db] ease-linear duration-100 md:w-1/4 w-3/4"
        />
        <input
          {...register("password")}
          type="text"
          placeholder="password"
          className="p-2 outline-none rounded-md text-dark focus:outline-[#3498db] ease-linear duration-100 md:w-1/4 w-3/4"
        />
        <button type="submit" className="btn btn-primary md:w-1/4 w-3/4">
          Sign in
        </button>
        <Link to="/signup" className="btn btn-success md:w-1/4 w-3/4 ">
          Sign Up
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
