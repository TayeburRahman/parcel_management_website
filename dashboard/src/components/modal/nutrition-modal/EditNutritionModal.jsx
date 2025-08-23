"use client"

import { useForm } from "react-hook-form"
import { X, Edit3, Utensils } from 'lucide-react'

const EditNutritionModal = ({ editModal, setEditModal, selectedNutritionItem }) => {
  const { register, handleSubmit, reset, setValue } = useForm()

  // Set form values when modal opens or selectedNutritionItem changes
  if (editModal && selectedNutritionItem) {
    setValue("name", selectedNutritionItem.name)
    setValue("value", selectedNutritionItem.value)
    setValue("unit", selectedNutritionItem.unit)
  }

  const onSubmit = (data) => {
    console.log("Updated Nutrition Data:", data)
    // API call or state update logic here
    // updateNutritionItem(selectedNutritionItem.nutrientId, data);
    reset()
    setEditModal(false)
  }

  if (!editModal) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-lg w-full max-w-md mx-auto shadow-2xl relative animate-in zoom-in-95 duration-300 overflow-hidden max-h-[600px] flex flex-col">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-4 text-white flex-shrink-0">
          <button
            onClick={() => {
              setEditModal(false)
              reset()
            }}
            className="absolute top-2 right-2 text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-full transition-all duration-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-center pt-1">
            <div className="w-12 h-12 bg-white/20 rounded-sm flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Edit Nutrition Info</h2>
            <p className="text-xs text-white/90 mt-1">Update nutrition information for this dish</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrl-hide">
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
            {/* Dish Name (Read-only) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                <Utensils className="h-3 w-3 text-primary" />
                Dish Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={selectedNutritionItem?.dishName || ""}
                  readOnly
                  className="w-full border border-gray-300 px-3 py-1.5 rounded-sm text-xs text-gray-500 font-medium outline-none bg-gray-50 cursor-not-allowed"
                />
                <div className="absolute top-1/2 -translate-y-1/2 right-3 transform text-gray-400 pointer-events-none">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Nutrient Name */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                Nutrient Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter nutrient name"
                className="w-full border border-gray-300 px-3 py-1.5 rounded-sm text-xs text-gray-700 font-medium outline-none hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200"
              />
            </div>

            {/* Value */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Value
              </label>
              <input
                type="number"
                {...register("value", { required: true, valueAsNumber: true })}
                placeholder="Enter value"
                className="w-full border border-gray-300 px-3 py-1.5 rounded-sm text-xs text-gray-700 font-medium outline-none hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200"
              />
            </div>

            {/* Unit */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1"
                  />
                </svg>
                Unit
              </label>
              <input
                type="text"
                {...register("unit", { required: true })}
                placeholder="Enter unit (e.g., g, mg, kcal)"
                className="w-full border border-gray-300 px-3 py-1.5 rounded-sm text-xs text-gray-700 font-medium outline-none hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200"
              />
            </div>
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setEditModal(false)
                reset()
              }}
              className="flex-1 border border-gray-300 text-gray-700 px-4 py-1.5 rounded-sm text-xs font-medium hover:bg-gray-50 transition-all duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white px-4 py-1.5 rounded-sm text-xs font-semibold transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditNutritionModal
