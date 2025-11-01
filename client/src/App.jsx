import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import Tasks from "./views/Tasks";
import Points from "./views/Points";
import { Outlet } from "react-router-dom";
import UserWatcher from "./views/UserWatcher";

function App() {
  return (
    <>
   <UserWatcher/>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
