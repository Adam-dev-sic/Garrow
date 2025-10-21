import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import Tasks from "./views/Tasks";
import Points from "./views/Points";
import Login from "./views/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Points/>
    </>
  );
}

export default App;
