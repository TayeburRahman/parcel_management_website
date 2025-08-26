"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { PiPackageDuotone } from "react-icons/pi";
import InputField from "@/components/helper/input-helper/InputField";
import { SuccessToast, ErrorToast } from "@/helper/ValidationHelper";
import { useGetAccountsQuery } from "@/redux/features/customer/customerApi";
import { useCreateParcelMutation } from "@/redux/features/parcel/parcelApi";
import LocationPickerMap from "@/components/map/LocationPickerMap";
import { useSelector } from "react-redux";

const AddMenuModal = ({ addMenuModal, setAddMenuModal, onAddParcelSuccess }) => {
  const { user } = useSelector((state) => state.auth);
  const [createParcel, { isLoading: isCreatingParcel }] = useCreateParcelMutation();

  const { data: customersData } = useGetAccountsQuery({ role: "CUSTOMERS" }, { skip: user?.role === 'CUSTOMERS' });
  const { data: agentsData } = useGetAccountsQuery({ role: "AGENT" });

  const customers = customersData?.data?.results || [];
  const agents = agentsData?.data?.results || [];

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  const [showMapModal, setShowMapModal] = useState(false);
  const [currentMapTarget, setCurrentMapTarget] = useState(null);  
  const [pickupLocation, setPickupLocation] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null);

  const parcelTypeOptions = [
    { value: "SMALL", label: "Small" },
    { value: "MEDIUM", label: "Medium" },
    { value: "LARGE", label: "Large" },
  ];

  const paymentMethodOptions = [
    { value: "COD", label: "Cash on Delivery" },
    { value: "PREPAID", label: "Prepaid" },
  ];

  const handleLocationSelect = (location) => {
    if (currentMapTarget === "pickup") {
      setPickupLocation(location);
      setValue("pickupAddress", location.address, { shouldValidate: true });
    } else if (currentMapTarget === "delivery") {
      setDeliveryLocation(location);
      setValue("deliveryAddress", location.address, { shouldValidate: true });
    }
    setShowMapModal(false);
  };

  const openMapFor = (target) => {
    setCurrentMapTarget(target);
    setShowMapModal(true);
  };

  const onSubmit = async (data) => {
    if (!pickupLocation) {
      ErrorToast("Please select a pickup location on the map.");
      return;
    }
    if (!deliveryLocation) {
      ErrorToast("Please select a delivery location on the map.");
      return;
    }

    try {
      const parcelData = {
        pickupAddress: pickupLocation.address,
        deliveryAddress: deliveryLocation.address,
        parcelType: data.parcelType,
        package_weight: Number(data.package_weight),
        paymentMethod: data.paymentMethod,
        customerId: user?.role === 'CUSTOMERS' ? user._id : data.customerId,
        agentId: user?.role === 'CUSTOMERS' ? null : (data.agentId || null),
        coordinates: {
          pickup: {
            lat: pickupLocation.lat,
            lng: pickupLocation.lon,
          },
          delivery: {
            lat: deliveryLocation.lat,
            lng: deliveryLocation.lon,
          },
        },
      };

      const res = await createParcel(parcelData).unwrap();
      SuccessToast(res.message || "Parcel created successfully!");
      setAddMenuModal(false);
      reset();
      setPickupLocation(null);
      setDeliveryLocation(null);
      if (onAddParcelSuccess) onAddParcelSuccess();
    } catch (err) {
      console.error("Failed to create parcel:", err);
      ErrorToast(err?.data?.message || "Failed to create parcel.");
    }
  };

  if (!addMenuModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="relative bg-white rounded-lg w-full max-w-lg mx-auto shadow-2xl overflow-hidden max-h-[600px] flex flex-col">

        <button
          type="button"
          onClick={() => setAddMenuModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 p-2 rounded-full z-50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-4 text-white flex-shrink-0">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-sm flex items-center justify-center mx-auto mb-3 shadow-lg backdrop-blur-sm">
              <PiPackageDuotone className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Add New Parcel</h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrl-hide">
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">

            <div>
              <label className="text-xs font-semibold text-gray-700">Pickup Address</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={pickupLocation?.address || ""}
                  placeholder="Select pickup location on map"
                  className="w-full border border-gray-300 px-3 py-2 rounded-sm text-xs text-gray-700 focus:outline-none bg-gray-50 cursor-pointer"
                  onClick={() => openMapFor("pickup")}
                />
                
              </div>
              {errors.pickupAddress && <span className="text-red-500 text-xs">Pickup address is required</span>}
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700">Delivery Address</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={deliveryLocation?.address || ""}
                  placeholder="Select delivery location on map"
                  className="w-full border border-gray-300 px-3 py-2 rounded-sm text-xs text-gray-700 focus:outline-none bg-gray-50 cursor-pointer"
                  onClick={() => openMapFor("delivery")}
                />
                
              </div>
              {errors.deliveryAddress && <span className="text-red-500 text-xs">Delivery address is required</span>}
            </div>

            {(user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700">Customer</label>
                  <select
                    {...register("customerId", { required: true })}
                    className="w-full border border-gray-300 px-3 py-2 rounded-sm text-xs text-gray-700 focus:ring-1 focus:ring-primary focus:outline-none"
                  >
                    <option value="">Select Customer</option>
                    {customers.map((customer) => (
                      <option key={customer._id} value={customer._id}>
                        {customer.name} ({customer.email})
                      </option>
                    ))}
                  </select>
                  {errors.customerId && <span className="text-red-500 text-xs">Customer is required</span>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700">Agent (Optional)</label>
                  <select
                    {...register("agentId")}
                    className="w-full border border-gray-300 px-3 py-2 rounded-sm text-xs text-gray-700 focus:ring-1 focus:ring-primary focus:outline-none"
                  >
                    <option value="">Select Agent</option>
                    {agents.map((agent) => (
                      <option key={agent._id} value={agent._id}>
                        {agent.name} ({agent.email})
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700">Parcel Type</label>
              <select
                {...register("parcelType", { required: true })}
                className="w-full border border-gray-300 px-3 py-2 rounded-sm text-xs text-gray-700 focus:ring-1 focus:ring-primary focus:outline-none"
              >
                <option value="">Select Parcel Type</option>
                {parcelTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.parcelType && <span className="text-red-500 text-xs">Parcel Type is required</span>}
            </div>

            <InputField
              label="Package Weight (kg)"
              name="package_weight"
              type="number"
              register={register}
              errors={errors}
              placeholder="Enter package weight"
              required
              step="0.01"
            />

           

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700">Payment Method</label>
              <select
                {...register("paymentMethod", { required: true })}
                className="w-full border border-gray-300 px-3 py-2 rounded-sm text-xs text-gray-700 focus:ring-1 focus:ring-primary focus:outline-none"
              >
                <option value="">Select Payment Method</option>
                {paymentMethodOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.paymentMethod && <span className="text-red-500 text-xs">Payment Method is required</span>}
            </div>

          </form>
        </div>

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
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white px-4 py-2 rounded-sm text-xs font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              disabled={isCreatingParcel}
            >
              {isCreatingParcel ? "Creating..." : "Create Parcel"}
            </button>
          </div>
        </div>
      </div>

      {showMapModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="relative bg-white rounded-lg w-full max-w-2xl mx-auto shadow-2xl overflow-hidden flex flex-col h-[90vh]">
            <button
              type="button"
              onClick={() => setShowMapModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 p-2 rounded-full z-50"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Select {currentMapTarget === "pickup" ? "Pickup" : "Delivery"} Location</h2>
            </div>
            <div className="flex-1 p-4">
              <LocationPickerMap
                onLocationSelect={handleLocationSelect}
                initialLocation={currentMapTarget === "pickup" ? pickupLocation : deliveryLocation}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMenuModal;
