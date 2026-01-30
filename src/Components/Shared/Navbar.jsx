import React, { useContext, useEffect, useState } from "react";
// import logo from "../../assets/open-book_12743688.png";
import logo from "../../assets/logo.png";

import { Link, NavLink } from "react-router";
import useAuth from "../../Hook/useAuth";
import toast from "react-hot-toast";
import { ThemeContext } from "../../Context/ThemeContext";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Account Logged Out"))
      .catch((err) => toast.error(err));
  };

  return (
    <div className="navbar   w-11/12 mx-auto text-primary bg-white/10 backdrop-blur-md backdrop-saturate-150 border border-white/20">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow font-semibold"
          >
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/jobs"}>Find Jobs</NavLink>
            </li>
            <li>
              <NavLink to={"/gigs"}>Show Gigs</NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard"}>DashBoard</NavLink>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-1">
          <img src={logo} className="w-8 h-8 md:w-16 md:h-16" alt="" />
          <a className="text-sm md:text-xl text-primary font-bold">
            Freelancer Bd
          </a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 rounded-lg text-primary font-semibold bg-primary/10 border border-primary/30 backdrop-blur-sm"
                  : "px-4 py-2 rounded-lg hover:bg-primary/5 transition-all duration-300"
              }
              to={"/"}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 rounded-lg text-primary font-semibold bg-primary/10 border border-primary/30 backdrop-blur-sm"
                  : "px-4 py-2 rounded-lg hover:bg-primary/5 transition-all duration-300"
              }
              to={"/jobs"}
            >
              Find Jobs
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 rounded-lg text-primary font-semibold bg-primary/10 border border-primary/30 backdrop-blur-sm"
                  : "px-4 py-2 rounded-lg hover:bg-primary/5 transition-all duration-300"
              }
              to={"/gigs"}
            >
              Show Gigs
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 rounded-lg text-primary font-semibold bg-primary/10 border border-primary/30 backdrop-blur-sm"
                  : "px-4 py-2 rounded-lg hover:bg-primary/5 transition-all duration-300"
              }
              to={"/dashboard"}
            >
              DashBoard
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex gap-1">
        <input
          type="checkbox"
          className="toggle mr-2"
          onChange={(e) => toggleTheme(e.target.checked)}
          checked={theme === "dark"}
        />

        {loading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : user ? (
          <div className="flex gap-3 items-center">
            <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
              <img
                className="w-10 h-10 rounded-full border p-0.5 border-primary cursor-pointer"
                src={user.photoURL}
                alt="profile"
              />
            </div>

            <button
              onClick={handleLogOut}
              className="btn btn-sm md:btn-md btn-secondary font-bold"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/logIn"
              className="btn btn-sm md:btn-md btn-primary text-white font-bold"
            >
              LogIn
            </Link>
            <Link
              to="/register"
              className="btn btn-sm md:btn-md btn-primary text-white font-bold"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
