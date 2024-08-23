import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginSignUpScreen from "./screens/LoginSignUpScreen";
import ThreadScreen from "./screens/ThreadScreen";
import HomeScreen from "./screens/HomeScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <HomeScreen>
        <LoginSignUpScreen />
      </HomeScreen>
    ),
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
