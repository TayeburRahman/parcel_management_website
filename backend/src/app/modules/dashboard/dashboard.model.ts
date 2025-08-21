// models/Parcel.ts
import mongoose, { Document, Model } from "mongoose";
import { IParcel } from "./dashboard.interface";

const parcelSchema = new mongoose.Schema<IParcel>({
    shipmentId: {
        type: String,
        unique: true,
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customers",
        required: true,
    },
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agents",
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
        enum: ["COD", "PREPAID"],
        required: true,
    },
    deliveryAmount: {
        type: mongoose.Schema.Types.Mixed,
        default: 0,
        validate: {
            validator: (val: any) => val === "FREE" || typeof val === "number",
            message: "deliveryAmount must be 'FREE' or a number",
        },
    },
    return_shipment: {
        type: String,
        default: null,
    },
    qrCode: {
        type: String,
        required: true,
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
