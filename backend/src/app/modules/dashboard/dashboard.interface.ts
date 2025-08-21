import { ObjectId } from "mongoose";


export interface IQueryParams {
    searchTerm?: string;
    sort?: string;
    page?: number;
    limit?: number;
    fields?: string;
    [key: string]: any;
}
export interface IParcel {
    shipmentId: string;
    customerId: ObjectId;
    agentId: ObjectId | null;
    pickupAddress: string;
    package_weight: number;
    deliveryAddress: string;
    qrCode: string;
    deliveryAmount: number | "FREE";
    return_shipment: string | null;
    parcelType: "SMALL" | "MEDIUM" | "LARGE";
    paymentMethod?: "COD" | "PREPAID";
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