import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { apiFetch } from "../utils/api";
import { toast } from "react-toastify";
function Login({ hovered, setHovered, setRegistered, setActive, active }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiFetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // for cookies/session if using passport
        body: JSON.stringify(formData),
      });
      toast.success(" Logged in Successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/goals");

      // navigate to dashboard, etc.
    } catch (err) {
      console.error("Error:", err);
      alert(err.message || "Login failed");
    }
  };

  return (
    <form
      className="mt-30 animate-fade-in-down text-white flex flex-col space-y-7 border-4 border-[#343536] bg-[#181818] w-80 h-150 rounded-2xl  items-center justify-center lg:w-100"
      action=""
      onSubmit={handleLogin}
    >
      <Link to="/">
        <img
          className="w-30 h-30 z-50"
          src="images/abstract-by-tornike-uchava-dribbble.png"
          alt=""
        />
      </Link>
      {/* <img
            className="absolute overflow-y-hidden w-25 h-150 mt-50 select-none pointer-events-none mr-2"
            src="images/Vertical-Line-PNG-HD-Image.png"
            alt=""
          /> */}
      <h1 className="">Login and get started!</h1>
      <div className="flex-col flex ">
        <label htmlFor="email">Email</label>
        <input
          placeholder="Email..."
          className="bg-[#343536] h-10 rounded-lg p-3 z-50 focus:bg-[#251f19]"
          type="email"
          name="email"
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
      </div>

      <div className="flex-col flex">
        <label htmlFor="password">Password</label>
        <input
          placeholder="Password..."
          className="bg-[#343536] h-10 rounded-lg z-50 p-3 focus:bg-[#251f19]"
          name="password"
          type="password"
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
      </div>
      <div
        className="relative flex flex-col items-center  space-y-2"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <button
          type="submit"
          className="bg-[#343536] w-full h-10 rounded-lg z-10 hover:bg-[#493f33] mt-3"
        >
          Submit
        </button>

        <p>
          Don't have an acc?{" "}
          <span
            onClick={() => {
              setRegistered(false);
            }}
            className="text-blue-500 cursor-pointer  "
          >
            Register
          </span>
        </p>
      </div>
    </form>
  );
}

export default Login;
