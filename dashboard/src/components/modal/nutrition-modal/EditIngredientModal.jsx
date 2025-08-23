"use client"

import { useForm } from "react-hook-form"
import { X, Edit3, Utensils, Leaf } from 'lucide-react'

const EditIngredientModal = ({ editModal, setEditModal, selectedIngredientItem }) => {
  const { register, handleSubmit, reset, setValue } = useForm()

  // Set form values when modal opens or selectedIngredientItem changes
  if (editModal && selectedIngredientItem) {
    setValue("name", selectedIngredientItem.name)
    setValue("quantity", selectedIngredientItem.quantity)
    setValue("unit", selectedIngredientItem.unit)
  }

  const onSubmit = (data) => {
    console.log("Updated Ingredient Data:", data)
    // API call or state update logic here
    // updateIngredientItem(selectedIngredientItem.ingredientId, data);
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
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold">Edit Ingredient</h2>
            <p className="text-xs text-white/90 mt-1">Update ingredient information for this dish</p>
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
                  value={selectedIngredientItem?.dishName || ""}
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

            {/* Ingredient Name */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                <Leaf className="h-3 w-3 text-primary" />
                Ingredient Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter ingredient name"
                className="w-full border border-gray-300 px-3 py-1.5 rounded-sm text-xs text-gray-700 font-medium outline-none hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200"
              />
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3V1m0 18v2m8-10a4 4 0 00-4-4H9a2 2 0 00-2 2v4a2 2 0 002 2h2a4 4 0 004-4z"
                  />
                </svg>
                Quantity
              </label>
              <input
                type="number"
                {...register("quantity", { required: true, valueAsNumber: true })}
                placeholder="Enter quantity"
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
                placeholder="Enter unit (e.g., cups, tbsp, pieces)"
                className="w-full border border-gray-300 px-3 py-1.5 rounded-sm text-xs text-gray-700 font-medium outline-none hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200"
              />
            </div>

            {/* Additional Info Section */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-sm p-3 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700">Ingredient Tips</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Make sure to specify accurate quantities and units for better recipe consistency. Common units include
                cups, tablespoons, grams, pieces, etc.
              </p>
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

export default EditIngredientModal
