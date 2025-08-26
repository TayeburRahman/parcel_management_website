import Parcel from '../dashboard/dashboard.model';
import { IParcel, IQueryParams } from '../dashboard/dashboard.interface';
import QueryBuilder from '../../../builder/QueryBuilder';
import Agents from './agents.model';

const getMyAssailedParcels = async (agentId: string, queryParams: IQueryParams) => {

  if (queryParams.searchTerm) {
    delete queryParams.page
  }

  const queryBuilder = new QueryBuilder<IParcel>(Parcel.find({ agentId }), queryParams);

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

  const parcels = await parcelsQuery.exec();
  const pagination = await queryBuilder.countTotal();

  return { parcels, pagination };
}

const updateParcelStatusByAgent = async (
  parcelId: string,
  status: string
) => {
  try {
    console.log('===', status)
    const allowedStatuses = ["PENDING", "PICKED_UP", "IN_TRANSIT", "DELIVERED", "FAILED"];
    if (!allowedStatuses.includes(status)) {
      throw new Error('Invalid status update.');
    }

    const updatedParcel = await Parcel.findOneAndUpdate(
      { _id: parcelId },
      { status },
      { new: true }
    ).populate({
      path: 'customerId',
      select: 'name email phone_number profile_image',
    });

    if (!updatedParcel) {
      throw new Error('Parcel not found or unauthorized update.');
    }

    return updatedParcel;
  } catch (error: any) {
    throw new Error(`Error updating parcel status: ${error.message}`);
  }
};

const updateAgentLocation = async (
  agentId: string,
  lat: number,
  lng: number
) => {
  try {
    const updatedAgent = await Agents.findOneAndUpdate(
      { _id: agentId },
      {
        location: {
          type: 'Point',
          coordinates: [lng, lat],
        },
      },
      { new: true }
    );

    if (!updatedAgent) {
      throw new Error('Agent not found.');
    }

    return updatedAgent;
  } catch (error: any) {
    throw new Error(`Error updating agent location: ${error.message}`);
  }
};

export const AgentService = {
  getMyAssailedParcels,
  updateParcelStatusByAgent,
  updateAgentLocation,
};

