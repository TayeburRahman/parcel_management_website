import catchAsync from "../../../shared/catchasync";
import sendResponse from "../../../shared/sendResponse";
import { IReqUser } from "../auth/auth.interface";
import { Request, Response } from 'express';
import { AgentService } from "./agents.service";

const getMyAssailedParcels = catchAsync(async (req: Request, res: Response) => {
    const user = req.user as IReqUser;
    const query = req.query;
    const result = await AgentService.getMyAssailedParcels(user.userId as string, query);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User retrieved successfully",
        data: result,
    });
});



export const AgentController = {
    getMyAssailedParcels
};
