import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-center bg-black w-full fixed z-50 h-25 px-8 py-8">
      {/* Center section */}
      <div className="flex items-center space-x-16">
        <Link to={"tasks"}>
          <button className="cursor-pointer text-white hover:border-b border-white">
            Tasks
          </button>
        </Link>
        <Link to={"/"}>
          <img
            src="/images/177-1772556_logo-no-background-grey-large-cool-logos-with.png"
            alt="Logo"
            className="w-20 h-20"
          />
        </Link>
        <Link to={"points"}>
          <button className="cursor-pointer text-white hover:border-b border-white">
            Points
          </button>{" "}
        </Link>
      </div>

      {/* Right section */}
      <Link to={"/auth"}>
        <button className="cursor-pointer text-white hover:text-gray-300 absolute bottom-10 right-8 max-md:hidden">
          Login
        </button>{" "}
      </Link>
    </nav>
  );
}

export default Navbar;
