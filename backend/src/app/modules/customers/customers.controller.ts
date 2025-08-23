import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchasync";
import { IReqUser } from "../auth/auth.interface";
import { CustomerServices } from "./customers.service";



const getMyParcels = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.user as IReqUser;

    const result = await CustomerServices.getMyParcels(userId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Parcels fetched successfully",
        data: result,
    });
});



export const CustomerController = {
    getMyParcels
};

