import { useState, useEffect, useContext } from "react";
import { UserContext, AuthContext } from "@/context/Contexts";
import type { User } from "../../types/user.types";

interface ErrorDetails {
  message: string;
}

const useUser = () => {
  const { user, setUser } = useContext(UserContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/home`,
          {
            method: "GET",
            headers: { token: localStorage.token },
          },
        );

        if (!response.ok) {
          const errorDetails: ErrorDetails = await response.json();
          setError(errorDetails.message);
          return;
        } else {
          const userData: User = await response.json();
          setUser(userData);
        }
      } catch (error) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [setUser, isAuthenticated]);

  return { user, setUser, loading, error };
};

export default useUser;
