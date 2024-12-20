import { useState } from "react";
import { User } from "@/types/user.types";

interface UpdateUserResult {
  success: boolean;
  user?: User;
  error?: string | null;
}

const useUpdateUsername = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const newUsername = async (userData: User): Promise<UpdateUserResult> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/profile/?id=${userData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        },
      );

      if (!response.ok) {
        setError(
          "Request to change username failed with status: " + response.status,
        );
        return { success: false, error: error };
      } else {
        const user: User = await response.json();
        return { success: true, user };
      }
    } catch (error) {
      return { success: false, error: "Failed to put username" };
    } finally {
      setLoading(false);
    }
  };

  return { newUsername, loading, error };
};

export default useUpdateUsername;
