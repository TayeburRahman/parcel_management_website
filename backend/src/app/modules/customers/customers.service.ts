import ApiError from "../../../errors/ApiError";

import httpStatus from "http-status";
import { Request } from "express";
import { RequestData } from "../../../interfaces/common";
import Auth from "../auth/auth.model";
import User from "./customers.model";
import { IParcel } from "../dashboard/dashboard.interface";
import Parcel from "../dashboard/dashboard.model";
import AppError from "../../../errors/AppError";

const getMyParcels = async (customerId: string) => {

    if (!customerId) {
        throw new AppError(400, "Customer ID is required");
    }

    try {
        const parcels = await Parcel.find({ customerId })
            .populate("agentId", "name email phone _number profile_image location")
            .sort({ createdAt: -1 });

        return parcels;
    } catch (error: any) {
        throw new AppError(400, error?.message || "Failed to update parcel agent");
    }
};

export const CustomerServices = {
    getMyParcels
};

