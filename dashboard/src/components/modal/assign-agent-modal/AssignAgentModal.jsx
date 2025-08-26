"use client";

import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { PiPackageDuotone } from 'react-icons/pi';
import { useGetAccountsQuery } from "@/redux/features/customer/customerApi"; 
import { SuccessToast, ErrorToast } from "@/helper/ValidationHelper";
import { useAssignAgentMutation } from "@/redux/features/parcel/parcelApi";

const AssignAgentModal = ({ assignAgentModal, setAssignAgentModal, parcelIdToAssign, onAgentAssignedSuccess }) => {
  const { data: agentsData } = useGetAccountsQuery({ role: "AGENT" });
  const agents = agentsData?.data?.results || [];

  const [assignAgent, { isLoading: isAssigningAgent }] = useAssignAgentMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = {
        parcelId: parcelIdToAssign,
        agentId: data.agentId,
      };
      console.log("=============", payload)
      const res = await assignAgent(payload).unwrap();
      SuccessToast(res.message || "Agent assigned successfully!");
      setAssignAgentModal(false);
      reset();
      if (onAgentAssignedSuccess) {
        onAgentAssignedSuccess();
      }
    } catch (err) {
      console.error("Failed to assign agent:", err);
      ErrorToast(err?.data?.message || "Failed to assign agent.");
    }
  };

  if (!assignAgentModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-lg w-full max-w-lg mx-auto shadow-2xl relative animate-in zoom-in-95 duration-300 overflow-hidden max-h-[600px] flex flex-col">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-6 text-white flex-shrink-0">
          <button
            onClick={() => setAssignAgentModal(false)}
            className="absolute top-3 right-3 text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Content */}
          <div className="text-center pt-2">
            <div className="relative mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-sm flex items-center justify-center mx-auto mb-3 shadow-lg backdrop-blur-sm">
                <PiPackageDuotone className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2">Assign Agent</h2>
            <p className="text-white/90 text-sm">Select an agent to assign to this parcel</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrl-hide">
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700">Select Agent</label>
              <select
                {...register("agentId", { required: true })}
                className="w-full border border-gray-300 px-3 py-2 rounded-sm text-xs text-gray-700 focus:ring-1 focus:ring-primary focus:outline-none"
              >
                <option value="">Select Agent</option>
                {agents.map((agent) => (
                  <option key={agent._id} value={agent._id}>
                    {agent.name} ({agent.email})
                  </option>
                ))}
              </select>
              {errors.agentId && <span className="text-red-500 text-xs">Agent is required</span>}
            </div>
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setAssignAgentModal(false)}
              className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-sm text-xs font-medium hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white px-4 py-2 rounded-sm text-xs font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              disabled={isAssigningAgent}
               onClick={handleSubmit(onSubmit)}
            >
              {isAssigningAgent ? "Assigning..." : "Assign Agent"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignAgentModal;