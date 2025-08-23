"use client"

import { X } from "lucide-react"
import Image from "next/image"
import { GrSchedule } from "react-icons/gr"
import { MdOutlineMailOutline } from "react-icons/md"
import { PiBuildingOfficeBold } from "react-icons/pi"
import { RiPlantLine } from "react-icons/ri"

const StatRow = ({ icon, label, value }) => (
    <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-primary/5 to-primary/10 rounded-sm border border-primary/20 hover:border-primary/30 transition-all duration-300">
        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white shadow-sm">
            {icon}
        </div>
        <div className="flex-1">
            <p className="text-xs font-medium text-gray-600">{label}</p>
            <p className="text-xs font-semibold text-gray-900">{value}</p>
        </div>
    </div>
)

const UserViewModal = ({ setViewModal, viewModal, data }) => {
    if (!viewModal) return null

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-lg w-full max-w-lg mx-auto shadow-2xl relative animate-in zoom-in-95 duration-300 overflow-hidden max-h-[600px] flex flex-col">
                {/* Header Section with Gradient */}
                <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-3 text-white flex-shrink-0">
                    {/* Close Button */}
                    <button
                        onClick={() => setViewModal(false)}
                        className="absolute top-2 right-2 text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-full transition-all duration-200 cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* User Profile */}
                    <div className="flex flex-col items-center text-center pt-2">
                        <div className="relative mb-3">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 shadow-lg bg-white/10 backdrop-blur-sm">
                                <Image
                                    src={data?.photoUrl || "https://api.dicebear.com/8.x/initials/svg?seed=Nadim"}
                                    alt={data?.userName || "User Avatar"}
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${data?.status === "Active" ? "bg-green-500" : "bg-red-500"} rounded-full border-2 border-white shadow-sm flex items-center justify-center`}>
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <h2 className="text-lg font-bold mb-1">{data?.userName || "Nadim"}</h2>
                        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                            <span>{data?.status}</span>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content Section */}
                <div className="flex-1 overflow-y-auto scrl-hide">
                    <div className="p-3 space-y-3">
                        {/* User Details */}
                        <div className="space-y-2">
                            <h3 className="text-xs font-bold text-gray-800 flex items-center gap-2 mb-2">
                                <div className="w-4 h-4 bg-gradient-to-r from-primary to-primary/80 rounded-sm flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                                Personal Information
                            </h3>

                            <div className="grid gap-1">
                                <StatRow
                                    icon={<PiBuildingOfficeBold size={14} />}
                                    label="Company Name"
                                    value={data?.companyName || "ABC Group"}
                                />
                                <StatRow icon={<RiPlantLine size={14} />} label="Plant Name" value={data?.plantName || "Plant A"} />
                                <StatRow
                                    icon={<MdOutlineMailOutline size={14} />}
                                    label="Email"
                                    value={data?.employeeID || "nadim@gmail.com"}
                                />
                            </div>
                        </div>

                        {/* Weekly Meal Schedule */}
                        <div className="space-y-2">
                            <h3 className="text-xs font-bold text-gray-800 flex items-center gap-2 mb-2">
                                <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-sm flex items-center justify-center">
                                    <GrSchedule size={12} className="text-white" />
                                </div>
                                Weekly Meal Schedule
                            </h3>

                            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-sm p-2 border border-gray-200">
                                <div className="space-y-1">
                                    {data?.weeklyMealSchedule?.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center p-2 bg-white rounded-sm shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:border-primary/20"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm">
                                                    {index + 1}
                                                </div>
                                                <span className="font-medium text-gray-800 text-xs">{item?.day}</span>
                                            </div>
                                            <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium border border-primary/20">
                                                {item?.meal}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserViewModal
