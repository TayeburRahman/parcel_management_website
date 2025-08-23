"use client";
import PageContainer from "@/components/container/PageContainer";
import ConfirmModal from "@/components/modal/confirm-modal/ConfirmModal";
import UserViewModal from "@/components/modal/user-view-modal/UserViewModal";
import Pagination from "@/components/pagination/Pagination";
import UserManagementTable from "@/components/table/user-management-table/UserManagementTable";
import { userData } from "@/data/data";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const clientsAndPlants = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [viewModal, setViewModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const handleView = (user) => {
    setSelectedUser(user);
    setViewModal(true);
  };

  // handle block
  const handleBlock = (_id) => {
    setConfirmModal(true);
    console.log(_id);
  };

  /* filter + paginate */
  const filtered = userData.filter((user) =>
    user.userName.toLowerCase().includes(query.toLowerCase())
  );
  const pageCount = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <PageContainer>
      {/* header + search */}
      <div className="flex flex-wrap gap-2 justify-between mb-2">
        <h1 className="font-medium">Customer Management</h1>
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

      {/* table */}
      <div className="overflow-auto md:h-[calc(100vh-175px)] h-[calc(100vh-200px)] scrl-hide rounded-md border border-gray-200">
        <UserManagementTable
          paged={paged}
          handleBlock={handleBlock}
          handleView={handleView}
        />
      </div>

      {/* Pagination */}
      <Pagination {...{ page, setPage, pageCount, pageSize, filtered }} />

      {/* View Modal */}
      <UserViewModal
        setViewModal={setViewModal}
        viewModal={viewModal}
        data={selectedUser}
      />

      {/* Confirm Modal */}
      <ConfirmModal
        setConfirmModal={setConfirmModal}
        confirmModal={confirmModal}
        message="Are you sure you want to block this user?"
      />

    </PageContainer>
  );
};

export default clientsAndPlants;
