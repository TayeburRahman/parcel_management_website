"use client";
import PageContainer from "@/components/container/PageContainer";
import AddClientModal from "@/components/modal/add-client-modal/AddClientModal";
import ClientsAndPlantsModal from "@/components/modal/clients-plants-view-modal/ClientsAndPlantsModal";
import ConfirmModal from "@/components/modal/confirm-modal/ConfirmModal";
import Pagination from "@/components/pagination/Pagination";
import ClientsAndPlantsTable from "@/components/table/clients-plants-table/ClientsAndPlantsTable";
import { companies } from "@/data/data";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";



const clientsAndPlants = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [viewModal, setViewModal] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState(null);
  const handleView = (Company) => {
    setSelectedCompany(Company);
    setViewModal(true)
  }

  // handle block
  const handleBlock = (_id) => {
    setConfirmModal(true);
    console.log(_id);
  };


  /* filter + paginate */
  const filtered = companies.filter((company) =>
    company.companyName.toLowerCase().includes(query.toLowerCase())
  );
  const pageCount = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (

    <PageContainer>
      {/* header + search */}
      <div className="flex justify-between gap-2 flex-wrap mb-2">
        <h1 className="font-medium">Client & Plants</h1>
        <div className="flex items-center gap-5">
          <button onClick={() => setAddModal(true)} className="bg-primary hover:bg-primary/80 text-sm font-medium text-white px-2 py-1 rounded-sm cursor-pointer transition-all duration-500">
            + Add Client
          </button>

          <div className="relative">
            <FiSearch
              className="absolute text-gray-400 -translate-y-1/2 left-2 top-1/2"
              size={14}
            />
            <input
              placeholder="Search here..."
              value={query}
              onChange={(e) => {
                setPage(1);
                setQuery(e.target.value);
              }}
              className="w-full pl-8 pr-4 py-1 text-sm placeholder:text-xs rounded-sm border border-gray-300 focus:ring-1 focus:ring-primary transition-all duration-300 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* table */}
      <div className="md:h-[calc(100vh-175px)] h-[calc(100vh-200px)] overflow-auto scrl-hide rounded-md border border-gray-200">
        <ClientsAndPlantsTable paged={paged} handleBlock={handleBlock} handleView={handleView} />
      </div>

      {/* Pagination */}
      <Pagination {...{ page, setPage, pageCount, pageSize, filtered }} />

      {/* View Modal */}
      <ClientsAndPlantsModal setViewModal={setViewModal} viewModal={viewModal} data={selectedCompany} />

      {/* Add Client Modal */}
      <AddClientModal {...{ addModal, setAddModal }} />

      {/* Confirm Modal */}
      <ConfirmModal
        setConfirmModal={setConfirmModal}
        confirmModal={confirmModal}
        message="Are you sure you want to block this company?"
      />

    </PageContainer>
  );
}

export default clientsAndPlants;