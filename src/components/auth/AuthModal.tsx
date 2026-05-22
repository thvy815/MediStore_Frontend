import { useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import VerifyEmailModal from "./VerifyMailModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import ResetPasswordModal from "./ResetPasswordModal";

type AuthStep =
  | "login"
  | "register"
  | "verify"
  | "forgot"
  | "reset";

const AuthModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState<AuthStep>("login");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      
      {step === "login" && (
        <LoginModal
          onClose={onClose}
          onOpenRegister={() => setStep("register")}
          onOpenForgot={() => setStep("forgot")}
        />
      )}

      {step === "register" && (
        <RegisterModal
          onClose={onClose}
          onOpenLogin={() => setStep("login")}
          onSuccess={(email) => {
            setEmail(email);
            setStep("verify");
          }}
        />
      )}

      {step === "verify" && (
        <VerifyEmailModal
          email={email}
          onBackToRegister={() => setStep("register")}
          onBackToLogin={() => setStep("login")}
        />
      )}

      {step === "forgot" && (
        <ForgotPasswordModal
          onBack={() => setStep("login")}
          onSuccess={(token) => {
            setResetToken(token);
            setStep("reset");
          }}
        />
      )}

      {step === "reset" && (
        <ResetPasswordModal
          token={resetToken}
          onBack={() => setStep("login")}
        />
      )}
    </div>
  );
};

export default AuthModal;