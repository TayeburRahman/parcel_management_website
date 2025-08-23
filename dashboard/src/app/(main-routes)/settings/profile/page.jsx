"use client"
import PageContainer from "@/components/container/PageContainer"
import { user } from "@/data/data"
import { FiCamera } from "react-icons/fi"
import { User, Settings, Shield, Edit3 } from "lucide-react"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import EditProfileTab from "@/components/profile/tabs/EditProfileTab"
import ChangePassTab from "@/components/profile/tabs/ChangePassTab"

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile")
  const [previewImage, setPreviewImage] = useState(user.profileImage || "/images/avatar.png")
  const fileInputRef = useRef(null)

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      userName: user.userName || "",
      email: user.email || "",
      phone: user.contactInfo?.phone || "",
      street: user.contactInfo?.address?.street || "",
      city: user.contactInfo?.address?.city || "",
      postCode: user.contactInfo?.address?.postCode || "",
      country: user.contactInfo?.address?.country || "",
    },
  })

  useEffect(() => {
    reset({
      userName: user.userName || "",
      email: user.email || "",
      phone: user.contactInfo?.phone || "",
      street: user.contactInfo?.address?.street || "",
      city: user.contactInfo?.address?.city || "",
      postCode: user.contactInfo?.address?.postCode || "",
      country: user.contactInfo?.address?.country || "",
    })
    if (user.profileImage) {
      setPreviewImage(user.profileImage)
    }
  }, [user, reset])

  const onSubmitProfile = (data) => {
    console.log("Profile Updated:", data)
  }

  const onSubmitPassword = (data) => {
    console.log("Password Changed:", data)
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageURL = URL.createObjectURL(file)
      setPreviewImage(imageURL)
    }
  }

  return (
    <PageContainer>
      <div className="min-h-[calc(100vh-105px)] bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header Section */}
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-sm flex items-center justify-center shadow-lg">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Profile Settings</h1>
              <p className="text-sm text-gray-600">Manage your account information and security</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Profile Card */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
              {/* Profile Header with Gradient */}
              <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-6 text-white">
                <div className="text-center">
                  {/* Profile Image */}
                  <div className="relative inline-block mb-4">
                    <div className="relative">
                      <Image
                        src={previewImage || "/placeholder.svg"}
                        width={100}
                        height={100}
                        alt="Profile Picture"
                        className="rounded-full object-cover w-24 h-24 border-4 border-white/30 shadow-xl"
                      />
                      {/* Camera Button */}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute flex justify-center items-center p-2 w-8 h-8 border-3 border-white bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary rounded-full -bottom-1 -right-1 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 group"
                      >
                        <FiCamera size={14} color="#fff" className="group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold mb-1">{user?.userName}</h2>
                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </div>

              {/* Profile Stats */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-sm border border-blue-200">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-medium text-blue-600">Profile</p>
                    <p className="text-sm font-bold text-blue-800">Complete</p>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-green-50 to-green-100/50 rounded-sm border border-green-200">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-medium text-green-600">Security</p>
                    <p className="text-sm font-bold text-green-800">Secure</p>
                  </div>
                </div>

                {/* Quick Info */}
                {/* <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Last updated: Today</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Account verified</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
              {/* Enhanced Tab Navigation */}
              <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white p-4">
                <div className="flex gap-1 bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`relative py-2 px-6 text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      activeTab === "profile"
                        ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-md"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button
                    onClick={() => setActiveTab("password")}
                    className={`relative py-2 px-6 text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      activeTab === "password"
                        ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-md"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    Change Password
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-0">
                {/* Edit Profile Tab */}
                {activeTab === "profile" && (
                  <EditProfileTab
                    onSubmit={handleSubmit(onSubmitProfile)}
                    register={register}
                    errors={errors}
                    user={user}
                  />
                )}

                {/* Change Password Tab */}
                {activeTab === "password" && (
                  <ChangePassTab
                    onSubmit={handleSubmit(onSubmitPassword)}
                    register={register}
                    errors={errors}
                    setShowCurrentPassword={setShowCurrentPassword}
                    showCurrentPassword={showCurrentPassword}
                    setShowNewPassword={setShowNewPassword}
                    showNewPassword={showNewPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                    showConfirmPassword={showConfirmPassword}
                    watch={watch}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default ProfilePage
