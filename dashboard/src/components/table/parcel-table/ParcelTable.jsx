import TableLoader from "@/components/loader/TableLoader";

const ParcelTable = ({ paged, handleBlock, handleView }) => {
  if (!paged) {
    return <TableLoader />;
  }

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Sender
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Receiver
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {paged.length === 0 ? (
          <tr>
            <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
              No parcels found.
            </td>
          </tr>
        ) : (
          paged.map((parcel) => (
            <tr key={parcel.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {parcel.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {parcel.senderName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {parcel.receiverName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {parcel.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleView(parcel)}
                  className="text-indigo-600 hover:text-indigo-900 mr-2"
                >
                  View
                </button>
                <button
                  onClick={() => handleBlock(parcel.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Block
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ParcelTable;