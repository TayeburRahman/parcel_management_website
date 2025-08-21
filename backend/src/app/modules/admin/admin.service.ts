import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import Auth from "../auth/auth.model";
import { BlockUnblockPayload, IAdmin, IRequest } from "./admin.interface";
import Admin from "./admin.model";
import { ENUM_USER_ROLE } from "../../../enums/user";
import Customers from "../customers/customers.model";
import { createActivationToken } from "../../../utils/createActivationToken";
import { IAccount, IAuth } from "../auth/auth.interface";
import Agents from "../agents/agents.model";

const createAccount = async (payload: IAccount) => {
  const { role, password, email, ...other } = payload;

  if (role !== ENUM_USER_ROLE.CUSTOMERS && role !== ENUM_USER_ROLE.AGENT) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Only Customer or Agent registration is allowed!");
  }

  if (!password || !email) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email, Password, and Confirm Password are required!");
  }

  const existingAuth = await Auth.findOne({ email }).lean();
  if (existingAuth?.isActive) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists");
  }

  if (existingAuth && !existingAuth.isActive) {
    await Promise.all([
      existingAuth.role === ENUM_USER_ROLE.CUSTOMERS && Customers.deleteOne({ authId: existingAuth._id }),
      existingAuth.role === ENUM_USER_ROLE.AGENT && Agents.deleteOne({ authId: existingAuth._id }),
      Auth.deleteOne({ email }),
    ]);
  }

  const auth = {
    role,
    name: other.name,
    email,
    password,
    isActive: true,
    expirationTime: Date.now() + 3 * 60 * 1000,
  };

  let createAuth = await Auth.create(auth);
  if (!createAuth) {
    throw new ApiError(500, "Failed to create auth account");
  }

  other.authId = createAuth._id;
  other.email = email;

  // Role-based user creation
  let result;
  switch (role) {
    case ENUM_USER_ROLE.CUSTOMERS:
      result = await Customers.create(other);
      break;
    case ENUM_USER_ROLE.AGENT:
      result = await Agents.create(other);
      break;

    default:
      throw new ApiError(400, "Invalid role provided!");
  }

  const message = "Account has been created successfully.";
  return { result, role, message };
};

const deleteAccount = async (email: string) => {
  const existingAuth = await Auth.findOne({ email }).lean();
  if (!existingAuth) {
    throw new ApiError(httpStatus.NOT_FOUND, "Account not found!");
  }

  await Promise.all([
    existingAuth.role === ENUM_USER_ROLE.CUSTOMERS && Customers.deleteOne({ authId: existingAuth._id }),
    existingAuth.role === ENUM_USER_ROLE.AGENT && Agents.deleteOne({ authId: existingAuth._id }),
    Auth.deleteOne({ email }),
  ]);

  return { success: true, message: `Account with email ${email} deleted successfully.` };
};

const getAccounts = async (filters: { role?: string; searchTerm?: string }) => {
  const { role, searchTerm } = filters;

  let query: any = {};
  if (searchTerm) {
    query.$or = [
      { email: { $regex: searchTerm, $options: "i" } },
      { name: { $regex: searchTerm, $options: "i" } },
    ];
  }

  let results;

  switch (role) {
    case ENUM_USER_ROLE.CUSTOMERS:
      results = await Customers.find(query).populate("authId").lean();
      break;

    case ENUM_USER_ROLE.AGENT:
      results = await Agents.find(query).populate("authId").lean();
      break;

    default:
      const customers = await Customers.find(query).populate("authId").lean();
      const agents = await Agents.find(query).populate("authId").lean();
      results = [...customers, ...agents];
      break;
  }

  return { count: results.length, results, createAccount };
};

const blockUnblockAuthUser = async (payload: BlockUnblockPayload) => {
  const { role, email, is_block } = payload;
  console.log("Blocking/Unblocking User:", role, email, is_block);


  const updatedAuth = await Auth.findOneAndUpdate(
    { email, role },
    { $set: { is_block } },
    { new: true, runValidators: true }
  ).select("role name email is_block");

  console.log("Updated Auth:", updatedAuth);

  if (!updatedAuth) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const statusValue = is_block ? "deactivate" : "active";

  if (role === ENUM_USER_ROLE.CUSTOMERS) {
    const customer = await Customers.findOneAndUpdate(
      { authId: updatedAuth._id },
      { $set: { status: statusValue } }
    );
    if (!customer) throw new ApiError(httpStatus.NOT_FOUND, "Customer not found");
  } else if (role === ENUM_USER_ROLE.ADMIN || role === ENUM_USER_ROLE.SUPER_ADMIN) {
    const admin = await Admin.findOneAndUpdate(
      { authId: updatedAuth._id },
      { $set: { status: statusValue } }
    );
    if (!admin) throw new ApiError(httpStatus.NOT_FOUND, "Admin not found");
  }

  return updatedAuth;
};
// =============Parcels=========================
export const AdminService = {
  blockUnblockAuthUser,
  deleteAccount,
  getAccounts,
  createAccount
};


