"use client"

import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { X, Building2, Mail, MapPin, Users, Factory, Upload, Plus } from 'lucide-react'
import InputField from "@/components/helper/input-helper/InputField"
import SelectField from "@/components/helper/select-helper/SelectField"

const AddClientModal = ({ addModal, setAddModal }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (!addModal) reset()
  }, [addModal, reset])

  if (!addModal) return null

  const onSubmit = (data) => {
    console.log(data)
    setAddModal(false)
    reset()
  }

  const statusOptions = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
  ]

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-lg w-full max-w-lg mx-auto shadow-2xl relative animate-in zoom-in-95 duration-300 overflow-hidden max-h-[600px] flex flex-col">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-4 text-white flex-shrink-0">
          <button
            onClick={() => setAddModal(false)}
            className="absolute top-2 right-2 text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-full transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-center pt-1">
            <div className="w-12 h-12 bg-white/20 rounded-sm flex items-center justify-center mx-auto mb-2">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold">Add New Client</h2>
            <p className="text-xs text-white/90 mt-1">Create a new client company profile</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
            {/* Company Information Section */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-800 flex items-center gap-2 mb-3">
                <div className="w-5 h-5 bg-gradient-to-r from-primary to-primary/80 rounded-sm flex items-center justify-center">
                  <Building2 className="w-3 h-3 text-white" />
                </div>
                Company Information
              </h3>

              {/* Company Name */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                  <Building2 className="h-3 w-3 text-primary" />
                  Company Name
                </label>
                <InputField
                  name="companyName"
                  placeholder="Enter company name"
                  register={register}
                  errors={errors}
                  validation={{ required: "Company name is required" }}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                  <Mail className="h-3 w-3 text-primary" />
                  Email Address
                </label>
                <InputField
                  name="companyEmail"
                  type="email"
                  placeholder="company@example.com"
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

              {/* Address */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-primary" />
                  Address
                </label>
                <InputField
                  name="companyAddress"
                  placeholder="Street, City, Country"
                  register={register}
                  errors={errors}
                />
              </div>
            </div>

            {/* Business Details Section */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <h3 className="text-xs font-bold text-gray-800 flex items-center gap-2 mb-3">
                <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-sm flex items-center justify-center">
                  <Factory className="w-3 h-3 text-white" />
                </div>
                Business Details
              </h3>

              {/* Plants and Employees */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                    <Factory className="h-3 w-3 text-primary" />
                    Plants
                  </label>
                  <InputField
                    name="plants"
                    type="number"
                    placeholder="0"
                    register={register}
                    errors={errors}
                    validation={{ min: { value: 0, message: "Must be 0 or greater" } }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                    <Users className="h-3 w-3 text-primary" />
                    Employees
                  </label>
                  <InputField
                    name="activeEmployees"
                    type="number"
                    placeholder="0"
                    register={register}
                    errors={errors}
                    validation={{ min: { value: 0, message: "Must be 0 or greater" } }}
                  />
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                  <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Status
                </label>
                <SelectField
                  name="status"
                  options={statusOptions}
                  register={register}
                  defaultOption="Select status"
                  error={errors.status}
                />
              </div>
            </div>

            {/* Logo Upload Section */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <h3 className="text-xs font-bold text-gray-800 flex items-center gap-2 mb-3">
                <div className="w-5 h-5 bg-gradient-to-r from-orange-500 to-red-600 rounded-sm flex items-center justify-center">
                  <Upload className="w-3 h-3 text-white" />
                </div>
                Company Logo
              </h3>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                  <Upload className="h-3 w-3 text-primary" />
                  Logo Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-sm p-4 text-center cursor-pointer hover:bg-gray-50 hover:border-primary/50 transition-all group">
                  <input
                    type="file"
                    {...register("companyPhoto")}
                    className="hidden"
                    id="logo-upload"
                    accept="image/*"
                  />
                  <label htmlFor="logo-upload" className="flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                      <Upload className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-gray-600 text-xs font-medium">Click to upload logo</span>
                    <span className="text-gray-400 text-xs mt-1">PNG, JPG up to 5MB</span>
                  </label>
                </div>
                {errors.companyPhoto && (
                  <p className="text-xs text-red-500 mt-1">{errors.companyPhoto.message}</p>
                )}
              </div>
            </div>

            {/* Info Section */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-sm p-3 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium text-blue-700">Client Information</span>
              </div>
              <p className="text-xs text-blue-600 leading-relaxed">
                All fields marked with * are required. Make sure to provide accurate information for better service
                delivery and communication.
              </p>
            </div>
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setAddModal(false)}
              className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-sm text-xs font-medium hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white px-4 py-2 rounded-sm text-xs font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Add Client
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddClientModal
