import React, { useState } from "react";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/useAuthCheck";

const SignUpPage = () => {
  const [formData, setFromData] = useState({});
  const { isLoading, signUp } = useAuthStore();

  const handleForm = (e) => {
    e.preventDefault();

    // validations
    if (!formData.fullname) return toast.error("Full Name is required ");
    if (!formData.email) return toast.error("Email is required ");
    if (!formData.password) return toast.error("Password is required ");
    if (formData.password.length < 6)
      return toast.error("Password must be 6 charector");

    signUp(formData);
  };
  return (
    <div className="flex flex-col md:flex-row min-h-[85vh] py-4">
      <div className="flex flex-col justify-center p-8 sm:w-full md:w-1/2">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">Sign Up</h1>
        </div>

        <form onSubmit={handleForm}>
          <label className="input input-bordered flex items-center my-4 gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              value={formData?.fullname}
              onChange={(e) =>
                setFromData({ ...formData, fullname: e.target.value })
              }
              className="grow"
              placeholder="Full Name"
            />
          </label>
          <label className="input input-bordered flex items-center my-4 gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              value={formData?.email}
              onChange={(e) =>
                setFromData({ ...formData, email: e.target.value })
              }
              className="grow"
              placeholder="Email"
            />
          </label>

          <label className="input input-bordered flex items-center my-4 gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              value={formData?.password}
              onChange={(e) =>
                setFromData({ ...formData, password: e.target.value })
              }
              type="password"
              placeholder="password"
              className="grow"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                className="cursor-pointer"
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          <p className="py-3">
            Already Have an Account ?{" "}
            <NavLink className={"text-blue-700"} to={"/login"}>
              Login{" "}
            </NavLink>
          </p>

          <button className="py-2 px-4 bg-indigo-600 w-full text-white rounded-lg">
            {isLoading ? "Loding..." : "Sign up"}
          </button>
        </form>
      </div>

      <div className="hidden md:flex w-1/2 items-center justify-center relative">
        <div className="text-center">
          <img
            src="https://www.freeiconspng.com/uploads/facebook-chat-logo-png-19.png"
            alt=""
            className="w-96"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
