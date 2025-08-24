/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';
export type IEmailOptions = {
  email: string;
  subject: string;
  // template: string;
  // data?: { [key: string]: any };
  html: any;
};
export type IRegistration = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar?: string;
  phone_number?: string;
  role?: string;
};
export type IActivationToken = {
  token: string;
  activationCode: string;
};
export type IActivationRequest = {
  userEmail: string;
  activation_code: string;
};
export type IReqUser = {
  userId: string;
  authId: string;
  role: string;
};

export type Ireting = {
  userId: string;
};

export type IAuth = Document & {
  name: string;
  email: string;
  password: string;
  role: 'CUSTOMERS' | 'AGENT' | 'ADMIN' | 'SUPER_ADMIN';
  verifyCode?: string;
  codeVerify?: boolean;
  activationCode?: string;
  verifyExpire?: Date;
  expirationTime?: Date;
  is_block?: boolean;
  isActive?: boolean;
  confirmPassword: string;
  profile_image: string | null;
  [key: string]: any;
};

export interface IAccount {
  name?: string;
  phone_number?: string;
  password?: string;
  address?: string;
  profile_image?: string;
  role?: "CUSTOMERS" | "ADMIN" | "AGENT" | "SUPER_ADMIN";
  date_of_birth?: string;
  [key: string]: any;
}

export interface IAuthModel extends Model<IAuth> {
  isAuthExist(email: string): Promise<IAuth | null>;
  isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
}

export interface ActivationPayload {
  otp: string;
  email: string;
}


export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}