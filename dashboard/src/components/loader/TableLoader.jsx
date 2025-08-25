import React from "react";

const TableLoader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
};

export default TableLoader;
