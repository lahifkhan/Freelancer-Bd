import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import SocialLogin from "./SocialLogin";

import registerImg from "../../assets/3dRegister.png";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, profileUpdate } = useAuth();
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();
  const location = useLocation();

  const userMutation = useMutation({
    mutationFn: async (userInfo) => {
      const res = await axiosSecure.post("/users", userInfo);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Account created successfully!");
      navigate(location?.state || "/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const registerSubmit = async (data) => {
    try {
      // Create Firebase user
      const result = await createUser(data.email, data.password);
      console.log("Firebase user created:", result.user);

      //  image to IMGBB
      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const imgURL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host
      }`;
      const imgRes = await axios.post(imgURL, formData);

      const photoURL = imgRes.data.data.display_url;

      // 3 Update Firebase profile
      await profileUpdate({
        displayName: data.name,
        photoURL,
      });

      //  Post user into database (TanStack mutation)
      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL,
      };

      userMutation.mutate(userInfo);
    } catch (err) {
      console.log(err);
      toast.error(err.code || "Registration failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center">
      <img src={registerImg} alt="" />
      <div className="card-body">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="mb-4">Register with BookNest</p>

        <form onSubmit={handleSubmit(registerSubmit)}>
          <fieldset className="fieldset">
            {/* NAME */}
            <label className="label ">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input w-full"
              placeholder="Your Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}

            {/* PHOTO */}
            <label className="label ">Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input w-full"
            />
            {errors.photo?.type === "required" && (
              <p className="text-red-500">Photo is required</p>
            )}

            {/* EMAIL */}
            <label className="label ">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}

            {/* PASSWORD */}
            <label className="label ">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                pattern: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
              })}
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Must be 6 characters, include uppercase & lowercase
              </p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button
              className="btn btn-secondary w-full mt-4"
              type="submit"
              disabled={userMutation.isPending}
            >
              {userMutation.isPending ? "Creating Account..." : "Register"}
            </button>
          </fieldset>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>

        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
