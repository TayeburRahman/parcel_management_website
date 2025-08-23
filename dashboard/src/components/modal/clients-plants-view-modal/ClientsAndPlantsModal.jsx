"use client";

import {
  X,
  Building2,
  Mail,
  MapPin,
  Users,
  Factory,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Image from "next/image";

const StatRow = ({ icon, label, value, isStatus = false }) => (
  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-sm border border-primary/20 hover:border-primary/30 transition-all duration-300 hover:shadow-md">
    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white shadow-lg">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-xs font-medium text-gray-600 mb-1">{label}</p>
      {isStatus ? (
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
              value === "Active" || !value
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {value === "Active" || !value ? (
              <CheckCircle className="w-3 h-3" />
            ) : (
              <XCircle className="w-3 h-3" />
            )}
            {value || "Active"}
          </span>
        </div>
      ) : (
        <p className="text-sm font-semibold text-gray-900">{value || "N/A"}</p>
      )}
    </div>
  </div>
);

const ClientsAndPlantsModal = ({ setViewModal, viewModal, data }) => {
  if (!viewModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-lg w-full max-w-lg mx-auto shadow-2xl relative animate-in zoom-in-95 duration-300 overflow-hidden scrl-hide max-h-[600px] flex flex-col">
        {/* Header Section with Gradient */}
        <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-6 text-white flex-shrink-0">
          {/* Close Button */}
          <button
            onClick={() => setViewModal(false)}
            className="absolute top-3 right-3 text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Company Profile */}
          <div className="flex flex-col items-center text-center pt-2">
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/30 shadow-xl bg-white/10 backdrop-blur-sm">
                <Image
                  src={
                    data?.companyPhoto || "/placeholder.svg?height=80&width=80"
                  }
                  alt={data?.companyName || "Company Logo"}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Status Indicator */}
              <div
                className={`absolute -bottom-1 -right-1 w-6 h-6 ${
                  data?.status === "Active" ? "bg-green-500" : "bg-red-500"
                } rounded-full border-3 border-white shadow-lg flex items-center justify-center`}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <h2 className="text-xl font-bold mb-2">
              {data?.companyName || "Company Name"}
            </h2>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
              <Mail className="h-3 w-3" />
              {data?.companyEmail || "company@email.com"}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto scrl-hide">
          <div className="p-4 space-y-4">
            {/* Company Details */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-primary to-primary/80 rounded-sm flex items-center justify-center">
                  <Building2 className="w-3 h-3 text-white" />
                </div>
                Company Information
              </h3>

              <div className="grid gap-2">
                <StatRow
                  icon={<MapPin size={16} />}
                  label="Address"
                  value={data?.companyAddress}
                />
                <StatRow
                  icon={<Factory size={16} />}
                  label="Plants"
                  value={data?.plants}
                />
                <StatRow
                  icon={<Users size={16} />}
                  label="Active Employees"
                  value={data?.activeEmployees}
                />
                <StatRow
                  icon={<CheckCircle size={16} />}
                  label="Status"
                  value={data?.status}
                  isStatus={true}
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-sm flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                Business Overview
              </h3>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-sm p-4 border border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white rounded-sm shadow-sm border border-gray-100">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Factory className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-medium text-blue-600">
                      Total Plants
                    </p>
                    <p className="text-lg font-bold text-blue-800">
                      {data?.plants || "0"}
                    </p>
                  </div>

                  <div className="text-center p-3 bg-white rounded-sm shadow-sm border border-gray-100">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-medium text-green-600">
                      Employees
                    </p>
                    <p className="text-lg font-bold text-green-800">
                      {data?.activeEmployees || "0"}
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 ${
                          data?.status === "Active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }  rounded-full`}
                      ></div>
                      <span>Account {data?.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Action Button */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white">
          <button
            onClick={() => setViewModal(false)}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white px-4 py-2 rounded-sm text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientsAndPlantsModal;
