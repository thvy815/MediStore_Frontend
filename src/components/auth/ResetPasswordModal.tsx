import { useState } from "react";

import {
  ArrowLeft,
  Lock,
} from "lucide-react";

import { authService } from "@/services/authService";

interface Props {
  token: string;
  onBack: () => void;
}

const ResetPasswordModal = ({
  token,
  onBack,
}: Props) => {
  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await authService.resetPassword({
        token,
        newPassword: password,
      });

      setSuccess(
        "Password updated successfully"
      );

      setTimeout(() => {
        onBack(); 
      }, 1500);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Reset password failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl w-[420px] shadow-xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <button onClick={onBack}>
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </button>

        <h2 className="text-xl font-semibold text-green-700">
          Reset Password
        </h2>
      </div>

      {/* Password */}
      <div className="relative mb-4">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="password"
          placeholder="New password"
          className="w-full border rounded-lg pl-10 pr-4 py-2"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />
      </div>

      {/* Confirm Password */}
      <div className="relative mb-4">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="password"
          placeholder="Confirm password"
          className="w-full border rounded-lg pl-10 pr-4 py-2"
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-2">
          {error}
        </p>
      )}

      {success && (
        <p className="text-green-500 text-sm mb-2">
          {success}
        </p>
      )}

      <button
        onClick={handleResetPassword}
        disabled={loading}
        className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-full"
      >
        {loading
          ? "Updating..."
          : "Update Password"}
      </button>
    </div>
  );
};

export default ResetPasswordModal;