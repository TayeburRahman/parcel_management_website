"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { ErrorToast, SuccessToast } from "@/helper/ValidationHelper";
import { SetVerifyAccountOtpError } from "@/redux/features/auth/authSlice";

 
import { 
  useVerifyAccountResendOtpMutation, 
    useForgotPasswordResendOtpMutation, 
  useForgotPasswordVerifyOtpMutation ,
  useVerifyAccountVerifyOtpMutation 
} from "@/redux/features/auth/authApi";
 
 
const VerifyEmailForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
 
  const mode = searchParams.get("mode") || "verify-account";
 
  const [verifyAccountResendOtp] = useVerifyAccountResendOtpMutation();
  const [verifyAccountVerifyOtp] = useVerifyAccountVerifyOtpMutation();

  const [forgotPasswordResendOtp] = useForgotPasswordResendOtpMutation();
  const [forgotPasswordVerifyOtp] = useForgotPasswordVerifyOtpMutation();
 
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
 
  const [email, setEmail] = useState(
    mode === "verify-account"
      ? localStorage.getItem("verify_email") || ""
      : localStorage.getItem("forgot_email") || ""
  );
 
  useEffect(() => {
    if (timer <= 0) return setCanResend(true);
    setCanResend(false);
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    if (/^\d{6}$/.test(pastedData)) {
      setCode(pastedData.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.join("").length !== 6) return;
    setIsSubmitting(true);

    if (!email) {
      toast.error("No email found. Please try again.");
      router.push(mode === "verify-account" ? "/auth/register" : "/auth/forgot-password");
      return;
    }
    console.log("email", email, mode);
    try {
      if (mode === "verify-account") {
        await verifyAccountVerifyOtp({ email, otp: code.join("") }).unwrap();
        SuccessToast("Account verified successfully"); 
        router.push("/");
      }

      if (mode === "forgot-password") {
        await forgotPasswordVerifyOtp({ email, otp: code.join("") }).unwrap();
        SuccessToast("OTP verified, reset your password"); 
        router.push("/auth/reset-password");
      }
    } catch (err) {
      const message = err?.data?.message || "Verification failed"; 
      dispatch(SetVerifyAccountOtpError(message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    try {
      if (!email) {
        toast.error("No email found. Please try again.");
        router.push(mode === "verify-account" ? "/auth/register" : "/auth/forgot-password");
        return;
      }

      if (mode === "verify-account") {
        await verifyAccountResendOtp({ email }).unwrap();
        localStorage.removeItem("verify_email");
      }
      if (mode === "forgot-password") {
        await forgotPasswordResendOtp({ email }).unwrap();
      }

      SuccessToast("OTP resent successfully");
      setTimer(60);
    } catch (err) {
      const message = err?.data?.message || "Failed to resend OTP";
      ErrorToast(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          {mode === "verify-account" ? "Verify Your Email" : "Verify OTP"}
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          We sent a 6-digit code to <span className="font-medium">{email}</span>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1F3D2C]/70"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || code.join("").length !== 6}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors duration-300"
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Didn’t receive the code?{" "}
          <button
            onClick={handleResend}
            disabled={!canResend}
            className={`font-medium ${
              canResend ? "text-[#1F3D2C] hover:underline" : "text-gray-400"
            }`}
          >
            {canResend ? "Resend" : `Resend in ${timer}s`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
