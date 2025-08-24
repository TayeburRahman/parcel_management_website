"use client"
import PageContainer from "@/components/container/PageContainer"
import { FiCamera } from "react-icons/fi"
import { User, Settings, Shield, Edit3 } from "lucide-react"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import EditProfileTab from "@/components/profile/tabs/EditProfileTab"
import ChangePassTab from "@/components/profile/tabs/ChangePassTab"
import { useSelector, useDispatch } from "react-redux"
import { SetUserDetails } from "@/redux/features/auth/authSlice"
import { baseUrl } from "@/redux/features/api/apiSlice"

const ProfilePage = () => {
  const dispatch = useDispatch()
  const authUser = useSelector((state) => state.auth.user)

  const [activeTab, setActiveTab] = useState("profile")
  const [previewImage, setPreviewImage] = useState(authUser?.profile_image || "/images/avatar.png")
  const fileInputRef = useRef(null)

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { handleSubmit, register, reset, formState: { errors }, watch } = useForm({
    defaultValues: {
      name: authUser?.name || "",
      email: authUser?.email || "",
      phone: authUser?.phone_number || "",
      address: authUser?.address || "", 
      vehicleType: authUser?.vehicleType || false,
      status: authUser?.status || "",
    }
  })

  useEffect(() => {
    reset({
      name: authUser?.name || "",
      email: authUser?.email || "",
      phone: authUser?.phone_number || "",
      address: authUser?.address || "", 
      vehicleType: authUser?.vehicleType || false,
      status: authUser?.status || "",
    })

    if (authUser?.profile_image) setPreviewImage(authUser.profile_image)
  }, [authUser, reset])

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageURL = URL.createObjectURL(file)
      setPreviewImage(imageURL)
    }
  }

  const onSubmitProfile = async (data ) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("email", data.email)
    formData.append("phone_number", data.phone)
    formData.append("address", data.address) 
    formData.append("vehicleType", data.vehicleType)

    if (fileInputRef.current?.files?.[0]) {
      formData.append("profile_image", fileInputRef.current.files[0])
    }

    try {
      const response = await fetch(`${baseUrl}/user/profile`, {
        method: "PUT",
        body: formData,
      })
      if (!response.ok) throw new Error("Failed to update profile")

      const updatedUser = await response.json()
      dispatch(SetUserDetails({ user: updatedUser }))
      alert("Profile updated successfully!")
    } catch (err) {
      console.error(err)
      alert("Failed to update profile!")
    }
  }

  const onSubmitPassword = (data ) => {
    console.log("Password Changed:", data) 
  }

const imageUrl = previewImage
  ? previewImage.startsWith("http")
    ? previewImage
    : `${baseUrl}${previewImage}`
  : "/images/avatar.png";

  return (
    <PageContainer>
      <div className="min-h-[calc(100vh-105px)] bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
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
            <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-6 text-white text-center">
                <div className="relative inline-block mb-4">
                  <Image
                    src={imageUrl}
                    width={100}
                    height={100}
                    alt="Profile Picture"
                    className="rounded-full object-cover w-24 h-24 border-4 border-white/30 shadow-xl"
                    priority
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute flex justify-center items-center p-2 w-8 h-8 border-3 border-white bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary rounded-full -bottom-1 -right-1 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <FiCamera size={14} color="#fff" className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>
                <h2 className="text-xl font-bold mb-1">{authUser?.name}</h2>
                <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
              </div>

              {/* Stats */}
              <div className="p-6 grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-sm border border-blue-200">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-xs font-medium text-blue-600">Profile</p>
                  <p className="text-sm font-bold text-blue-800">{authUser?.role}</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-r from-green-50 to-green-100/50 rounded-sm border border-green-200">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-xs font-medium text-green-600">Status</p>
                  <p className="text-sm font-bold text-green-800">{authUser?.status}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
              {/* Tabs */}
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
                    <Edit3 className="w-4 h-4" /> Edit Profile
                  </button>
                  <button
                    onClick={() => setActiveTab("password")}
                    className={`relative py-2 px-6 text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      activeTab === "password"
                        ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-md"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    <Shield className="w-4 h-4" /> Change Password
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-0">
                {activeTab === "profile" && (
                  <EditProfileTab
                    onSubmit={handleSubmit(onSubmitProfile)}
                    register={register}
                    errors={errors}
                    user={authUser}
                  />
                )}
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
