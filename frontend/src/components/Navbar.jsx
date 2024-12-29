import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthCheck";
import { Link, Navigate } from "react-router-dom";

const Navbar = () => {
  const { authUser, logOut, checkAuth } = useAuthStore();

  return (
    <div className="navbar bg-base-100 border-slate-500 ">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">EchoChat</a>
      </div>
      <div className="flex-none">
        <ul>
          {authUser ? (
            <Link to={"/profile"}>
              <li className="inline-block mx-4 text-md font-semibold cursor-pointer">
                Profile
              </li>
            </Link>
          ) : null}
          <li className="inline-block mx-4 text-md font-semibold cursor-pointer max-sm:hidden">
            Setting
          </li>

          {authUser ? (
            <li
              onClick={logOut}
              className="inline-block mx-4 text-md font-semibold cursor-pointer max-sm:hidden"
            >
              Logout
            </li>
          ) : (
            <>
              <Link to={"/signup"}>
                <li className="inline-block mx-4 text-md font-semibold cursor-pointer">
                  Sign up
                </li>
              </Link>
              <Link to={"/login"}>
                <li className="inline-block mx-4 text-md font-semibold cursor-pointer">
                  Login
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
