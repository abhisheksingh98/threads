import React, { useState } from "react";
import Sheet from "../../ui-lib/Sheet";
import Input from "../../ui-lib/Input";

const SignupForm = ({ toggleForm }: { toggleForm: () => void }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validateUsername = (username: string) => {
    const re = /^[a-zA-Z0-9_]{3,20}$/;
    return re.test(username);
  };

  const validatePassword = (password: string) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !username || !password) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validateUsername(username)) {
      setError(
        "Username must be 3-20 characters long and can only contain letters, numbers, and underscores."
      );
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long, include 1 uppercase, 1 lowercase, 1 number, and 1 special character."
      );
      return;
    }

    console.log({ email, username, password });
    // Proceed with signup
  };

  return (
    <div className="flex items-center justify-center w-full h-full bg-black">
      <Sheet heading="SIGN UP" subheading="Create an account to continue">
        <form
          className="flex flex-col w-full mt-5 mb-5"
          onSubmit={handleSubmit}
        >
          <Input
            label="Email"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Username"
            type="text"
            id="username"
            placeholder="Choose a preferred username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            id="password"
            placeholder="Choose a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className={`w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded ${
              !email || !username || !password
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={!email || !username || !password}
          >
            Continue
          </button>

          <div className="flex mt-3 space-x-2 text-gray-500 text-md">
            <p>Already have an account?</p>
            <p
              className="cursor-pointer text-input-label-primary"
              onClick={toggleForm}
            >
              Login &#8594;
            </p>
          </div>
        </form>
      </Sheet>
    </div>
  );
};

export default SignupForm;
