
import { Types } from "mongoose";
import QueryBuilder from "../../../builder/QueryBuilder";
import AppError from "../../../errors/AppError";
import { IParcel, IQueryParams } from "./dashboard.interface";
import Parcel from "./dashboard.model";
import QRCode from "qrcode";
import { IReqUser } from "../auth/auth.interface";
import { ENUM_USER_ROLE } from "../../../enums/user";
import sendEmail from "../../../utils/sendEmail";
import Customers from "../customers/customers.model";
import { parcelEmailTemplate } from "../../../mails/customer.booking";
import path from "path";
const fs = require("fs");
const PDFDocument = require("pdfkit");
import config from "../../../config";
import { Response } from "express";

// =============Parcels=========================
const generateShipmentId = () => {
    return Math.floor(10000000 + Math.random() * 9000000000).toString();
};

const createShipmentParcel = async (payload: IParcel, user: IReqUser) => {
    const shipmentId = `SID-${generateShipmentId()}`;

    const qrCodeDir = path.join(process.cwd(), "uploads/qrcodes");
    const qrCodeFilePath = path.join(qrCodeDir, `${shipmentId}.png`);
    await QRCode.toFile(qrCodeFilePath, shipmentId);
    const qrCodeUrl = `/qrcodes/${shipmentId}.png`;


    const { role, userId } = user;

    try {
        const newParcel = new Parcel({
            shipmentId,
            customerId: role === ENUM_USER_ROLE.CUSTOMERS ? userId : payload.customerId,
            pickupAddress: payload.pickupAddress,
            deliveryAddress: payload.deliveryAddress,
            parcelType: payload.parcelType,
            agentId: payload.agentId ?? null,
            paymentMethod: payload.paymentMethod ?? "COD",
            package_weight: payload.package_weight ?? 1,
            coordinates: payload.coordinates,
            qrCode: qrCodeUrl,
        });

        const customer = await Customers.findOne({ _id: newParcel.customerId }).lean();
        if (!customer) {
            throw new AppError(404, "Customer not found");
        }
        await newParcel.save();

        const fullQRCodeURL = `http://${config.base_url}:${config.port}${qrCodeUrl}`;
        console.log('--', fullQRCodeURL)
        await sendEmail({
            email: customer?.email,
            subject: "Parcel Booking Confirmation",
            html: parcelEmailTemplate({
                name: user.role === "CUSTOMERS" ? "Customer" : "User",
                shipmentId,
                pickupAddress: payload.pickupAddress,
                deliveryAddress: payload.deliveryAddress,
                parcelType: payload.parcelType,
                paymentMethod: payload.paymentMethod ?? "COD",
                qrCodeUrl: fullQRCodeURL,
            }),
        });

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

const getAllShipmentParcels = async (queryParams: IQueryParams) => {
    console.log('createShipmentParcel', queryParams)
    if (queryParams.searchTerm) {
        delete queryParams.page
    }

    const queryBuilder = new QueryBuilder<IParcel>(Parcel.find(), queryParams);

    let parcelsQuery = queryBuilder
        .search(["pickupAddress", "deliveryAddress", "shipmentId"])
        .filter()
        .sort()
        .dateFilter()
        .paginate()
        .fields()
        .modelQuery;

    parcelsQuery = parcelsQuery
        .populate({
            path: "customerId",
            select: "name email phone_number profile_image",
        })
        .populate({
            path: "agentId",
            select: "name email phone_number profile_image",
        });

    const parcels = await parcelsQuery.exec();
    const pagination = await queryBuilder.countTotal();

    // console.log("pp",parcels)

    return { parcels, pagination };
};

const assignedParcelAgent = async (parcelId: string, agentId: string) => {
    console.log("==", parcelId, agentId)
    const parcel = await Parcel.findById(parcelId);
    if (!parcel) throw new AppError(404, "Parcel not found");
    if (agentId) {
        // @ts-ignore
        parcel.agentId = new Types.ObjectId(agentId);
    } else {
        // Remove agent
        parcel.agentId = null;
    }

    try {
        await parcel.save();
        return parcel;
    } catch (error: any) {
        throw new AppError(400, error?.message || "Failed to update parcel agent");
    }
};

const getParcelsDetails = async (parcelId: string) => {
    const parcel = await Parcel.findById(parcelId)
        .populate({ path: "customerId", select: "name email phone_number profile_image location" })
        .populate({ path: "agentId", select: "name email phone_number profile_image location" });
    if (!parcel) {
        throw new AppError(404, "Parcel not found");
    }
    return parcel;
}

const exportReports = async (type: "weekly" | "monthly" | "yearly", res: Response) => {
    try {
        const now = new Date();
        let startDate: Date;

        console.log("====", type)

        // Weekly: Monday as first day
        switch (type) {
            case "weekly": {
                const day = now.getDay() || 7; // Sunday = 0, convert to 7
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day + 1);
                break;
            }
            case "monthly":
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                break;
            case "yearly":
                startDate = new Date(now.getFullYear(), 0, 1);
                break;
            default:
                throw new AppError(400, "Invalid report type");
        }

        // Fetch parcels
        const parcels = await Parcel.find({ createdAt: { $gte: startDate } })
            .populate("customerId", "name email phone_number")
            .populate("agentId", "name email phone_number");

        // Create PDF
        const doc = new PDFDocument({ margin: 30, size: "A4" });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=parcel_report_${type}.pdf`);

        doc.pipe(res);

        doc.fontSize(20).text(`Parcel Report - ${type.toUpperCase()}`, { align: "center" });
        doc.moveDown();
        doc.fontSize(12).text(`Report Date: ${now.toLocaleDateString()}`);
        doc.text(`Period: ${startDate.toLocaleDateString()} - ${now.toLocaleDateString()}`);
        doc.text(`Total Parcels: ${parcels.length}`);
        doc.moveDown();

        parcels.forEach((parcel, index) => {
            doc.fontSize(10).text(`Parcel ${index + 1}:`);
            doc.text(`  Shipment ID: ${parcel.shipmentId}`);
            doc.text(`  Customer: ${parcel.customerId ? (parcel.customerId as any).name : "N/A"}`);
            doc.text(`  Pickup: ${parcel.pickupAddress}`);
            doc.text(`  Delivery: ${parcel.deliveryAddress}`);
            doc.text(`  Type: ${parcel.parcelType}`);
            doc.text(`  Status: ${parcel.status}`);
            doc.moveDown(0.5);
        });

        doc.end();
    } catch (err) {
        console.error("PDF export error:", err);
        throw new AppError(400, "Error exporting PDF");
    }
};


export const DashboardService = {
    createShipmentParcel,
    updateShipmentParcel,
    deleteShipmentParcel,
    getAllShipmentParcels,
    assignedParcelAgent,
    getParcelsDetails,
    exportReports
};


