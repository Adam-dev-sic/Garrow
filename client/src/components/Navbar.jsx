// src/components/Navbar.jsx
import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { useMediaQuery } from "react-responsive";
import { apiFetch } from "../utils/api";

function Navbar() {
  const { userData, fetchUserData } = useUserStore();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

        {!isMobile ? (
          <Link to={"points"}>
            <button className="cursor-pointer text-white hover:border-b border-white">
              Points
            </button>
          </Link>
        ) : null}

        {/* Right section (User Menu / Login) */}
        <div className="absolute bottom-10 right-8" ref={menuRef}>
          {userData && userData.email ? (
            <>
              {/* Username button */}
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="cursor-pointer text-white hover:text-gray-300"
              >
                {userData?.name}
              </button>

              {/* Dropdown menu */}
              <div
                className={`absolute right-0 mt-2 w-40 bg-[#181818] border border-gray-600 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                  menuOpen
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 -translate-y-2 invisible"
                }`}
              >
                <Link
                  to="/"
                  className="block px-4 py-2 text-white hover:bg-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
                {isMobile && (
                  <Link
                    to="/points"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    Points
                  </Link>
                )}
                <button
                  onClick={async () => {
                    try {
                      const response = await apiFetch("/api/auth/logout", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                      });

                      fetchUserData();
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link to={"/auth"}>
              <button className="cursor-pointer text-white hover:text-gray-300">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
