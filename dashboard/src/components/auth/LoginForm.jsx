"use client";

import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi"; 
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { Mail, Lock } from "lucide-react";
import InputField from "@/components/helper/input-helper/InputField";
import { SuccessToast } from "@/helper/ValidationHelper";
import { useDispatch } from "react-redux";
import { SetForgotError } from "@/redux/features/auth/authSlice";

const LoginFormContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
 const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data).unwrap();
      SuccessToast("Login successful!");
      setTimeout(() => router.push(redirect), 300);
    } catch (err) {
      const message = err?.data?.message || "Something went wrong";
      dispatch(SetForgotError(message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Login
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Please enter your email and password to continue
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
              <Mail className="h-3 w-3 text-primary" />
              Email Address
            </label>
            <InputField
              name="email"
              type="email"
              placeholder="user@example.com"
              register={register}
              errors={errors}
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              }}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
              <Lock className="h-3 w-3 text-primary" />
              Password
            </label>
            <div className="relative">
              <InputField
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                register={register}
                errors={errors}
                validation={{ required: "Password is required" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                {showPassword ? (
                  <PiEyeLight className="h-4 w-4 text-primary" />
                ) : (
                  <PiEyeSlash className="h-4 w-4 text-primary" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4 text-xs">
            <Link href="/auth/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors duration-300"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

const LoginForm = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LoginFormContent />
  </Suspense>
);

export default LoginForm;
