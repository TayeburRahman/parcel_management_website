
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
import config from "../../../config";
 
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

      const fullQRCodeURL =  `http://${config.base_url}:${config.port}${qrCodeUrl}`;
      console.log('--', fullQRCodeURL)
      await sendEmail({
        email: customer?.email,
        subject: "Parcel Booking Confirmation",
        html: parcelEmailTemplate({
          name: user.role === "CUSTOMERS" ? "Customer" : "User",
          shipmentId,           // ✅ use the same ID
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

    if (queryParams.searchTerm) {
        delete queryParams.page
    }

    const queryBuilder = new QueryBuilder<IParcel>(Parcel.find(), queryParams);

    let parcelsQuery = queryBuilder
        .search(["pickupAddress", "deliveryAddress", "shipmentId"])
        .filter()
        .sort()
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

    return { parcels, pagination };
};

const assignedParcelAgent = async (parcelId: string, agentId?: string) => {
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

// ====Customer===================================== 
const getMyParcels = async (customerId: string) => {

    if (!customerId) {
        throw new AppError(400, "Customer ID is required");
    }

    try {
        const parcels = await Parcel.find({ customerId })
            .populate("agentId", "name email phone _number profile_image")
            .sort({ createdAt: -1 });

        return parcels;
    } catch (error: any) {
        throw new AppError(400, error?.message || "Failed to update parcel agent");
    }
};

// const getMyParcels = async (customerId: string) => {

//     if (!customerId) {
//         throw new AppError(400, "Customer ID is required");
//     }

//     try {
//         const parcels = await Parcel.find({ customerId })
//             .populate("agentId", "name email phone _number profile_image")
//             .sort({ createdAt: -1 });

//         return parcels;
//     } catch (error: any) {
//         throw new AppError(400, error?.message || "Failed to update parcel agent");
//     }
// };

export const DashboardService = {
    createShipmentParcel,
    updateShipmentParcel,
    deleteShipmentParcel,
    getAllShipmentParcels,
    assignedParcelAgent,
    getMyParcels
};


