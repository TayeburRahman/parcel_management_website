
"use client";
import PageContainer from "@/components/container/PageContainer";
import SelectField from "@/components/helper/select-helper/SelectField";
import ConfirmModal from "@/components/modal/confirm-modal/ConfirmModal";
import NutritionTable from "@/components/table/nutrition-info-table/NutritionTable";
import Pagination from "@/components/pagination/Pagination";
import { nutritionData } from "@/data/data";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import IngredientsTable from "@/components/table/nutrition-info-table/IngredientsTable";
import { Leaf } from "lucide-react";
import EditNutritionModal from "@/components/modal/nutrition-modal/EditNutritionModal";
import EditIngredientModal from "@/components/modal/nutrition-modal/EditIngredientModal";


const NutritionPage = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [confirmModal, setConfirmModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState("nutrition");
  const [filteredNutritionInfo, setFilteredNutritionInfo] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);

  const { register, watch, setValue } = useForm({
    defaultValues: {
      selectDish: "",
    },
  });

  const selectedDishId = watch("selectDish");

  const dishOptions = nutritionData.map(dish => ({
    value: dish._id,
    label: dish.dishName
  }));
  const fullDishOptions = [...dishOptions];


  useEffect(() => {
    let currentNutritionInfo = [];
    let currentIngredients = [];

    if (selectedDishId === "") {
      currentNutritionInfo = nutritionData.flatMap(dish =>
        dish.nutritionInfo.map(ni => ({
          ...ni,
          dishName: dish.dishName,
          dishId: dish._id
        }))
      );
      currentIngredients = nutritionData.flatMap(dish =>
        dish.ingredients.map(ing => ({
          ...ing,
          dishName: dish.dishName,
          dishId: dish._id
        }))
      );
    } else {
      const dish = nutritionData.find(d => d._id === selectedDishId);
      if (dish) {
        currentNutritionInfo = dish.nutritionInfo.map(ni => ({
          ...ni,
          dishName: dish.dishName,
          dishId: dish._id
        }));
        currentIngredients = dish.ingredients.map(ing => ({
          ...ing,
          dishName: dish.dishName,
          dishId: dish._id
        }));
      }
    }
    setFilteredNutritionInfo(currentNutritionInfo);
    setFilteredIngredients(currentIngredients);
    setPage(1);
  }, [selectedDishId]);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditModal(true);
  };

  const handleDelete = (id) => {
    setConfirmModal(true);
  };
  const currentTableData = activeTab === "nutrition" ? filteredNutritionInfo : filteredIngredients;
  const pageCount = Math.ceil(currentTableData.length / pageSize);
  const pagedData = currentTableData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <PageContainer>
      {/* header + select dish */}
      <div className="flex flex-wrap gap-2 justify-between mb-2">
        <div className="flex flex-wrap items-center md:justify-center md:gap-10 gap-2">
          <h1 className="font-medium">Nutrition & Ingredients Info</h1>
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 bg-white rounded-sm border border-gray-200 shadow-sm">
          <button
            onClick={() => {
              setActiveTab("nutrition")
              setPage(1)
            }}
            className={`relative py-1 px-4 text-xs font-medium transition-all duration-300 cursor-pointer ${
              activeTab === "nutrition"
                ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-md"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Nutrition
            </div>
          </button>
          <button
            onClick={() => {
              setActiveTab("ingredients")
              setPage(1)
            }}
            className={`relative py-1 px-4 text-xs font-medium transition-all duration-300 cursor-pointer ${
              activeTab === "ingredients"
                ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-md"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <Leaf className="w-3 h-3" />
              Ingredients
            </div>
          </button>
        </div>
        </div>
        <div className="relative">
          <SelectField
            register={register}
            name="selectDish"
            options={fullDishOptions}
          />
          <div className="absolute top-1/2 -translate-y-1/2 right-2 transform text-gray-400">
            <IoIosArrowDown size={12} />
          </div>
        </div>
      </div>



      {/* Table based on active tab */}
      <div className="overflow-auto md:h-[calc(100vh-175px)] h-[calc(100vh-240px)] scrl-hide rounded-md border border-gray-200">
        {activeTab === "nutrition" ? (
          <NutritionTable
            paged={pagedData}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ) : (
          <IngredientsTable
            paged={pagedData}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        )}
      </div>

      {/* Pagination */}
      <Pagination {...{ page, setPage, pageCount, pageSize, filtered: currentTableData }} />

      {/* Confirm Modal */}
      <ConfirmModal
        setConfirmModal={setConfirmModal}
        confirmModal={confirmModal}
        message="Are you sure you want to delete this item?"
      />
      {activeTab === "nutrition" ? (
        <EditNutritionModal
          editModal={editModal}
          setEditModal={setEditModal}
          selectedNutritionItem={selectedItem}
        />
      ) : (
        <EditIngredientModal
          editModal={editModal}
          setEditModal={setEditModal}
          selectedIngredientItem={selectedItem}
        />
      )}
    </PageContainer>
  );
};

export default NutritionPage;