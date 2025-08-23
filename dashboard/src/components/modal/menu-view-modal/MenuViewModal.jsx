"use client"

import { X } from "lucide-react"
import Image from "next/image"

const MenuViewModal = ({ viewModal, setViewModal, data }) => {
  if (!viewModal) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-sm w-full max-w-md mx-auto shadow-2xl relative animate-in zoom-in-95 duration-300 overflow-hidden max-h-[600px] flex flex-col">
        {/* Header Section with Gradient */}
        <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-4 text-white flex-shrink-0">
          {/* Close Button */}
          <button
            onClick={() => setViewModal(false)}
            className="absolute top-2 right-2 text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-full transition-all duration-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Menu Image */}
          <div className="flex flex-col items-center text-center pt-2">
            <div className="relative mb-3">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/30 shadow-xl bg-white/10 backdrop-blur-sm">
                {data?.menuImage ? (
                  <Image
                    src={data.menuImage || "/placeholder.svg?height=80&width=80"}
                    alt={data?.dishName || "Menu Item"}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white/80">
                    <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs">No Image</span>
                  </div>
                )}
              </div>
            </div>
            <h2 className="text-lg font-bold mb-1">{data?.dishName || "Menu Item"}</h2>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
              {data?.mealType?.join(" • ") || "Meal Type"}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto scrl-hide">
          <div className="p-4 space-y-4">
            {/* Basic Info */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-800 flex items-center gap-2 mb-3">
                <div className="w-5 h-5 bg-gradient-to-r from-primary to-primary/80 rounded-sm flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Menu Details
              </h3>

              <div className="grid gap-2">
                <div className="flex items-center gap-3 p-2 bg-gradient-to-r from-primary/5 to-primary/10 rounded-sm border border-primary/20">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white shadow-sm">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-600">Company</p>
                    <p className="text-xs font-semibold text-gray-900">{data?.company || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 bg-gradient-to-r from-primary/5 to-primary/10 rounded-sm border border-primary/20">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white shadow-sm">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-600">Week</p>
                    <p className="text-xs font-semibold text-gray-900">{data?.week || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nutrition Section */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-800 flex items-center gap-2 mb-3">
                <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-sm flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Nutrition Information
              </h3>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-sm p-3 border border-gray-200">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white rounded-sm p-2 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">C</span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-600">Calories</p>
                        <p className="text-xs font-bold text-gray-900">{data?.nutrition?.calories || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-sm p-2 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">P</span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-600">Protein</p>
                        <p className="text-xs font-bold text-gray-900">{data?.nutrition?.protein || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-sm p-2 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">F</span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-600">Fat</p>
                        <p className="text-xs font-bold text-gray-900">{data?.nutrition?.fat || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-sm p-2 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">A</span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-600">Allergens</p>
                        <p className="text-xs font-bold text-gray-900">{data?.nutrition?.allergens || "None"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuViewModal
