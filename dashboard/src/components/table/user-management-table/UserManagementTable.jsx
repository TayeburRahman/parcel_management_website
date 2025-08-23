"use client"
import Image from "next/image";
import { MdBlockFlipped, MdOutlineRemoveRedEye } from "react-icons/md";

const ClientsAndPlantsTable = ({ paged, handleBlock, handleView }) => {
  return (
    <>
      <table className="min-w-full text-sm">
        <thead className="bg-primary text-white sticky top-0">
          <tr className="*:font-normal *:px-4 *:py-2 *:text-start">
            <th>SL</th>
            <th>Name</th>
            <th>Email</th>
            <th>Client</th>
            <th>Status</th>
            <th className="text-center!">Action</th>
          </tr>
        </thead>
        <tbody>
          {paged.map((user, idx) => (
            <tr
              key={user._id}
              className="hover:bg-gray-100 *:font-normal text-xs *:px-4 *:py-4 *:text-start *:border-b *:border-gray-200 transition-all duration-200"
            >
              <td>{idx + 1}</td>
              <td className="flex items-center">
                <Image
                  src={user?.photoUrl}
                  alt="userImage"
                  width={500}
                  height={500}
                  priority
                  className="w-7 h-7 rounded-full mr-2"
                />
                {user?.userName}
              </td>
              <td>{user?.userEmail}</td>
              <td>{user?.companyName}</td>
              <td>{user?.status}</td>
              <td>
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => handleView(user)}
                    className="text-primary hover:text-primary/80 cursor-pointer p-1 rounded-sm bg-primary/10 transition-all duration-200"
                  >
                    <MdOutlineRemoveRedEye size={18} />
                  </button>
                  <button
                    onClick={() => handleBlock(user?._id)}
                    className="text-red-400 hover:text-red-600 cursor-pointer p-1 rounded-sm bg-red-100 transition-all duration-200"
                  >
                    <MdBlockFlipped size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ClientsAndPlantsTable;
