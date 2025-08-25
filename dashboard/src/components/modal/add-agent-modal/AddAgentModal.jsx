"use client";

import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const AddAgentModal = ({ addAgentModal, setAddAgentModal, onAddAgent, isCreatingAgent }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [previews, setPreviews] = useState([]); 
  useEffect(() => {
    if (!addAgentModal) {
      reset();
      setPreviews([]);
    }
  }, [addAgentModal, reset]);

  if (!addAgentModal) return null;

  const onSubmit = (data) => {
    onAddAgent(data); // Pass raw data to parent
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      setValue("profile_images", files);
      const filePreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(filePreviews);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg mx-auto shadow-2xl relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setAddAgentModal(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-white hover:bg-black/20 p-2 rounded-full transition-all duration-200"
        >
          <X />
        </button>

        <div className="p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">+ Add New Agent</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Name *</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="John Doe"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Email *</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
                placeholder="example@email.com"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password & Confirm */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700">Password *</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                  })}
                  placeholder="••••••••"
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Confirm Password *</label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === document.querySelector('input[name="password"]').value || "Passwords do not match",
                  })}
                  placeholder="••••••••"
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
              <input
                type="text"
                {...register("phone_number")}
                placeholder="+1 234 567 890"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Address</label>
              <input
                type="text"
                {...register("address")}
                placeholder="123 Street, City"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Vehicle Type *</label>
              <select
                {...register("vehicleType", { required: "Vehicle type is required" })}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
              >
                <option value="">Select vehicle</option>
                <option value="bike">Bike</option>
                <option value="car">Car</option>
                <option value="van">Van</option>
                <option value="truck">Truck</option>
                <option value="other">Other</option>
              </select>
              {errors.vehicleType && <p className="text-red-500 text-xs mt-1">{errors.vehicleType.message}</p>}
            </div>

            {/* Profile Images */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Profile Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="mt-2 block w-full text-sm border border-gray-300 rounded-xl cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary file:text-white hover:file:bg-primary-dark"
              />
              {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {previews.map((src, idx) => (
                    <img key={idx} src={src} alt={`Preview ${idx}`} className="w-24 h-24 object-cover rounded-lg shadow" />
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isCreatingAgent}
              className="w-full py-3 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {isCreatingAgent ? "Adding Agent..." : "Add Agent"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAgentModal;
