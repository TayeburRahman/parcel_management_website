"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { SetChangePasswordError } from "@/redux/features/auth/authSlice";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { SuccessToast } from "@/helper/ValidationHelper";

const ResetPasswordForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  const [resetPassword] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("newPassword", "");

  useEffect(() => {
    const storedEmail =
      localStorage.getItem("forgot_email") ||
      localStorage.getItem("verify_email") ||
      "";
    if (!storedEmail) {
      toast.error("No email found. Please try again.");
      router.push("/auth/forgot-password");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  const onSubmit = async (data) => {
    if (!email) return;
    setIsSubmitting(true);

    try {
      await resetPassword({ email, ...data }).unwrap();
      SuccessToast("Password reset successfully!");
    } catch (err) {
      const message = err?.data?.message || "Something went wrong";
      if (message === "password is incorrect") {
        dispatch(SetChangePasswordError("Wrong Current Password"));
      } else {
        dispatch(SetChangePasswordError(message));
      }
      toast.error(message);
    } finally {
      setIsSubmitting(false);
      localStorage.removeItem("forgot_email");
      localStorage.removeItem("verify_email");
      setTimeout(() => router.push("/auth/login"), 300);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Set a New Password
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Create a new password. Make sure it’s different from previous ones.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full px-3 py-2 border text-gray-800 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3D2C]/70 ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                }`}
                {...register("newPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <PiEyeLight className="h-4 w-4 text-gray-700" />
                ) : (
                  <PiEyeSlash className="h-4 w-4 text-gray-700" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-xs text-red-500">{errors.newPassword.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full px-3 py-2 border text-gray-800 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3D2C]/70 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <PiEyeLight className="h-4 w-4 text-gray-700" />
                ) : (
                  <PiEyeSlash className="h-4 w-4 text-gray-700" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Reset Password"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Remembered your password?{" "}
          <a
            href="/auth/login"
            className="text-[#1F3D2C] font-medium hover:underline"
          >
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
