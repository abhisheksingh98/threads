import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./screens/LoginScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
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
