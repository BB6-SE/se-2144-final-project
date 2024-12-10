import { useState } from "react";
import { User } from "@/types/user.types";

interface UpdatePasswordResult {
  user?: User;
  success: boolean;
  error?: string | null;
}

const useEditUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePassword = async (
    userData: User,
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string,
  ): Promise<UpdatePasswordResult> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/profile/password?id=${userData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
            confirmNewPassword,
          }),
        },
      );

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Error updating password:", responseData.message);
        setError(responseData.message || "Failed to update password.");
        return { success: false, error: responseData.message };
      }

      return { success: true, user: responseData.user };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { updatePassword, loading, error };
};

export default useEditUser;
