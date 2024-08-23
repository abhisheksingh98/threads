import React from "react";
import Sheet from "../../ui-lib/Sheet";
import Input from "../../ui-lib/Input";

const LoginForm = ({ toggleForm }: { toggleForm: () => void }) => {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center w-full h-full bg-black">
      <Sheet heading="Welcome" subheading="Log into your account">
        <form className="w-full" onSubmit={handleLogin}>
          <div className="w-full mt-5">
            <Input
              label="Email"
              type="email"
              id="email"
              placeholder="Enter your email or username"
              ref={emailRef}
            />

            <Input
              label="Password"
              type="password"
              id="password"
              placeholder="Enter your password"
              helperLabel="Forgot your password?"
              ref={passwordRef}
            />
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded"
            >
              Login Now
            </button>

            <div className="flex mt-3 space-x-2 text-gray-500 text-md">
              <p>Not registered yet? </p>
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
