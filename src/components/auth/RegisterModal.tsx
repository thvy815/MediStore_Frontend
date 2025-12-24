import { useState } from "react";
import { authService } from "@/services/authService";
import { User, Mail, Phone, Lock, X } from "lucide-react";

interface Props {
  onClose: () => void;
  onOpenLogin: () => void;
}

const RegisterModal = ({ onClose, onOpenLogin }: Props) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await authService.register(form);
      onOpenLogin();
    } catch (err: any) {
      setError(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl w-[420px] shadow-xl p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-green-700">Create Account</h2>
        <button onClick={onClose}>
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="space-y-4">
          <Input
            label="Full Name"
            required
            name="fullName"
            placeholder="Enter your full name"
            icon={<User size={18} />}
            onChange={handleChange}
          />

          <Input
            label="Email"
            required
            name="email"
            placeholder="example@email.com"
            icon={<Mail size={18} />}
            onChange={handleChange}
          />

          <Input
            label="Phone Number"
            required
            name="phone"
            placeholder="0123456789"
            icon={<Phone size={18} />}
            onChange={handleChange}
          />

          <Input
            label="Password"
            required
            type="password"
            name="password"
            placeholder="Enter password"
            icon={<Lock size={18} />}
            onChange={handleChange}
          />

          <Input
            label="Confirm Password"
            required
            type="password"
            name="confirmPassword"
            placeholder="Re-enter password"
            icon={<Lock size={18} />}
            onChange={handleChange}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-full font-medium"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <span
            onClick={onOpenLogin}
            className="text-green-600 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
}

const Input = ({ label, required, icon, ...props }: InputProps) => (
  <div>
    {/* Label */}
    <label className="text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>

    {/* Input */}
    <div className="relative mt-1">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
      <input
        {...props}
        required={required}
        className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  </div>
);

export default RegisterModal;
