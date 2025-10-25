import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

function Auth() {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const [registered, setRegistered] = useState(false);
  return (
    <div className="@container  relative overflow-hidden bg-[url('/images/wallpaperflare.com_wallpaper(5).jpg')]  bg-cover bg-no-repeat bg-center h-screen flex items-center justify-center space-y-10 xl:flex-row xl:space-x-150 xl:justify-center xl:items-center">
      {registered ? (
     <Login hovered= {hovered} setHovered={setHovered} active={active} setActive={setActive} setRegistered={setRegistered}  />
      ) : (
        <Register hovered= {hovered} setHovered={setHovered} active={active} setActive={setActive} setRegistered={setRegistered}  />

      )}
    </div>
  );
}

export default Auth;
