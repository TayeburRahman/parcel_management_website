import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { AdminService } from './admin.service';
import sendResponse from '../../../shared/sendResponse';
import { IAccount } from '../auth/auth.interface';

const blockUnblockAuthUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.blockUnblockAuthUser(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successful!",
    data: result,
  });
});

const createAccount = catchAsync(async (req: Request, res: Response) => {
  const body = req.body as IAccount;
  const result = await AdminService.createAccount(body as IAccount);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Account has been created successfully.",
    data: result,
  });
});

const adminDeleteAccount = catchAsync(async (req: Request, res: Response) => {
  const email = req.query.email as string;
  const result = await AdminService.deleteAccount(email);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successful!",
    data: result,
  });
});


const getAccounts = catchAsync(async (req: Request, res: Response) => {
  const filters = req.query;
  const result = await AdminService.getAccounts(filters);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successful!",
    data: result,
  });
});


export const AdminController = {
  blockUnblockAuthUser,
  getAccounts,
  createAccount,
  adminDeleteAccount
};