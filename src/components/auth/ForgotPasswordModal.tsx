import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";

import { authService } from "@/services/authService";

interface Props {
  onBack: () => void;
  onSuccess: (token: string) => void;
}

const ForgotPasswordModal = ({onBack, onSuccess}: Props) => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] = useState("");

  const handleForgotPassword = async () => {
    try {
      setLoading(true);

      await authService.forgotPassword({ email });

      setSuccess(
        "Password reset email has been sent. Please check your inbox."
      );
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to send email"
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
          Forgot Password
        </h2>
      </div>

      <p className="text-gray-600 text-sm mb-4">
        Enter your email to receive a reset
        password link.
      </p>

      <div className="relative mb-4">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="email"
          placeholder="example@email.com"
          className="w-full border rounded-lg pl-10 pr-4 py-2"
          onChange={(e) =>
            setEmail(e.target.value)
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
        onClick={handleForgotPassword}
        disabled={loading}
        className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-full"
      >
        {loading
          ? "Sending..."
          : "Send Reset Link"}
      </button>
    </div>
  );
};

export default ForgotPasswordModal;