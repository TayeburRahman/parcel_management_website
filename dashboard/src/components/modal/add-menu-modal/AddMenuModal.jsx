"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { IoIosArrowDown } from "react-icons/io"
import { CalendarDays, Upload, Check, X, ChefHat, Utensils } from "lucide-react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import InputField from "@/components/helper/input-helper/InputField"

const AddMenuModal = ({ addMenuModal, setAddMenuModal }) => {
  const [selectedWeekRange, setSelectedWeekRange] = useState(null)
  const [selectedMealTypes, setSelectedMealTypes] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm()

  const mealTypeOptions = [
    { value: "breakfast", label: "Breakfast", color: "from-orange-400 to-orange-600" },
    { value: "lunch", label: "Lunch", color: "from-green-400 to-green-600" },
    { value: "dinner", label: "Dinner", color: "from-purple-400 to-purple-600" },
    { value: "snacks", label: "Snacks", color: "from-pink-400 to-pink-600" },
  ]

  const toggleMealType = (mealType) => {
    setSelectedMealTypes((prev) =>
      prev.includes(mealType) ? prev.filter((type) => type !== mealType) : [...prev, mealType],
    )
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(file)
      console.log("Selected Image File:", file)
    }
  }

  const onSubmit = (data) => {
    console.log("Form Data:", data)
    console.log("Selected Week Range:", selectedWeekRange)
    console.log("Selected Meal Types:", selectedMealTypes)
    console.log("Uploaded Image:", selectedImage)
    setAddMenuModal(false)
  }

  const formatWeekRange = (date) => {
    if (!date) return "Select Week Range"
    const endDate = new Date(date.getTime() + 6 * 24 * 60 * 60 * 1000)
    const formattedStartDate = `${date.getDate()}`
    const formattedEndDate = `${endDate.getDate()} ${endDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })}`
    return `${formattedStartDate} - ${formattedEndDate}`
  }

  if (!addMenuModal) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-lg w-full max-w-lg mx-auto shadow-2xl relative animate-in zoom-in-95 duration-300 overflow-hidden max-h-[600px] flex flex-col">
        {/* Enhanced Header */}
        <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-6 text-white flex-shrink-0">
          <button
            onClick={() => setAddMenuModal(false)}
            className="absolute top-3 right-3 text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Content */}
          <div className="text-center pt-2">
            <div className="relative mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-sm flex items-center justify-center mx-auto mb-3 shadow-lg backdrop-blur-sm">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2">Add Weekly Menu Item</h2>
            <p className="text-white/90 text-sm">Create a delicious new menu item for the week</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrl-hide">
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
            {/* Select Week */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                <CalendarDays className="h-3 w-3 text-primary" />
                Select Week Range
              </label>
              <div className="relative">
                <DatePicker
                  selected={selectedWeekRange}
                  onChange={(date) => setSelectedWeekRange(date)}
                  dateFormat="dd MMM yyyy"
                  selectsStart
                  startDate={selectedWeekRange}
                  endDate={selectedWeekRange ? new Date(selectedWeekRange.getTime() + 6 * 24 * 60 * 60 * 1000) : null}
                  className="w-full border border-gray-300 px-2 py-1 rounded-sm text-xs text-gray-500 font-normal outline-none appearance-none pr-8 cursor-pointer"
                  customInput={
                    <button
                      type="button"
                      className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-sm text-xs font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 bg-white"
                    >
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        <span className={selectedWeekRange ? "text-gray-900" : "text-gray-500"}>
                          {formatWeekRange(selectedWeekRange)}
                        </span>
                      </div>
                      <IoIosArrowDown className="absolute right-2 h-3 w-3 text-gray-400" />
                    </button>
                  }
                  popperContainer={({ children }) => <div style={{ zIndex: 9999 }}>{children}</div>}
                  popperPlacement="bottom-start"
                />
              </div>
            </div>

            {/* Meal Type Selection */}
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
                Meal Types
                <span className="text-xs text-gray-500 font-normal">(Select multiple)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {mealTypeOptions.map((meal) => (
                  <button
                    key={meal.value}
                    type="button"
                    onClick={() => toggleMealType(meal.value)}
                    className={`relative px-3 py-2 rounded-sm text-xs font-medium transition-all duration-200 border cursor-pointer ${
                      selectedMealTypes.includes(meal.value)
                        ? `bg-gradient-to-r ${meal.color} text-white border-transparent shadow-md`
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {selectedMealTypes.includes(meal.value) && <Check className="h-3 w-3" />}
                      {meal.label}
                    </div>
                  </button>
                ))}
              </div>
              {selectedMealTypes.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedMealTypes.map((type) => {
                    const meal = mealTypeOptions.find((m) => m.value === type)
                    return (
                      <span
                        key={type}
                        className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${meal.color} text-white`}
                      >
                        {meal.label}
                      </span>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Upload Area */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                <Upload className="h-3 w-3 text-primary" />
                Menu Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-sm p-4 text-center cursor-pointer hover:bg-gray-50 hover:border-primary/50 transition-all group">
                <input
                  type="file"
                  className="hidden"
                  id="dish-image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <label htmlFor="dish-image-upload" className="flex flex-col items-center justify-center cursor-pointer">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                    <Upload className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-gray-600 text-xs font-medium">Click to upload image</span>
                  <span className="text-gray-400 text-xs mt-1">PNG, JPG up to 5MB</span>
                  {selectedImage && (
                    <span className="text-primary text-xs mt-2 font-medium">✓ {selectedImage.name}</span>
                  )}
                </label>
              </div>
            </div>

            {/* Dish Name */}
            <InputField
              label="Dish Name"
              name="dishName"
              type="text"
              register={register}
              errors={errors}
              placeholder="Enter delicious dish name"
              required
            />

            {/* Description */}
            <InputField
              label="Description"
              name="description"
              type="textarea"
              register={register}
              errors={errors}
              placeholder="Describe the dish ingredients and preparation..."
            />

            {/* Assignment Fields */}
            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Assign to"
                name="assignTo"
                type="text"
                register={register}
                errors={errors}
                placeholder="Assign to user"
              />
              <InputField
                label="Assign Company"
                name="assignCompany"
                type="text"
                register={register}
                errors={errors}
                placeholder="Assign to company"
              />
            </div>
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setAddMenuModal(false)}
              className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-sm text-xs font-medium hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white px-4 py-2 rounded-sm text-xs font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Create Menu Item
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddMenuModal
