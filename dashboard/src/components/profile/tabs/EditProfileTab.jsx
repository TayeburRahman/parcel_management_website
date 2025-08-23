"use client"

import React from "react"
import { User, Mail, Phone, MapPin, Save } from 'lucide-react'
import InputField from "@/components/helper/input-helper/InputField"

const EditProfileTab = ({ onSubmit, register, errors }) => {
    return (
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden ">
            {/* Form Content */}
            <form onSubmit={onSubmit} className="p-4 space-y-6 ">
                <div className="h-[calc(100vh-430px)] overflow-auto scrl-hide p-2">
                    {/* Personal Information Section */}
                    <div className="space-y-4 ">
                        <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4">
                            <div className="w-5 h-5 bg-gradient-to-r from-primary to-primary/80 rounded-sm flex items-center justify-center">
                                <User className="w-3 h-3 text-white" />
                            </div>
                            Personal Information
                        </h4>

                        {/* User Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <User className="h-4 w-4 text-primary" />
                                User Name
                            </label>
                            <InputField
                                name="userName"
                                placeholder="Enter your full name"
                                register={register}
                                errors={errors}
                                validation={{ required: "User Name is required" }}
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary" />
                                Email Address
                            </label>
                            <div className="relative">
                                <InputField
                                    name="email"
                                    type="email"
                                    placeholder="your.email@example.com"
                                    register={register}
                                    errors={errors}
                                    disabled={true}
                                    validation={{
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: "Invalid email address",
                                        },
                                    }}
                                />
                                {/* Disabled indicator */}
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                Email cannot be changed for security reasons
                            </p>
                        </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4">
                            <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-sm flex items-center justify-center">
                                <Phone className="w-3 h-3 text-white" />
                            </div>
                            Contact Information
                        </h4>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary" />
                                Contact Number
                            </label>
                            <InputField
                                name="phone"
                                placeholder="Enter your phone number"
                                register={register}
                                errors={errors}
                                validation={{
                                    pattern: {
                                        value: /^[0-9]{10,15}$/,
                                        message: "Invalid phone number",
                                    },
                                }}
                            />
                        </div>

                        {/* Address */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                Street Address
                            </label>
                            <InputField
                                name="street"
                                placeholder="Enter your street address"
                                register={register}
                                errors={errors}
                            />
                        </div>
                    </div>

                </div>
                {/* Submit Button */}
                <div className="pt-4 border-t border-gray-200">
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white text-xs py-2 px-6 rounded-xs font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                        <Save className="w-3 h-3" />
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditProfileTab
