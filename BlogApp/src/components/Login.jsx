import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Logo, Input } from "./index";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const Login = async (data) => {
    setError(""); // best pactice h k login hoty k sath hi Error hata do
    try {
      const session = await authService.login(data); // is ko bad m chack krna h
      if (session) {
        const userData = authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/"); // link sy click kr k hm jaty hn path pr but navigate programmatliy auto us sy path pr jata h
      }
    } catch (error) {
      setError(error.massage);
    }
  };
  return (
    <div className="flex items-center w-full justify-center ">
      <div
        className={`mx-auto max-w-lg w-full bg-gray-100 rounded-lg p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100]">
            <Logo  width="100%"/>
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in your account
        </h2>
        <p className="mt-2 text-center text-black/60 text-base">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          />
          Sign Up
        </p>
        {error && <p className={`text-red-600 text-center mt-8`}>{error}</p>}
        <form onSubmit={handleSubmit(Login)} className={`mt-8`}>
          <div className={`space-y-5`}>
            <Input
              label="Email: "
              type="email"
              placeholder="Enter you Email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                    "Email address is must be a valid address",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your Password"
              {...register("password", {
                required: true,
              })}
            />
            <Button className={`w-full`} type="submit">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
