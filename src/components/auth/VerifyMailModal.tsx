import { Mail, ArrowLeft } from "lucide-react";

interface Props {
  email: string;
  onBack: () => void;
}

const VerifyEmailModal = ({
  email,
  onBack,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl w-[420px] shadow-xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <button onClick={onBack}>
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </button>

        <h2 className="text-xl font-semibold text-green-700">
          Verify Email
        </h2>
      </div>

      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="bg-green-100 p-4 rounded-full">
          <Mail className="w-10 h-10 text-green-700" />
        </div>
      </div>

      <h3 className="text-center text-lg font-semibold mb-2">
        Check your email
      </h3>

      <p className="text-center text-gray-600 text-sm leading-relaxed">
        We sent a verification link to:
      </p>

      <p className="text-center font-medium text-green-700 mt-2">
        {email}
      </p>

      <p className="text-center text-gray-500 text-sm mt-4">
        Please verify your account before logging in.
      </p>

      <button
        onClick={onBack}
        className="w-full mt-6 bg-green-700 hover:bg-green-800 text-white py-2 rounded-full"
      >
        Back to Login
      </button>
    </div>
  );
};

export default VerifyEmailModal;