"use client";

import PageContainer from "@/components/container/PageContainer";
import { useParams } from "next/navigation";
import { useGetParcelByIdQuery } from "@/redux/features/parcel/parcelApi";
import TableLoader from "@/components/loader/TableLoader";
import { baseUrl } from "@/redux/features/api/apiSlice";
import { format } from "date-fns";
import StaticLocationMap from "@/components/map/StaticLocationMap";

const ParcelDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetParcelByIdQuery(id);

  if (isLoading) {
    return <TableLoader />;
  }

  if (isError) {
    return <div className="text-center text-red-500">Error loading parcel details.</div>;
  }

  const parcel = data?.data;

  if (!parcel) {
    return <div className="text-center text-gray-500">Parcel not found.</div>;
  }

  const pickupLocation = {
    lat: parcel.coordinates?.pickup.lat,
    lon: parcel.coordinates?.pickup.lng,
    address: parcel.pickupAddress,
  };

  const deliveryLocation = {
    lat: parcel.coordinates?.delivery.lat,
    lon: parcel.coordinates?.delivery.lng,
    address: parcel.deliveryAddress,
  };

  return (
    <PageContainer>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-4">Parcel Details: {parcel.shipmentId}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Shipment ID:</p>
              <p className="font-medium">{parcel.shipmentId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status:</p>
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  parcel.status === "DELIVERED"
                    ? "bg-green-100 text-green-800"
                    : parcel.status === "FAILED"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {parcel.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Pickup Address:</p>
              <p className="font-medium">{parcel.pickupAddress}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Delivery Address:</p>
              <p className="font-medium">{parcel.deliveryAddress}</p>
            </div>
            {parcel.customerId && (
              <>
                <div>
                  <p className="text-sm text-gray-600">Customer Name:</p>
                  <div className="flex items-center gap-2">
                    <img
                      src={`${baseUrl}/${parcel.customerId?.profile_image}` || "/default-avatar.png"}
                      alt={parcel.customerId?.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <p className="font-medium">{parcel.customerId?.name}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Customer Email:</p>
                  <p className="font-medium">{parcel.customerId?.email}</p>
                </div>
              </>
            )}
            {parcel.agentId && (
              <>
                <div>
                  <p className="text-sm text-gray-600">Agent Name:</p>
                  <div className="flex items-center gap-2">
                    <img
                      src={`${baseUrl}/${parcel.agentId?.profile_image}` || "/default-avatar.png"}
                      alt={parcel.agentId?.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <p className="font-medium">{parcel.agentId?.name}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Agent Email:</p>
                  <p className="font-medium">{parcel.agentId?.email}</p>
                </div>
              </>
            )}

            <div>
              <p className="text-sm text-gray-600">Package Weight:</p>
              <p className="font-medium">{parcel.package_weight} kg</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Parcel Type:</p>
              <p className="font-medium">{parcel.parcelType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment Method:</p>
              <p className="font-medium">{parcel.paymentMethod}</p>
            </div>
            {parcel.deliveryAmount !== undefined && (
              <div>
                <p className="text-sm text-gray-600">Delivery Amount:</p>
                <p className="font-medium">{parcel.deliveryAmount === "FREE" ? "FREE" : `${parcel.deliveryAmount}`}</p>
              </div>
            )}
            {parcel.return_shipment && (
              <div>
                <p className="text-sm text-gray-600">Return Shipment:</p>
                <p className="font-medium">{parcel.return_shipment}</p>
              </div>
            )}
            {parcel.qrCode && (
              <div>
                <p className="text-sm text-gray-600">QR Code:</p>
                <img src={`${baseUrl}/${parcel.qrCode}`} alt="QR Code" className="w-24 h-24 object-contain" />
              </div>
            )}
            {parcel.createdAt && (
              <div>
                <p className="text-sm text-gray-600">Created At:</p>
                <p className="font-medium">{format(new Date(parcel.createdAt), "PPP p")}</p>
              </div>
            )}
            {parcel.updatedAt && (
              <div>
                <p className="text-sm text-gray-600">Last Updated:</p>
                <p className="font-medium">{format(new Date(parcel.updatedAt), "PPP p")}</p>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">Location Map</h2>
          <StaticLocationMap pickup={pickupLocation} delivery={deliveryLocation} />
        </div>
      </div>
    </PageContainer>
  );
};

export default ParcelDetailsPage;
