import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sheet from "../../ui-lib/Sheet";
import Input from "../../ui-lib/Input";
import useAuthState from "../../hooks/useAuthState";

const LoginForm = ({ toggleForm }: { toggleForm: () => void }) => {
  const { loginUser } = useAuthState();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    loginUser(email);
    navigate("/posts");
  };

  return (
    <div className="flex items-center justify-center w-full h-full bg-black">
      <Sheet heading="WELCOME BACK" subheading="Log into your account">
        <form className="w-full" onSubmit={handleLogin}>
          <div className="w-full mt-5">
            <Input
              label="Email"
              type="email"
              id="email"
              placeholder="Enter your email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              id="password"
              placeholder="Enter your password"
              helperLabel="Forgot your password?"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              type="submit"
              className={`w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded ${
                !email || !password ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!email || !password}
            >
              Login Now
            </button>

            <div className="flex mt-3 space-x-2 text-gray-500 text-md">
              <p>Not registered yet?</p>
              <p
                className="cursor-pointer text-input-label-primary"
                onClick={toggleForm}
              >
                Register &#8594;
              </p>
            </div>
          </div>
        </form>
      </Sheet>
    </div>
  );
};

export default LoginForm;
