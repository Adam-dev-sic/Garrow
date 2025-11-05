import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const [registered, setRegistered] = useState(true);
  const { userData } = useUserStore();
  const navigate = useNavigate();

  return (
    <div className="@container animate-fade-in relative overflow-hidden bg-[url('/images/spiderman.jpg')]  bg-cover bg-no-repeat bg-center h-screen flex items-center justify-center space-y-10 xl:flex-row xl:space-x-150 xl:justify-center xl:items-center">
      {userData && userData.email ? (
        <div className="text-white">
          <h1>You are already logged in {userData.name}</h1>
          <button
            onClick={() => navigate("/tasks")}
            className="bg-[#343536] w-full h-10 rounded-lg z-10 hover:bg-[#493f33] mt-3"
          >
            Go to Tasks
          </button>
        </div>
      ) : registered ? (
        <Login
          hovered={hovered}
          setHovered={setHovered}
          active={active}
          setActive={setActive}
          setRegistered={setRegistered}
        />
      ) : (
        <Register
          hovered={hovered}
          setHovered={setHovered}
          active={active}
          setActive={setActive}
          setRegistered={setRegistered}
        />
      )}
    </div>
  );
}

export default Auth;
