"use client"

import React from "react"
import { User, Mail, Phone, MapPin, Save } from 'lucide-react'
import InputField from "@/components/helper/input-helper/InputField"

const EditProfileTab = ({ onSubmit, register, errors, user }) => {
    return (
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
            <form onSubmit={onSubmit} className="p-4 space-y-6">
                <div className="h-[calc(100vh-430px)] overflow-auto scrl-hide p-2">
 
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4">
                            <div className="w-5 h-5 bg-gradient-to-r from-primary to-primary/80 rounded-sm flex items-center justify-center">
                                <User className="w-3 h-3 text-white" />
                            </div>
                            Personal Information
                        </h4>
 
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <User className="h-4 w-4 text-primary" />
                                User Name
                            </label>
                            <InputField
                                name="name"
                                placeholder="Enter your full name"
                                register={register}
                                errors={errors}
                                validation={{ required: "User Name is required" }}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                Street Address
                            </label>
                            <InputField
                                name="address"
                                placeholder="Enter your street address"
                                register={register}
                                errors={errors}
                            />
                        </div>
                      
                    </div>
 
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4">
                            <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-sm flex items-center justify-center">
                                <Phone className="w-3 h-3 text-white" />
                            </div>
                            Contact Information
                        </h4>

                        
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
                            </div>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                Email cannot be changed for security reasons
                            </p>
                        </div> 
                    </div>

                </div>
 
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
