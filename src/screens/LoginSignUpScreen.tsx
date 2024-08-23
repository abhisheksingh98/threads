import { useState } from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import SignupForm from "../components/SignUpForm/SignUpForm";
import HomeScreen from "./HomeScreen";

const LoginSignUpScreen = () => {
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(true);

  const toggleForm = () => {
    setIsLoginFormOpen((prevState) => !prevState);
  };

  return (
    <HomeScreen>
      {isLoginFormOpen ? (
        <LoginForm toggleForm={toggleForm} />
      ) : (
        <SignupForm toggleForm={toggleForm} />
      )}
    </HomeScreen>
  );
};

export default LoginSignUpScreen;
