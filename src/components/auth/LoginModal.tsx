import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, X } from "lucide-react";

interface Props {
  onClose: () => void;
  onOpenRegister: () => void;
}

const LoginModal = ({ onClose, onOpenRegister }: Props) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<"email" | "phone">("email");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setSuccess("");
    try {
      setLoading(true);
      const loggedUser = await login({ email, password });
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

      {/* Email */}
      <label className="text-sm font-medium text-gray-700">
        Email <span className="text-red-500">*</span>
      </label>
      <div className="relative mt-1 mb-3">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          required
          className="w-full border rounded-lg pl-10 pr-4 py-2"
          placeholder="example@email.com"
          onChange={(e) => setEmail(e.target.value)}
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

      {/* Remember */}
      <div className="flex justify-between items-center text-sm mb-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Remember me
        </label>
        <span className="text-green-600 cursor-pointer">
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
