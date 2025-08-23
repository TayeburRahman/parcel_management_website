"use client";
import PageContainer from "@/components/container/PageContainer";
import ConfirmModal from "@/components/modal/confirm-modal/ConfirmModal";
import Pagination from "@/components/pagination/Pagination";
import SelectField from "@/components/helper/select-helper/SelectField";
import { useState, useEffect, useMemo } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useForm } from "react-hook-form";
import ReportsTable from "@/components/table/reports-table/ReportsTable";
import ReportViewModal from "@/components/modal/report-view-modal/ReportViewModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { reportsData } from "@/data/data";

const ReportsPage = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [viewModal, setViewModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const { register, watch, setValue } = useForm({
    defaultValues: {
      selectMealType: "",
      selectPlantType: "",
    },
  });

  const selectedMealType = watch("selectMealType");
  const selectedPlantType = watch("selectPlantType");

  const mealTypeOptions = useMemo(() => {
    const types = [...new Set(reportsData.map((report) => report.mealType))];
    return [
      { value: "All", label: "All Meal Types" },
      ...types.map((type) => ({ value: type, label: type })),
    ];
  }, []);

  const plantTypeOptions = useMemo(() => {
    const plants = [...new Set(reportsData.map((report) => report.plant))];
    return [
      { value: "All Plants", label: "All Plant Types" },
      ...plants.map((plant) => ({ value: plant, label: plant })),
    ];
  }, []);

  const handleView = (report) => {
    setSelectedReport(report);
    setViewModal(true);
  };

  const handleDelete = (_id) => {
    setConfirmModal(true);
    console.log("Delete report ID:", _id);
  };

  /* Filter and Paginate */
  const filteredReports = reportsData.filter((report) => {
    // Search by plant, meal type, or date
    const matchesSearchQuery =
      report.plant.toLowerCase().includes(query.toLowerCase()) ||
      report.mealType.toLowerCase().includes(query.toLowerCase()) ||
      report.date.toLowerCase().includes(query.toLowerCase());

    // Filter by selected date (from date picker)
    const matchesDate = startDate
      ? new Date(report.date).toDateString() === startDate.toDateString()
      : true;

    // Filter by meal type
    const matchesMealType = selectedMealType
      ? selectedMealType === "All" || report.mealType === selectedMealType
      : true;

    // Filter by plant type
    const matchesPlantType = selectedPlantType
      ? selectedPlantType === "All Plants" || report.plant === selectedPlantType
      : true;

    return (
      matchesSearchQuery && matchesDate && matchesMealType && matchesPlantType
    );
  });

  const pageCount = Math.ceil(filteredReports.length / pageSize);
  const pagedReports = filteredReports.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  useEffect(() => {
    setPage(1);
  }, [query, startDate, selectedMealType, selectedPlantType]);

  return (
    <PageContainer>
      {/* header + filters */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
        <h1 className="font-medium text-lg mb-2 md:mb-0">Reports</h1>
        <div className="flex flex-wrap items-center gap-2">
          {/* Date Picker (Calendar) */}
          <div className="relative w-36">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Select Date"
              className="w-full pl-3 pr-8 py-1 text-sm placeholder:text-xs rounded-sm border border-gray-300 focus:ring-1 focus:ring-primary transition-all duration-300 focus:outline-none"
              dateFormat="d MMM yyyy"
              popperContainer={({ children }) => (
                <div style={{ zIndex: 9999 }}>{children}</div>
              )}
              popperPlacement="bottom-start"
            />
            <div className="absolute top-1/2 -translate-y-1/2 right-2 transform text-gray-400 pointer-events-none">
              <IoIosArrowDown size={12} />
            </div>
          </div>

          {/* Select Meal Type (Dynamic Options) */}
          <div className="relative w-36">
            <SelectField
              register={register}
              name="selectMealType"
              options={mealTypeOptions}
              defaultOption="Select Meal Types"
            />
            <div className="absolute top-1/2 -translate-y-1/2 right-2 transform text-gray-400 pointer-events-none">
              <IoIosArrowDown size={12} />
            </div>
          </div>

          {/* Select Plant Type (Dynamic Options) */}
          <div className="relative w-36">
            <SelectField
              register={register}
              name="selectPlantType"
              options={plantTypeOptions}
              defaultOption="Select Plant Types"
            />
            <div className="absolute top-1/2 -translate-y-1/2 right-2 transform text-gray-400 pointer-events-none">
              <IoIosArrowDown size={12} />
            </div>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="overflow-auto md:h-[calc(100vh-175px)] h-[calc(100vh-240px)] scrl-hide rounded-md border border-gray-200">
        <ReportsTable
          paged={pagedReports}
          handleDelete={handleDelete}
          handleView={handleView}
        />
      </div>

      {/* Pagination */}
      <Pagination
        {...{ page, setPage, pageCount, pageSize, filtered: filteredReports }}
      />

      {/* View Modal for Reports */}
      <ReportViewModal
        setViewModal={setViewModal}
        viewModal={viewModal}
        data={selectedReport}
      />

      {/* Confirm Modal for Deletion (not block) */}
      <ConfirmModal
        setConfirmModal={setConfirmModal}
        confirmModal={confirmModal}
        message="Are you sure you want to delete this report?"
      />
    </PageContainer>
  );
};

export default ReportsPage;
