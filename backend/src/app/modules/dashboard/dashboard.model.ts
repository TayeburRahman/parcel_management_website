// models/Parcel.js
const mongoose = require("mongoose");

const parcelSchema = new mongoose.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Export model
module.exports = mongoose.model("Parcel", parcelSchema);
