import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, X, Phone } from "lucide-react";
import ForgotPasswordModal from "./ForgotPasswordModal";

interface Props {
  onClose: () => void;
  onOpenRegister: () => void;
}

const LoginModal = ({ onClose, onOpenRegister }: Props) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<"email" | "phone">("email");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLogin = async () => {
    setError("");
    setSuccess("");
    try {
      setLoading(true);
      const loggedUser = await login({ identifier, password }, rememberMe);
      setSuccess("Login successful!");
      setTimeout(() => {
        onClose();
        const isAdmin = loggedUser.roles?.includes("ADMIN");
        if (isAdmin) {
          navigate("/dashboard/medicines", { replace: true });
        } else {
          navigate("/customer/home", { replace: true });
        }
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <ForgotPasswordModal
        onBack={() =>
          setShowForgotPassword(false)
        }
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl w-[420px] shadow-xl p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-green-700">Login</h2>
        <button onClick={onClose}>
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
        <button
          onClick={() => setTab("email")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${
            tab === "email" ? "bg-white text-green-700 shadow" : "text-gray-500"
          }`}
        >
          Email
        </button>
        <button
          onClick={() => setTab("phone")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${
            tab === "phone" ? "bg-white text-green-700 shadow" : "text-gray-500"
          }`}
        >
          Phone
        </button>
      </div>

      {/* Identifier */}
      <label className="text-sm font-medium text-gray-700">
        {tab === "email" ? "Email" : "Phone"} <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-1 mb-3">
        {tab === "email" ? (
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        ) : (
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        )}  
        <input
          required
          className="w-full border rounded-lg pl-10 pr-4 py-2"
          placeholder={tab === "email" ? "example@email.com" : "123-456-7890"}
          onChange={(e) => setIdentifier(e.target.value)}
        />
      </div>

      {/* Password */}
      <label className="text-sm font-medium text-gray-700">
        Password <span className="text-red-500">*</span>
      </label>
      <div className="relative mb-3">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          required
          type="password"
          className="w-full border rounded-lg pl-10 pr-4 py-2"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center text-sm mb-4">
        {/* Remember */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember me
        </label>

        {/* Forgot Password */}
        <span 
          onClick={() => setShowForgotPassword(true)}
          className="text-green-600 cursor-pointer"
        >
          Forgot password?
        </span>
      </div>

      {/* Error/Success Messages */}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-full font-medium disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <span 
          onClick={onOpenRegister}
          className="text-green-600 cursor-pointer">
          Register now
        </span>
      </p>
    </div>
  );
};

export default LoginModal;
