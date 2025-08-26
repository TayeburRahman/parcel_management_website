import mongoose, { Document } from 'mongoose';

export interface ILocation {
  type: 'Point';
  coordinates: number[];
}

export interface IAgents extends Document {
  authId: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  address?: string | null;
  phone_number?: string | null;
  vehicleType: String;
  profile_image?: string | null;
  location?: ILocation;
  assignedParcels: mongoose.Schema.Types.ObjectId[];
  totalDeliveries: number;
  rating?: number;
  status: "active" | "deactivate" | "declined";
  createdAt?: Date;
  updatedAt?: Date;
}