import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginSignUpScreen from "./screens/LoginSignUpScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginSignUpScreen />,
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
