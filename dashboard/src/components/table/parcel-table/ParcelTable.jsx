import TableLoader from "@/components/loader/TableLoader";
import { baseUrl } from "@/redux/features/api/apiSlice";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const ParcelTable = ({ paged, handleDelete, onAssignAgentClick, onStatusUpdate }) => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  if (!paged) {
    return <TableLoader />;
  }

  const handleViewClick = (parcel) => {
    router.push(`/parcel-management/${parcel._id}`);
  };

  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
  const isAgent = user?.role === 'AGENT';

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shipment ID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
          {isAdmin && (
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agent</th>
          )}
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pickup</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {paged.length === 0 ? (
          <tr>
            <td
              colSpan={isAdmin ? 7 : 6}
              className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"
            >
              No parcels found.
            </td>
          </tr>
        ) : (
         paged&& paged?.map((parcel) => (
            <tr key={parcel._id}> 
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {parcel.shipmentId}
              </td>

              {/* Customer */}
              <td className="px-6 py-4 text-sm text-gray-500">
                {parcel.customerId ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={`${baseUrl}/${parcel.customerId?.profile_image}` || "/default-avatar.png"}
                      alt={parcel.customerId?.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {parcel.customerId?.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {parcel.customerId?.email}
                      </div>
                    </div>
                  </div>
                ) : (
                  "N/A"
                )}
              </td>

              {/* Agent */}
              {isAdmin && (
                <td className="px-6 py-4 text-sm text-gray-500">
                  {parcel.agentId ? (
                    <div className="flex items-center gap-2">
                      <img
                        src={`${baseUrl}/${parcel.agentId?.profile_image}` || "/default-avatar.png"}
                        alt={parcel.agentId?.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {parcel.agentId?.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {parcel.agentId?.email}
                        </div>
                      </div>
                    </div>
                  ) : (
                    onAssignAgentClick ? (
                      <button
                        onClick={() => onAssignAgentClick(parcel._id)}
                        className="text-blue-600 hover:text-blue-900 cursor-pointer"
                      >
                        Unassigned
                      </button>
                    ) : (
                      <span className="text-gray-500">Unassigned</span>
                    )
                  )}
                </td>
              )}
 
              <td className="px-6 py-4 text-sm text-gray-500">
                {parcel.pickupAddress}
              </td>
 
              <td className="px-6 py-4 text-sm text-gray-500">
                {parcel.deliveryAddress}
              </td>
 
              <td className="px-6 py-4 text-sm">
                {isAgent ? (
                  <select defaultValue={parcel.status} onChange={(e) => onStatusUpdate(parcel._id, e.target.value)} className="w-full border border-gray-300 px-3 py-2 rounded-sm text-xs text-gray-700 focus:ring-1 focus:ring-primary focus:outline-none">
                    <option value="PENDING">Pending</option>
                    <option value="PICKED_UP">Picked Up</option>
                    <option value="IN_TRANSIT">In Transit</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="FAILED">Failed</option>
                  </select>
                ) : (
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
                )}
              </td>

              {/* Actions */}
              <td className="px-6 py-4 text-sm font-medium">
                <button
                  onClick={() => handleViewClick(parcel)}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  View  
                </button>
                {handleDelete && (
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ParcelTable;
