"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
 
import { SetForgotError } from "@/redux/features/auth/authSlice";
import { useForgotPasswordSendOtpMutation } from "@/redux/features/auth/authApi";
import { SuccessToast } from "@/helper/ValidationHelper";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [forgotPasswordSendOtp] = useForgotPasswordSendOtpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // API কল
      await forgotPasswordSendOtp({ email: data.email }).unwrap();
       SuccessToast("OTP sent successfully, Please check your email!"); 
      router.push("/auth/verify-email?mode=forgot-password");
    } catch (err) {
      const message =
        err?.data?.message || "Something went wrong while sending OTP";

      if (
        message === "Cannot read properties of null (reading 'email')" ||
        message === "Couldn't find this email address"
      ) {
        dispatch(SetForgotError("Couldn't find this email address")); 
      } else {
        dispatch(SetForgotError(message));
        toast.error(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Forgot Password?
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Enter your email address below and we’ll send you a verification code.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className={`w-full px-3 py-2 border text-gray-800 text-sm bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3D2C]/70 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors duration-300"
          >
            {isSubmitting ? "Sending..." : "Continue"}
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

export default ForgotPasswordForm;
