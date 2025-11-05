import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../utils/api";

function Register({ hovered, setHovered, setRegistered, setActive, active }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await apiFetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // for cookies/session if using passport

        body: JSON.stringify(formData),
      });

      setRegistered(true);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <form
      className="mt-30 text-white animate-fade-in-down flex flex-col space-y-7 border-4 border-[#343536] bg-[#181818] w-80 h-150 rounded-2xl  items-center justify-center lg:w-100"
      action=""
      onSubmit={handleRegister}
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
      <h1 className="">Register to get started!</h1>
      <div className="flex flex-col">
        <label htmlFor="Name">Name:</label>
        <input
          type="text"
          name="name"
          className="bg-[#343536] h-10 rounded-lg p-3 z-50 focus:bg-[#251f19]"
          placeholder="Name"
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            
          }}
        />
      </div>
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
          Have an acc?{" "}
          <span
            onClick={() => {
              setRegistered(true);
            }}
            className="text-blue-500 cursor-pointer z-50 "
          >
            Login!
          </span>
        </p>
      </div>
      {/* <img
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setActive(!active)}
        className={`w-75 h-75 absolute rotate-180 -bottom-5 z-40 transition-transform duration-500 ease-out  ${
          hovered || active ? "translate-y-40 animate-tilt" : ""
        }`}
        src="images/[CITYPNG.COM]HD Spider Man Black Character PNG - 2500x2500.png"
        alt="Spider-Man"
      /> */}
    </form>
  );
}

export default Register;

// later figuered why didnt i just put them in the same file and just added name field to the form but ima keep it this to see if it will bring anything useful
