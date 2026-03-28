import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Button, Logo, Input } from "./index";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
function Signup() {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.massage);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`mx-auto w-full max-w-lg  bg-gray-100 rounded-xl p-10 border border-black/10 `}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
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
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              type="text"
              placeholder="Enter your Full Name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              type="email"
              placeholder="Enter your Email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattren: (value) =>
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                    "Enetr yourEmail address is must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your Password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
