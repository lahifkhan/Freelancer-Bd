import React from "react";

import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const SocialLogin = () => {
  const { signGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleGoogleSignIn = () => {
    signGoogle()
      .then((res) => {
        console.log(res.user);
        toast.success("Successfully Log in");
        const userInfo = {
          email: res.user.email,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
        };

        axiosSecure.post("/users", userInfo).then((res) => {
          console.log("from socila login user ", res.data);
        });

        navigate(location?.state || "/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.code);
      });
  };
  return (
    <div>
      <p className="mb-2 text-center font-semibold">Or</p>
      {/* Google */}
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-md w-full bg-white text-black border-[#e5e5e5] hover:bg-secondary hover:text-base-100"
      >
        <svg
          aria-label="Google logo"
          width="26"
          height="26"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
