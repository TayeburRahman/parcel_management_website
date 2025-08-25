"use client"
import { baseUrl } from "@/redux/features/api/apiSlice";
import Image from "next/image";
import { MdBlockFlipped, MdOutlineRemoveRedEye } from "react-icons/md";

const UserManagementTable = ({ paged = [], onBlockUnblockClick, isBlockingLoading }) => {
  return (
    <>
      <table className="min-w-full text-sm">
        <thead className="bg-primary text-white sticky top-0">
          <tr className="*:font-normal *:px-4 *:py-2 *:text-start">
            <th>SL</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Date</th>
            <th className="text-center!">Action</th>
          </tr>
        </thead>
        <tbody>
          {paged?.map((user, idx) => (
            <tr
              key={user._id}
              className="hover:bg-gray-100 *:font-normal text-xs *:px-4 *:py-4 *:text-start *:border-b *:border-gray-200 transition-all duration-200"
            >
              <td>{idx + 1}</td>
              <td>
                <Image
                  src={`${baseUrl}/${user?.profile_image}` || "/images/avatar.jpg"}
                  alt="userImage"
                  width={500}
                  height={500}
                  priority
                  className="w-7 h-7 rounded-full mr-2"
                />
              </td>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.status}</td>
              <td>{new Date(user?.createdAt).toLocaleDateString()}</td>
              <td>
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => onBlockUnblockClick(user)}
                    className={`p-1 rounded-sm transition-all duration-200 ${
                      user?.status === "active"
                        ? "text-red-400 hover:text-red-600 bg-red-100"
                        : "text-green-400 hover:text-green-600 bg-green-100"
                    }`}
                    disabled={isBlockingLoading}
                  >
                    {user?.status === "active" ? (
                      <MdBlockFlipped size={18} />
                    ) : (
                      <MdOutlineRemoveRedEye size={18} />
                    )}
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

export default UserManagementTable;
