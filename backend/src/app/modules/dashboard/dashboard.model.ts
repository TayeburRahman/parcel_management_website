// models/Parcel.ts
import mongoose, { Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IParcel } from "./dashboard.interface";

const parcelSchema = new mongoose.Schema<IParcel>({
    shipmentId: {
        type: String,
        unique: true,
        default: () => uuidv4(),
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent",
        default: null,
    },
    package_weight: {
        type: Number,
        required: true,
        default: 1,
    },
    pickupAddress: {
        type: String,
        required: true,
        trim: true,
    },
    deliveryAddress: {
        type: String,
        required: true,
        trim: true,
    },
    parcelType: {
        type: String,
        required: true,
        enum: ["SMALL", "MEDIUM", "LARGE"],
    },
    paymentMethod: {
        type: String,
        enum: ["CASH", "PREPAID"],
        required: true,
    },
    return_shipment: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: ["PENDING", "PICKED_UP", "IN_TRANSIT", "DELIVERED", "FAILED"],
        default: "PENDING",
    },
    coordinates: {
        pickup: {
            lat: { type: Number },
            lng: { type: Number },
        },
        delivery: {
            lat: { type: Number },
            lng: { type: Number },
        },
    },
}, {
    timestamps: true,
});

const Parcel: Model<IParcel> = mongoose.model<IParcel>("Parcel", parcelSchema);

export default Parcel;
