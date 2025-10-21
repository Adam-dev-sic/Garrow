import React, { useState } from "react";

function Login() {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const [registered, setRegistered] = useState(false);
  return (
    <div className="@container  relative overflow-hidden bg-[url('/images/wallpaperflare.com_wallpaper(5).jpg')]  bg-cover bg-no-repeat bg-center h-screen flex items-center justify-center space-y-10 xl:flex-row xl:space-x-150 xl:justify-center xl:items-center">
      {registered ? (
        <form
          className="mt-30 text-white flex flex-col space-y-7 border-4 border-[#343536] bg-[#181818] w-80 h-150 rounded-2xl  items-center justify-center lg:w-100"
          action=""
        >
          <img
            className="w-30 h-30 z-50"
            src="images/abstract-by-tornike-uchava-dribbble.png"
            alt=""
          />
          <img
            className="absolute overflow-y-hidden w-25 h-150 mt-50 select-none pointer-events-none mr-2"
            src="images/Vertical-Line-PNG-HD-Image.png"
            alt=""
          />
          <h1 className="">Login and get started!</h1>
          <div className="flex-col flex ">
            <label htmlFor="email">Email</label>
            <input
              placeholder="Email..."
              className="bg-[#343536] h-10 rounded-lg p-3 z-50 focus:bg-[#251f19]"
              type="email"
              name="email"
            />
          </div>

          <div className="flex-col flex">
            <label htmlFor="password">Password</label>
            <input
              placeholder="Password..."
              className="bg-[#343536] h-10 rounded-lg z-50 p-3 focus:bg-[#251f19]"
              name="password"
              type="password"
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
          <img
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => setActive(!active)}
            className={`w-75 h-75 absolute rotate-180 -bottom-5 z-40 transition-transform duration-500 ease-out  ${
              hovered || active ? "translate-y-28 animate-tilt" : ""
            }`}
            src="images/[CITYPNG.COM]HD Spider Man Black Character PNG - 2500x2500.png"
            alt="Spider-Man"
          />
        </form>
      ) : (
        <form
          className="mt-30 text-white flex flex-col space-y-7 border-4 border-[#343536] bg-[#181818] w-80 h-150 rounded-2xl  items-center justify-center lg:w-100"
          action=""
        >
          <img
            className="w-30 h-30 z-50"
            src="images/abstract-by-tornike-uchava-dribbble.png"
            alt=""
          />
          <img
            className="absolute overflow-y-hidden w-25 h-150 mt-50 select-none pointer-events-none mr-2"
            src="images/Vertical-Line-PNG-HD-Image.png"
            alt=""
          />
          <h1 className="">Register to get started!</h1>
          <div className="flex-col flex ">
            <label htmlFor="email">Email</label>
            <input
              placeholder="Email..."
              className="bg-[#343536] h-10 rounded-lg p-3 z-50 focus:bg-[#251f19]"
              type="email"
              name="email"
            />
          </div>

          <div className="flex-col flex">
            <label htmlFor="password">Password</label>
            <input
              placeholder="Password..."
              className="bg-[#343536] h-10 rounded-lg z-50 p-3 focus:bg-[#251f19]"
              name="password"
              type="password"
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
          <img
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => setActive(!active)}
            className={`w-75 h-75 absolute rotate-180 -bottom-5 z-40 transition-transform duration-500 ease-out  ${
              hovered || active ? "translate-y-28 animate-tilt" : ""
            }`}
            src="images/[CITYPNG.COM]HD Spider Man Black Character PNG - 2500x2500.png"
            alt="Spider-Man"
          />
        </form>
      )}
    </div>
  );
}

export default Login;
