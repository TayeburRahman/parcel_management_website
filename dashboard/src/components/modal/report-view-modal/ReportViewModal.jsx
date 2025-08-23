"use client"

import { X, FileText, Calendar, MapPin, Utensils, Users, DollarSign, StickyNote, ChefHat } from "lucide-react"

const ReportViewModal = ({ viewModal, setViewModal, data }) => {
  if (!viewModal || !data) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-lg w-full max-w-lg mx-auto shadow-2xl relative animate-in zoom-in-95 duration-300 overflow-hidden max-h-[600px] flex flex-col">
        {/* Header Section with Gradient */}
        <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-4 text-white flex-shrink-0">
          {/* Close Button */}
          <button
            onClick={() => setViewModal(false)}
            className="absolute top-2 right-2 text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-full transition-all duration-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Report Header */}
          <div className="text-center pt-1">
            <div className="w-12 h-12 bg-white/20 rounded-sm flex items-center justify-center mx-auto mb-2">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold">Report Details</h2>
            <p className="text-xs text-white/90 mt-1">Meal distribution report overview</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrl-hide">
          <div className="p-4 space-y-4">
            {/* Basic Information */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-800 flex items-center gap-2 mb-3">
                <div className="w-5 h-5 bg-gradient-to-r from-primary to-primary/80 rounded-sm flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                Basic Information
              </h3>

              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center gap-3 p-2 bg-gradient-to-r from-primary/5 to-primary/10 rounded-sm border border-primary/20">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white shadow-sm">
                    <Calendar className="w-3 h-3" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-600">Date</p>
                    <p className="text-xs font-semibold text-gray-900">{data.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 bg-gradient-to-r from-primary/5 to-primary/10 rounded-sm border border-primary/20">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white shadow-sm">
                    <MapPin className="w-3 h-3" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-600">Plant</p>
                    <p className="text-xs font-semibold text-gray-900">{data.plant}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 bg-gradient-to-r from-primary/5 to-primary/10 rounded-sm border border-primary/20">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white shadow-sm">
                    <Utensils className="w-3 h-3" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-600">Meal Type</p>
                    <p className="text-xs font-semibold text-gray-900">{data.mealType}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-800 flex items-center gap-2 mb-3">
                <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-sm flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                Statistics
              </h3>

              <div className="grid grid-cols-3 gap-2">
                <div className="bg-blue-50 rounded-sm p-2 border border-blue-200">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <div>
                      <p className="text-xs font-medium text-blue-600">Employees</p>
                      <p className="text-sm font-bold text-blue-800">{data.employeeCount}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-sm p-2 border border-orange-200">
                  <div className="flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-orange-500" />
                    <div>
                      <p className="text-xs font-medium text-orange-600">Total Meals</p>
                      <p className="text-sm font-bold text-orange-800">{data.totalMeal}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-sm p-2 border border-green-200">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <div>
                      <p className="text-xs font-medium text-green-600">Revenue</p>
                      <p className="text-sm font-bold text-green-800">${data.prize}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dishes Served */}
            {data.details && data.details.dishes && data.details.dishes.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-800 flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-gradient-to-r from-orange-500 to-red-600 rounded-sm flex items-center justify-center">
                    <ChefHat className="w-3 h-3 text-white" />
                  </div>
                  Dishes Served
                </h3>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-sm p-3 border border-gray-200">
                  <div className="space-y-2">
                    {data.details.dishes.map((dish, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 bg-white rounded-sm shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-800">{dish.dishName}</p>
                            <p className="text-xs text-gray-600">Served: {dish.served}</p>
                          </div>
                        </div>
                        {dish.pricePerMeal && (
                          <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium border border-green-200">
                            ${dish.pricePerMeal}/meal
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            {data.details && data.details.notes && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-800 flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-sm flex items-center justify-center">
                    <StickyNote className="w-3 h-3 text-white" />
                  </div>
                  Notes
                </h3>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-sm p-3 border border-purple-200">
                  <p className="text-xs text-gray-700 leading-relaxed">{data.details.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Action Button */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white">
          <button
            onClick={() => setViewModal(false)}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white px-4 py-2 rounded-sm text-xs font-semibold transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReportViewModal
