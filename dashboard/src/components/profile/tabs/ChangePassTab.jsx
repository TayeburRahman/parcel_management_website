"use client"
import { PiEyeLight, PiEyeSlash } from "react-icons/pi"
import { Lock, Shield, Key } from "lucide-react"
import InputField from "@/components/helper/input-helper/InputField"

const ChangePassTab = ({
  onSubmit,
  register,
  errors,
  setShowCurrentPassword,
  showCurrentPassword,
  setShowNewPassword,
  showNewPassword,
  setShowConfirmPassword,
  showConfirmPassword,
  watch,
}) => {
  return (
    <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
      {/* Form Content */}
      <form onSubmit={onSubmit} className="p-6 space-y-6">
        {/* Current Password */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Lock className="h-4 w-4 text-primary" />
            Current Password
          </label>
          <div className="relative">
            <InputField
              name="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter your current password"
              register={register}
              errors={errors}
              disabled={true}   
              validation={{ required: "Current Password is required" }}
            />
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Key className="h-4 w-4 text-primary" />
            New Password
          </label>
          <div className="relative">
            <InputField
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter your new password"
              register={register}
              errors={errors}
              disabled={true}   
              validation={{
                required: "New Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
            />
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            Confirm New Password
          </label>
          <div className="relative">
            <InputField
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              register={register}
              errors={errors}
              disabled={true}   
              validation={{
                required: "Confirm New Password is required",
                validate: (value) => value === watch("newPassword") || "Passwords do not match",
              }}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled    
            className="w-full bg-gray-400 cursor-not-allowed py-2 px-6 rounded-sm text-xs font-semibold flex items-center justify-center gap-2"
          >
            <Shield className="w-3 h-3" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassTab
