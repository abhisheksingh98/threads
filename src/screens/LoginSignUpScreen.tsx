import { useState } from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import SignupForm from "../components/SignUpForm/SignUpForm";

const LoginSignUpScreen = () => {
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(true);

  const toggleForm = () => {
    setIsLoginFormOpen((prevState) => !prevState);
  };

  return isLoginFormOpen ? (
    <LoginForm toggleForm={toggleForm} />
  ) : (
    <SignupForm toggleForm={toggleForm} />
  );
};

export default LoginSignUpScreen;
