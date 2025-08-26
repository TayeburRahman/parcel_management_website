"use client";

import PageContainer from "@/components/container/PageContainer";
import ConfirmModal from "@/components/modal/confirm-modal/ConfirmModal";
import Pagination from "@/components/pagination/Pagination";
import ParcelTable from "@/components/table/parcel-table/ParcelTable";
import { useDeleteParcelMutation, useGetMyParcelsQuery } from "@/redux/features/parcel/parcelApi";
import toast from "react-hot-toast";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import TableLoader from "@/components/loader/TableLoader"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { IoAdd } from "react-icons/io5";
import AddMenuModal from "@/components/modal/add-parcel-modal/AddParcelModal";

const ParcelBookingPage = () => {  
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [addMenuModal, setAddMenuModal] = useState(false); 

  const { data, isLoading, refetch } = useGetMyParcelsQuery({});
  const [deleteParcel, { isLoading: isDeleting }] = useDeleteParcelMutation();
  const paged = data?.data || []; 

  const handleDeleteClick = (_id) => {
    setSelectedItem(_id);
    setConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await deleteParcel(selectedItem).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Parcel deleted successfully!");
        setConfirmModal(false);
        setSelectedItem(null);
        refetch();  
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete parcel.");
    }
  };

  const handleAddMenu = () => {
    setAddMenuModal(true);
  };

  const onAddParcelSuccess = () => {
    refetch();
  };

  return (
    <PageContainer>
      <div className="flex flex-wrap gap-2 justify-between items-center mb-2">
        <h1 className="font-medium">Parcel Booking</h1>
        <div className="flex flex-wrap gap-2 items-end"> 
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

      <div className="overflow-auto md:h-[calc(100vh-175px)] h-[calc(100vh-240px)] scrl-hide rounded-md border border-gray-200">
        {isLoading ? <TableLoader /> : <ParcelTable paged={paged} handleDelete={handleDeleteClick} />}
      </div>

      <AddMenuModal
        setAddMenuModal={setAddMenuModal}
        addMenuModal={addMenuModal}
        onAddParcelSuccess={onAddParcelSuccess}
      />

      <ConfirmModal
        setConfirmModal={setConfirmModal}
        confirmModal={confirmModal}
        message="Are you sure you want to delete this parcel?"
        onConfirm={confirmDelete}
        isLoading={isDeleting}
      />
    </PageContainer>
  );
};

export default ParcelBookingPage;
