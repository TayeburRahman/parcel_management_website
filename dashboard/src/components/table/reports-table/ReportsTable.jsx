"use client";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const ReportsTable = ({ paged, handleView, handleDelete }) => {
  return (
    <>
      <table className="min-w-full text-sm">
        <thead className="bg-green-600 text-white sticky top-0"> 
          <tr className="*:font-normal *:px-4 *:py-2 *:text-start">
            <th>SL</th>
            <th>Date</th> 
            <th>Plant</th> 
            <th>Meal Type</th> 
            <th>Employee Count</th> 
            <th>Total Meal</th>
            <th className="text-center!">Action</th>
          </tr>
        </thead>
        <tbody>
          {paged.map((report, idx) => (
            <tr
              key={report._id}
              className="hover:bg-green-100 *:font-normal text-xs *:px-4 *:py-4 *:text-start *:border-b *:border-gray-200 transition-all duration-200"
            >
              <td>{idx + 1}</td>
              <td>{report?.date}</td> 
              <td>{report?.plant}</td>
              <td>{report?.mealType}</td>
              <td>{report?.employeeCount}</td>
              <td>{report?.totalMeal}</td>
              <td>
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => handleView(report)}
                    className="text-primary hover:text-primary/80 cursor-pointer p-1 rounded-sm bg-primary/10 transition-all duration-200"
                  >
                    <MdOutlineRemoveRedEye size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(report?._id)}
                    className="text-red-400 hover:text-red-600 cursor-pointer p-1 rounded-sm bg-red-100 transition-all duration-200"
                  >
                    <RiDeleteBin6Line size={18} />
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

export default ReportsTable;