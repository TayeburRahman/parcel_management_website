"use client";

import PageContainer from "@/components/container/PageContainer";
import Pagination from "@/components/pagination/Pagination";
import ParcelTable from "@/components/table/parcel-table/ParcelTable";
import { useGetAssignedParcelsQuery } from "@/redux/features/parcel/parcelApi";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import TableLoader from "@/components/loader/TableLoader";
import "react-datepicker/dist/react-datepicker.css";
import socket from "@/socket/socket";

const AssignedParcelPage = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useGetAssignedParcelsQuery({ page, query });

  const paged = data?.data?.parcels || [];

  const pageCount = Math.ceil(data?.data?.meta?.total / pageSize) || 1;
  const filtered = { length: data?.data?.meta?.total || 0 };

  const handleStatusUpdate = (parcelId, newStatus) => {
    socket.emit("update_parcel_status", { parcelId, status: newStatus });
  };

  useEffect(() => {
    socket.on("parcel_status_updated", (updatedParcel) => {
      refetch();
    });

    return () => {
      socket.off("parcel_status_updated");
    };
  }, [refetch]);

  console.log("data", data)

  return (
    <PageContainer>
      <div className="flex flex-wrap gap-2 justify-between items-center mb-2">
        <h1 className="font-medium">Assigned Parcels</h1>
        <div className="flex flex-wrap gap-2 items-end">
          <div className="relative">
            <FiSearch className="absolute text-gray-400 -translate-y-1/2 left-2 top-1/2" size={14} />
            <input
              placeholder="Search here..."
              value={query}
              onChange={(e) => { setPage(1); setQuery(e.target.value); }}
              className="w-full pl-8 pr-4 py-1 text-sm placeholder:text-xs rounded-sm border border-gray-300 focus:ring-1 focus:ring-primary transition-all duration-300 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="overflow-auto md:h-[calc(100vh-175px)] h-[calc(100vh-240px)] scrl-hide rounded-md border border-gray-200">
        {isLoading ? <TableLoader /> : <ParcelTable paged={paged} onStatusUpdate={handleStatusUpdate} />}
      </div>
      <Pagination
        {...{ page, setPage, pageCount, pageSize, filtered }}
      />
    </PageContainer>
  );
};

export default AssignedParcelPage;
