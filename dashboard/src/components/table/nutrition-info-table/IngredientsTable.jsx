"use client";
import { AiOutlineDelete } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md"; 

const IngredientsTable = ({ paged, handleDelete, handleEdit }) => {
  return (
    <>
      <table className="min-w-full text-sm">
        <thead className="bg-primary text-white sticky top-0">
          <tr className="*:font-normal *:px-4 *:py-2 *:text-start">
            <th>SL</th>
            <th>Ingredient Name</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th className="text-center!">Action</th>
          </tr>
        </thead>
        <tbody>
          {paged.map((ingredientItem, idx) => (
            <tr
              key={ingredientItem.ingredientId || idx}
              className="hover:bg-gray-100 *:font-normal text-xs *:px-4 *:py-4 *:text-start *:border-b *:border-gray-200 transition-all duration-200"
            >
              <td>{idx + 1}</td>
              <td>{ingredientItem.name}</td>
              <td>{ingredientItem.quantity}</td>
              <td>{ingredientItem.unit}</td>
              <td>
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => handleEdit(ingredientItem)}
                    className="text-green-500 hover:text-green-700 cursor-pointer p-1 rounded-sm bg-green-100 transition-all duration-200"
                    title="Edit Ingredient"
                  >
                    <MdModeEditOutline size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(ingredientItem.ingredientId)}
                    className="text-red-400 hover:text-red-600 cursor-pointer p-1 rounded-sm bg-red-100 transition-all duration-200"
                    title="Delete Ingredient"
                  >
                    <AiOutlineDelete size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {paged.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No ingredients data available for this dish.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default IngredientsTable;