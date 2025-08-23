"use client";
import { MdBlockFlipped, MdOutlineRemoveRedEye } from "react-icons/md";

const ClientsAndPlantsTable = ({ paged, handleBlock, handleView }) => {
  return (
    <>
      <table className="min-w-full text-sm">
        <thead className="bg-primary text-white sticky top-0">
          <tr className="*:font-normal *:px-4 *:py-2 *:text-start">
            <th>SL</th>
            <th>Company Name</th>
            <th>Plants</th>
            <th>Active Employees</th>
            <th>Status</th>
            <th className="text-center!">Action</th>
          </tr>
        </thead>
        <tbody>
          {paged.map((company, idx) => (
            <tr
              key={company._id}
              className="hover:bg-green-100 *:font-normal text-xs *:px-4 *:py-4 *:text-start *:border-b *:border-gray-200 transition-all duration-200"
            >
              <td>{idx + 1}</td>
              <td>{company?.companyName}</td>
              <td>{company?.plants}</td>
              <td>{company?.activeEmployees}</td>
              <td>{company?.status}</td>
              <td>
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => handleView(company)}
                    className="text-primary hover:text-primary/80 cursor-pointer p-1 rounded-sm bg-primary/10 transition-all duration-200"
                  >
                    <MdOutlineRemoveRedEye size={18} />
                  </button>
                  <button
                    onClick={() => handleBlock(company?._id)}
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
