
import Parcel from "../dashboard/dashboard.model";
import AppError from "../../../errors/AppError";

const getMyParcels = async (customerId: string) => {

    if (!customerId) {
        throw new AppError(400, "Customer ID is required");
    }

    try {
        const parcels = await Parcel.find({ customerId })
            .populate("agentId", "name email phone _number profile_image location")
            .populate("customerId", "name email phone _number profile_image")
            .sort({ createdAt: -1 });

        return parcels;
    } catch (error: any) {
        throw new AppError(400, error?.message || "Failed to update parcel agent");
    }
};

export const CustomerServices = {
    getMyParcels
};

