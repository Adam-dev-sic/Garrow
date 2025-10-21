import { createBrowserRouter } from "react-router-dom";

import Home from "./views/Home";
import Tasks from "./views/Tasks";
import Points from "./views/Points";
import Login from "./views/Login";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "tasks", element: <Tasks /> },
      { path: "points", element: <Points /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);
