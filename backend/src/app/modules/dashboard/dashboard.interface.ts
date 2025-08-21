import { ObjectId } from "mongoose";

export interface IParcel {
    shipmentId: string;
    customerId: ObjectId;
    agentId: ObjectId | null;
    pickupAddress: string;
    package_weight: number;
    deliveryAddress: string;
    return_shipment: string | null;
    parcelType: "SMALL" | "MEDIUM" | "LARGE";
    paymentMethod?: "CASH" | "PREPAID";
    coordinates?: {
        pickup?: {
            lat: number;
            lng: number;
        };
        delivery?: {
            lat: number;
            lng: number;
        };
    };
    status?: "PENDING" | "PICKED_UP" | "IN_TRANSIT" | "DELIVERED" | "FAILED";
}