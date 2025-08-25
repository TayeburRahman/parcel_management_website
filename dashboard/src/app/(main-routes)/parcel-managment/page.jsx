"use client";

import PageContainer from "@/components/container/PageContainer";
import ConfirmModal from "@/components/modal/confirm-modal/ConfirmModal";
import Pagination from "@/components/pagination/Pagination";
import ParcelTable from "@/components/table/parcel-table/ParcelTable";
import { useGetParcelsQuery } from "@/redux/features/parcel/parcelApi";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import TableLoader from "@/components/loader/TableLoader";
import { Calendar } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"; 
import { IoAdd } from "react-icons/io5";
import MenuViewModal from "@/components/modal/menu-view-modal/MenuViewModal";
import AddMenuModal from "@/components/modal/add-menu-modal/AddMenuModal";

const ParcelManagementPage = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [viewModal, setViewModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [addMenuModal, setAddMenuModal] = useState(false);
  const [startDate, setStartDate] = useState(null);

  const { data, isLoading } = useGetParcelsQuery({ page, query, date: startDate ? format(startDate, "yyyy-MM-dd") : "" });
  const paged = data?.data?.results || [];

  const pageCount = Math.ceil(data?.data?.meta?.total / pageSize);
  const filtered = { length: data?.data?.meta?.total || 0 };

  const handleView = (item) => {
    setSelectedItem(item);
    setViewModal(true);
  };

  const handleBlock = (_id) => {
    setConfirmModal(true);
    console.log(_id);
  };

  const handleAddMenu = () => {
    console.log("add button clicked");
    setAddMenuModal(true);
  };

  return (
    <PageContainer>
      <div className="flex flex-wrap gap-2 justify-between items-center mb-2">
        <h1 className="font-medium">Parcel Management</h1>
        <div className="flex flex-wrap gap-2 items-end">
          {/* DatePicker Component */}
          <div className="min-w-[140px]k relative">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-sm text-xs font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary"
              customInput={
                <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-sm text-xs font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200">
                  <Calendar className="h-4 w-4" />
                  {startDate
                    ? format(startDate, "dd MMMM yyyy")
                    : "Select Date"}
                  <IoIosArrowDown className="ml-1" />
                </button>
              }
              popperContainer={({ children }) => (
                <div style={{ zIndex: 9999 }}>{children}</div>
              )}
              popperPlacement="bottom-start"
            />
          </div>

          {/* Search Input */}
          <div className="relative">
            <FiSearch className="absolute text-gray-400 -translate-y-1/2 left-2 top-1/2" size={14} />
            <input
              placeholder="Search here..."
              value={query}
              onChange={(e) => { setPage(1); setQuery(e.target.value); }}
              className="w-full pl-8 pr-4 py-1 text-sm placeholder:text-xs rounded-sm border border-gray-300 focus:ring-1 focus:ring-primary transition-all duration-300 focus:outline-none"
            />
          </div>

          {/* Add Button */}
          <div>
            <button
              onClick={handleAddMenu}
              className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-sm text-xs font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 cursor-pointer"
            >
              <IoAdd className="h-4 w-4" />
              Add Parcel
            </button>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="overflow-auto md:h-[calc(100vh-175px)] h-[calc(100vh-240px)] scrl-hide rounded-md border border-gray-200">
        {isLoading ? <TableLoader /> : <ParcelTable paged={paged} handleBlock={handleBlock} handleView={handleView} />}
      </div>

      {/* Pagination */}
      <Pagination
        {...{ page, setPage, pageCount, pageSize, filtered }}
      />

      {/* View Modal */}
      <MenuViewModal
        setViewModal={setViewModal}
        viewModal={viewModal}
        data={selectedItem}
      />

      {/* Add Menu Modal */}
      <AddMenuModal
        setAddMenuModal={setAddMenuModal}
        addMenuModal={addMenuModal}
      />

      {/* Confirm Modal */}
      <ConfirmModal
        setConfirmModal={setConfirmModal}
        confirmModal={confirmModal}
        message="Are you sure you want to block this item?"
      />
    </PageContainer>
  );
};

export default ParcelManagementPage;
