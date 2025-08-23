"use client";

import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import {
  Mail,
  MapPin,
  Users,
  Upload,
  Lock,
  Phone,
  User,
} from "lucide-react";
import InputField from "@/components/helper/input-helper/InputField";

const RegisterFormContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);

  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("address", data.address);
    formData.append("phone_number", data.phone_number);
    formData.append("role", "CUSTOMERS");

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      const res = await registerUser(formData).unwrap();
      toast.success("Registration Successful!");
      setTimeout(() => router.push(redirect), 300);
    } catch (err) {
      const message = err?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  // Watch image field for preview
  const imageFile = watch("image");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Register
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Create a new account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          {/* Customer Information Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-800 flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-gradient-to-r from-primary to-primary/80 rounded-sm flex items-center justify-center">
                <Users className="w-3 h-3 text-white" />
              </div>
              Customer Information
            </h3>

            {/* User Name */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                <User className="h-3 w-3 text-primary" />
                User Name
              </label>
              <InputField
                name="name"
                placeholder="Enter user name"
                register={register}
                errors={errors}
                validation={{ required: "User name is required" }}
              />
            </div>

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
                    value:
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
              <InputField
                name="password"
                type="password"
                placeholder="Enter password"
                register={register}
                errors={errors}
                validation={{ required: "Password is required" }}
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                <Lock className="h-3 w-3 text-primary" />
                Confirm Password
              </label>
              <InputField
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                register={register}
                errors={errors}
                validation={{
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                }}
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                <Phone className="h-3 w-3 text-primary" />
                Phone Number
              </label>
              <InputField
                name="phone_number"
                placeholder="Enter phone number"
                register={register}
                errors={errors}
                validation={{ required: "Phone number is required" }}
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                <MapPin className="h-3 w-3 text-primary" />
                Address
              </label>
              <InputField
                name="address"
                placeholder="Street, City, Country"
                register={register}
                errors={errors}
                validation={{ required: "Address is required" }}
              />
            </div>

            {/* Photo Upload */}
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
              <Upload className="h-3 w-3 text-primary" />
              Photo
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-sm p-4 text-center cursor-pointer hover:bg-gray-50 hover:border-primary/50 transition-all group">
              <input
                type="file"
                {...register("image", { required: "Image is required" })}
                className="hidden"
                id="logo-upload"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length > 0) {
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
              <label
                htmlFor="logo-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                  <Upload className="h-4 w-4 text-primary" />
                </div>
                <span className="text-gray-600 text-xs font-medium">
                  Click to upload photo
                </span>
                <span className="text-gray-400 text-xs mt-1">
                  PNG, JPG up to 5MB
                </span>
              </label>
            </div>
            {errors.image && (
              <p className="text-xs text-red-500 mt-1">
                {errors.image.message}
              </p>
            )}

            {/* Show Preview */}
            {preview && (
              <div className="mt-3">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-md border border-gray-200"
                />
                <p className="text-xs text-gray-600 mt-1">
                  {imageFile && imageFile[0]?.name}
                </p>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

const RegisterForm = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <RegisterFormContent />
  </Suspense>
);

export default RegisterForm;
