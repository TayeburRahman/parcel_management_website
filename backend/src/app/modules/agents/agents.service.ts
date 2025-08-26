import Parcel from '../dashboard/dashboard.model';
import { IParcel, IQueryParams } from '../dashboard/dashboard.interface';
import QueryBuilder from '../../../builder/QueryBuilder';

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

export const AgentService = {
  getMyAssailedParcels,
  updateParcelStatusByAgent
};

