import React, { useState } from "react";
import useEditUser from "@/hooks/Profile/useEditUser";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import useUser from "@/hooks/auth/useUser";
import { Input } from "../ui/input";

const UpdatePasswordForm: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { updatePassword, loading, error } = useEditUser();
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("User not found.");
      return;
    }

    const result = await updatePassword(
      user,
      currentPassword,
      newPassword,
      confirmNewPassword,
    );

    if (result.success) {
      alert("Password updated successfully!");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Password</DialogTitle>
        <DialogDescription>
          Please fill out the fields below to update your password.
        </DialogDescription>
      </DialogHeader>
      <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
        <Input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="px-2.5 py-1.5 rounded-lg border bg-white focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-green hover:ring-green hover:outline-none hover:ring-1 hover:ring-offset-2 transition-all"
          required
        />
        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="px-2.5 py-1.5 rounded-lg border bg-white focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-green hover:ring-green hover:outline-none hover:ring-1 hover:ring-offset-2 transition-all"
          required
        />
        <Input
          type="password"
          placeholder="Confirm New Password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="px-2.5 py-1.5 rounded-lg border bg-white focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-green hover:ring-green hover:outline-none hover:ring-1 hover:ring-offset-2 transition-all"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-white text-green py-2 rounded-lg hover:bg-green hover:text-white transition-all disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </DialogContent>
  );
};

export default UpdatePasswordForm;
