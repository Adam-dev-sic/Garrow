import React from "react";

function Navbar() {
  return (
    <nav className="flex items-center justify-center bg-black w-full fixed z-50 h-25 px-8 py-8">
      {/* Center section */}
      <div className="flex items-center space-x-16">
    
        <button className="text-white hover:border-b border-white">
          Tasks
        </button>
        <img
          src="/images/177-1772556_logo-no-background-grey-large-cool-logos-with.png"
          alt="Logo"
          className="w-20 h-20"
        />
        <button className="text-white hover:border-b border-white">
          Points
        </button>
        

      </div>
  

      {/* Right section */}
      <button className="text-white hover:text-gray-300 absolute right-8 max-md:hidden">
        Login
      </button>
    </nav>


  );
}

export default Navbar;
