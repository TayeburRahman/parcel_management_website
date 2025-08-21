import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { DashboardService } from './dashboard.service';
import { IParcel } from './dashboard.interface';
import AppError from '../../../errors/AppError';

const createShipmentParcel = catchAsync(async (req: Request, res: Response) => {
    const result = await DashboardService.createShipmentParcel(req.body as IParcel);
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

export const DashboardController = {
    createShipmentParcel,
    updateShipmentParcel,
    deleteShipmentParcel
};