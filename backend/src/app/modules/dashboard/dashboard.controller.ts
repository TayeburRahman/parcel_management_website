import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { DashboardService } from './dashboard.service';
import { IParcel } from './dashboard.interface';
import AppError from '../../../errors/AppError';
import { IReqUser } from '../auth/auth.interface';

const createShipmentParcel = catchAsync(async (req: Request, res: Response) => {
    const user = req.user as IReqUser;

    const result = await DashboardService.createShipmentParcel(req.body as IParcel, user as IReqUser);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Parcel created successfully!",
        data: result,
    });
});

const updateShipmentParcel = catchAsync(async (req: Request, res: Response) => {
    const parcelId = req.params.id;
    if (!parcelId) {
        throw new AppError(400, "Parcel ID is required");
    }
    const payload: Partial<IParcel> = req.body;
    const result = await DashboardService.updateShipmentParcel(parcelId, payload);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Parcel update successfully!",
        data: result,
    });
});

const deleteShipmentParcel = catchAsync(
    async (req: Request, res: Response) => {
        const parcelId = req.params.id;
        if (!parcelId) {
            throw new AppError(400, "Parcel ID is required");
        }
        const deletedParcel = await DashboardService.deleteShipmentParcel(parcelId);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Parcel deleted successfully!",
            data: deletedParcel,
        });
    }
);

const getAllShipmentParcels = catchAsync(
    async (req: Request, res: Response) => {
        const queryParams = req.query;

        const result = await DashboardService.getAllShipmentParcels(queryParams);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Parcels fetched successfully",
            data: result.parcels,
            meta: result.pagination,
        });
    }
);

const assignedParcelAgent = catchAsync(
    async (req: Request, res: Response) => {
        const { parcelId, agentId } = req.query;

        if (!parcelId) {
            throw new AppError(400, "parcelId is required");
        }

        const result = await DashboardService.assignedParcelAgent(
            parcelId as string,
            agentId as string | undefined
        );

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: agentId ? "Agent assigned successfully" : "Agent removed successfully",
            data: result,
        });
    }
);

const getParcelsDetails = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const result = await DashboardService.getParcelsDetails(id as string);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Parcel details fetched successfully!",
        data: result,
    });
});


export const DashboardController = {
    createShipmentParcel,
    updateShipmentParcel,
    deleteShipmentParcel,
    getAllShipmentParcels,
    assignedParcelAgent,
    getParcelsDetails
};