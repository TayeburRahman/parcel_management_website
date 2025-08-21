import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { DashboardService } from './dashboard.service';

const blockUnblockAuthUser = catchAsync(async (req: Request, res: Response) => {
    const result = await DashboardService.blockUnblockAuthUser(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Successful!",
        data: result,
    });
});


export const DashboardController = {
    blockUnblockAuthUser,
};