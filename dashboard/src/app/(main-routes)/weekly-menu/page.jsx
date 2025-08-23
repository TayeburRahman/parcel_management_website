"use client";
import { Calendar } from "lucide-react";
import PageContainer from "@/components/container/PageContainer";
import ConfirmModal from "@/components/modal/confirm-modal/ConfirmModal";
import Pagination from "@/components/pagination/Pagination";
import WeeklyMenuTable from "@/components/table/weekly-menu-table/WeeklyMenuTable";
import { weeklyMenu } from "@/data/data";
import { useState } from "react";
import SelectField from "@/components/helper/select-helper/SelectField";
import { useForm } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { IoAdd } from "react-icons/io5";
import MenuViewModal from "@/components/modal/menu-view-modal/MenuViewModal";
import AddMenuModal from "@/components/modal/add-menu-modal/AddMenuModal";

const WeeklyMenuPage = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [viewModal, setViewModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [addMenuModal, setAddMenuModal] = useState(false);

  const [startDate, setStartDate] = useState(new Date());

  // React Hook Form
  const { register, watch, setValue } = useForm({
    defaultValues: {
      selectedMealType: "",
    },
  });

  const selectedMealType = watch("selectedMealType");

  // Meal type options
  const mealTypeOptions = [
    { value: "breakfast", label: "Breakfast" },
    { value: "lunch", label: "Lunch" },
    { value: "dinner", label: "Dinner" },
    { value: "snacks", label: "Snacks" },
  ];

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

  const pageCount = Math.ceil(weeklyMenu.length / pageSize);
  const paged = weeklyMenu.slice((page - 1) * pageSize, page * pageSize);

  return (
    <PageContainer>
      <div className="flex flex-wrap gap-2 justify-between items-center mb-2">
        <h1 className="font-medium">Weekly Menu</h1>
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

          {/* Select Meal Type Dropdown */}
          <div className="min-w-[140px] relative">
            <SelectField
              name="selectedMealType"
              options={mealTypeOptions}
              register={register}
              defaultOption="Select Meal Type"
            />
            <div className="absolute top-1/2 -translate-y-1/2 right-2 transform text-gray-400">
              <IoIosArrowDown size={12} />
            </div>
          </div>

          {/* Add Button */}
          <div>
            <button
              onClick={handleAddMenu}
              className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-sm text-xs font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 cursor-pointer"
            >
              <IoAdd className="h-4 w-4" />
              Add Menu
            </button>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="overflow-auto md:h-[calc(100vh-175px)] h-[calc(100vh-240px)] scrl-hide rounded-md border border-gray-200">
        <WeeklyMenuTable
          paged={paged}
          handleBlock={handleBlock}
          handleView={handleView}
        />
      </div>

      {/* Pagination */}
      <Pagination
        {...{ page, setPage, pageCount, pageSize, filtered: weeklyMenu }}
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

export default WeeklyMenuPage;
