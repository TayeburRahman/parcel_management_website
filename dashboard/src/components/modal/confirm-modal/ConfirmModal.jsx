"use client"

import { X } from "lucide-react"

const ConfirmModal = ({ setConfirmModal, confirmModal, message }) => {
  if (!confirmModal) return null

  const handleConfirm = () => {
    setConfirmModal(false)
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-sm w-full max-w-sm mx-auto shadow-2xl relative animate-in zoom-in-95 duration-300 overflow-hidden">
        {/* Close Button */}
        <button
            onClick={() => setConfirmModal(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-white hover:bg-black/20 p-1 rounded-full transition-all duration-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

        {/* Content */}
        <div className="p-8 text-center space-y-4">
          {/* Warning Icon */}
          <div className="flex justify-center">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h2 className="text-md font-bold text-red-500">Are you sure !</h2>
            <p className="text-gray-700 text-xs leading-relaxed">
              {message}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setConfirmModal(false)}
              className="flex-1 px-2 py-1 border border-gray-300 text-gray-700 text-xs rounded-sm font-medium hover:bg-gray-50 transition-all duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
