import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import loginImg from "../../assets/Login.png";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SocialLogin from "./SocialLogin";
import useAuth from "../../Hook/useAuth";

const LogIn = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        toast.success("Successfully Log in");

        navigate(location?.state || "/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.code);
      });
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row mt-8 ">
      <div>
        <img className="object-cover h-[80vh]" src={loginImg} alt="" />
      </div>
      <div className="card w-full  shrink-0 md:ml-8 flex-1">
        <div className="card-body ">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p>Login with BookNest</p>
          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">
              {/* email */}
              <label className="label text-base-content">Email</label>
              <input
                type="email"
                className="input w-full"
                placeholder="Email"
                name="email"
                {...register("email", { required: true })}
              />

              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required</p>
              )}

              {/* email */}
              <label className="label text-base-content">Password</label>
              <input
                type="password"
                className="input w-full"
                placeholder="Password"
                name="password"
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
                })}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password must be 6 characters or longer and one upperCase and
                  lowerCase
                </p>
              )}
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <div className="w-full">
                <button className="btn btn-secondary text-base-100 w-full mt-4">
                  Login
                </button>
              </div>
            </fieldset>
          </form>
          <p>
            Don’t have any account?{" "}
            <Link
              state={location.state}
              to={"/register"}
              className="text-blue-500"
            >
              Register
            </Link>{" "}
          </p>

          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
