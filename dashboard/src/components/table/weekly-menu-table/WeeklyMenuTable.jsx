"use client";
import Image from "next/image";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const WeeklyMenuTable = ({ paged, handleBlock, handleView }) => {
  return (
    <>
      <table className="min-w-full text-sm">
        <thead className="bg-primary text-white sticky top-0">
          <tr className="*:font-normal *:px-4 *:py-2 *:text-start">
            <th>SL</th>
            <th>Dish Image</th>
            <th>Name</th>
            <th>Meal Type</th>
            <th>Company</th>
            <th className="text-center!">Action</th>
          </tr>
        </thead>
        <tbody>
          {paged.map((menu, idx) => (
            <tr
              key={menu._id}
              className="hover:bg-green-100 text-xs transition-all duration-200 *:border-b *:border-gray-200 *:px-4 *:py-4 *:text-start"
            >
              <td>{idx + 1}</td>
              <td>
                <div className="flex justify-start">
                  <Image
                    src={menu?.menuImage}
                    alt="menuImage"
                    width={40}
                    height={40}
                    className="rounded-full w-8 h-8 object-cover"
                    unoptimized
                  />
                </div>
              </td>
              <td>{menu?.dishName}</td>
              <td>{menu?.mealType?.join(", ")}</td>
              <td>{menu?.company}</td>
              <td>
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => handleView(menu)}
                    className="text-primary hover:text-primary/80 cursor-pointer p-1 rounded-sm bg-primary/10 transition-all duration-200"
                  >
                    <MdOutlineRemoveRedEye size={18} />
                  </button>
                  <button
                    onClick={() => handleBlock(menu?._id)}
                    className="text-red-400 hover:text-red-600 cursor-pointer p-1 rounded-sm bg-red-100 transition-all duration-200"
                  >
                    <AiOutlineDelete size={18} />
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

export default WeeklyMenuTable;
