import { useEffect, useState } from "react";

const useAuthState = () => {
  const [user, setUser] = useState<string | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const loginUser = (user: string) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return { user, loginUser };
};

export default useAuthState;
