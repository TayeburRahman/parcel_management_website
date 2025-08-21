
import AppError from "../../../errors/AppError";
import { IParcel } from "./dashboard.interface";
import Parcel from "./dashboard.model";
import { v4 as uuidv4 } from "uuid";

// =============Parcels=========================
const createShipmentParcel = async (payload: IParcel) => {
    try {
        const newParcel = new Parcel({
            shipmentId: uuidv4(),
            customerId: payload.customerId,
            pickupAddress: payload.pickupAddress,
            deliveryAddress: payload.deliveryAddress,
            parcelType: payload.parcelType,
            paymentMethod: payload.paymentMethod ?? "CASH",
            package_weight: payload.package_weight ?? 1,
            coordinates: payload.coordinates,
            status: payload.status ?? "PENDING",
        });

        await newParcel.save();

        return newParcel;
    } catch (error: any) {
        throw new AppError(400, error?.message || "Failed to create parcel");
    }

};

const updateShipmentParcel = async (parcelId: string,
    payload: Partial<IParcel>) => {

    const parcel = await Parcel.findById(parcelId);
    if (!parcel) throw new AppError(404, "Parcel not found");

    const updatableFields: (keyof IParcel)[] = [
        "customerId",
        "agentId",
        "pickupAddress",
        "deliveryAddress",
        "parcelType",
        "package_weight",
        "coordinates",
        "status",
    ];

    updatableFields.forEach((field) => {
        if (payload[field] !== undefined) {
            // @ts-ignore
            parcel[field] = payload[field];
        }
    });

    try {
        await parcel.save();
        return parcel;
    } catch (error: any) {
        throw new AppError(400, error?.message || "Failed to update parcel");
    }
}

const deleteShipmentParcel = async (parcelId: string) => {
    const deletedParcel = await Parcel.findByIdAndDelete(parcelId);

    if (!deletedParcel) {
        throw new AppError(404, "Parcel not found");
    }
    return deletedParcel;
};


export const DashboardService = {
    createShipmentParcel,
    updateShipmentParcel,
    deleteShipmentParcel
};


