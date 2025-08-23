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


export const AgentService = {
  getMyAssailedParcels
};

