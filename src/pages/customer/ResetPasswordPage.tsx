import { useNavigate, useSearchParams } from "react-router-dom";

import ResetPasswordModal from "@/components/auth/ResetPasswordModal";

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const [params] = useSearchParams();

  const token = params.get("token");

  if (!token) {
    return (
      <div className="flex justify-center items-center h-screen">
        Invalid token
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <ResetPasswordModal
        token={token}
        onBack={() => navigate("/")}
      />
    </div>
  );
};

export default ResetPasswordPage;