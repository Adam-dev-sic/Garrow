import { createBrowserRouter } from "react-router-dom";

import Home from "./views/Home";
import Tasks from "./views/Tasks";
import Points from "./views/Points";
import Auth from "./views/Auth";
import App from "./App";
import Mylove from "./views/Mylove";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "goals", element: <Tasks /> },
      { path: "points", element: <Points /> },
      { path: "/auth", element: <Auth /> },
      { path: "lily", element: <Mylove /> },
    ],
  },
]);
