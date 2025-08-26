"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiSearch } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import toast from "react-hot-toast";

import PageContainer from "@/components/container/PageContainer";
import ConfirmModal from "@/components/modal/confirm-modal/ConfirmModal";
import AddMenuModal from "@/components/modal/add-parcel-modal/AddParcelModal";
import AssignAgentModal from "@/components/modal/assign-agent-modal/AssignAgentModal";
import Pagination from "@/components/pagination/Pagination";
import ParcelTable from "@/components/table/parcel-table/ParcelTable";
import TableLoader from "@/components/loader/TableLoader";

import { useGetParcelsQuery, useDeleteParcelMutation, useLazyExportPdfQuery } from "@/redux/features/parcel/parcelApi";

const ParcelManagementPage = () => {
  const pageSize = 10;

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [exportType, setExportType] = useState("weekly");

  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [addMenuModal, setAddMenuModal] = useState(false);
  const [assignAgentModal, setAssignAgentModal] = useState(false);
  const [parcelIdToAssign, setParcelIdToAssign] = useState(null);

  const { data, isLoading, refetch } = useGetParcelsQuery({
    page,
    query,
    date: startDate ? format(startDate, "yyyy-MM-dd") : ""
  });

  const [deleteParcel, { isLoading: isDeleting }] = useDeleteParcelMutation();
  const [triggerExportPdf, { data: pdfBlob, isFetching: isExportingPdf, error: exportError }] = useLazyExportPdfQuery();

  const paged = data?.data || [];
  const pageCount = Math.ceil(data?.meta?.total / pageSize);
  const filtered = { length: data?.meta?.total || 0 };

  // -------------------- Delete Parcel --------------------
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

  // -------------------- Add Parcel --------------------
  const handleAddMenu = () => setAddMenuModal(true);
  const onAddParcelSuccess = () => refetch();

  // -------------------- Assign Agent --------------------
  const onAssignAgentClick = (parcelId) => {
    setParcelIdToAssign(parcelId);
    setAssignAgentModal(true);
  };
  const onAgentAssignedSuccess = () => refetch();

  // -------------------- Export PDF --------------------
useEffect(() => {
  if (pdfBlob) {
    const url = window.URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `parcel_report_${exportType}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
    toast.success("PDF exported successfully!");
  }
  if (exportError) {
    console.error("PDF export error:", exportError);
    toast.error("Failed to export PDF.");
  }
}, [pdfBlob, exportError, exportType]);

const handleExportPdf = () => {
  triggerExportPdf({
    type: exportType,
    date: startDate ? format(startDate, "yyyy-MM-dd") : ""
  });
};

  return (
    <PageContainer>
      {/* -------------------- Header & Filters -------------------- */}
      <div className="flex flex-wrap gap-2 justify-between items-center mb-2">
        <h1 className="font-medium">Parcel Management</h1>
        <div className="flex flex-wrap gap-2 items-end">
          <div className="min-w-[140px] relative">
            <div className="flex gap-2 items-center">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select Date"
                className="px-3 py-1.5 border border-gray-300 rounded-sm text-xs font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                onClick={() => setStartDate(null)}
                className="px-2 py-1 text-xs font-medium text-gray-500 border border-green-700 rounded-sm hover:bg-red-50 transition-all"
              >
                All
              </button>
            </div>
          </div>

          <div className="relative">
            <FiSearch className="absolute text-gray-400 -translate-y-1/2 left-2 top-1/2" size={14} />
            <input
              placeholder="Search here..."
              value={query}
              onChange={(e) => { setPage(1); setQuery(e.target.value); }}
              className="w-full pl-8 pr-4 py-1 text-sm placeholder:text-xs rounded-sm border border-gray-300 focus:ring-1 focus:ring-primary transition-all duration-300 focus:outline-none"
            />
          </div>

          <div className="relative">
            <select
              value={exportType}
              onChange={(e) => setExportType(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-sm text-xs font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div>
            <button
              onClick={handleExportPdf}
              disabled={isExportingPdf}
              className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-sm text-xs font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 cursor-pointer disabled:opacity-50"
            >
              {isExportingPdf ? "Exporting..." : "Export PDF"}
            </button>
          </div>

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

      {/* -------------------- Parcel Table -------------------- */}
      <div className="overflow-auto md:h-[calc(100vh-175px)] h-[calc(100vh-240px)] scrl-hide rounded-md border border-gray-200">
        {isLoading ? (
          <TableLoader />
        ) : (
          <ParcelTable
            paged={paged}
            handleDelete={handleDeleteClick}
            onAssignAgentClick={onAssignAgentClick}
          />
        )}
      </div>

      <Pagination page={page} setPage={setPage} pageCount={pageCount} pageSize={pageSize} filtered={filtered} />

      {/* -------------------- Modals -------------------- */}
      <AddMenuModal
        setAddMenuModal={setAddMenuModal}
        addMenuModal={addMenuModal}
        onAddParcelSuccess={onAddParcelSuccess}
      />

      <AssignAgentModal
        assignAgentModal={assignAgentModal}
        setAssignAgentModal={setAssignAgentModal}
        parcelIdToAssign={parcelIdToAssign}
        onAgentAssignedSuccess={onAgentAssignedSuccess}
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

export default ParcelManagementPage;
