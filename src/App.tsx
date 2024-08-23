import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginSignUpScreen from "./screens/LoginSignUpScreen";
import ThreadScreen from "./screens/ThreadScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginSignUpScreen />,
  },
  {
    path: "/threads",
    element: <ThreadScreen />,
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
