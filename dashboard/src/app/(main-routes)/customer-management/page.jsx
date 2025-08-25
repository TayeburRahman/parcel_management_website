"use client";
import PageContainer from "@/components/container/PageContainer";
import ConfirmModal from "@/components/modal/confirm-modal/ConfirmModal";
import UserViewModal from "@/components/modal/user-view-modal/UserViewModal";
import Pagination from "@/components/pagination/Pagination";
import UserManagementTable from "@/components/table/user-management-table/UserManagementTable";
import { useGetAccountsQuery, useBlockUnblockUserMutation } from "@/redux/features/customer/customerApi";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import TableLoader from "@/components/loader/TableLoader";
import { SetForgotError } from "@/redux/features/auth/authSlice";
import { SuccessToast } from "@/helper/ValidationHelper";
import { useDispatch } from "react-redux";


const CustomerManagement = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [userToBlock, setUserToBlock] = useState(null);

  const { data, isLoading, isError } = useGetAccountsQuery({ page, query, role: "CUSTOMERS" });
  const paged = data?.data?.results

  const pageSize = 10; // Assuming a page size of 10
  const pageCount = Math.ceil(data?.data?.meta?.total / pageSize);
  const filtered = { length: data?.data?.meta?.total };

  const [blockUnblockUser, { isLoading: isBlockingLoading }] = useBlockUnblockUserMutation();

  // handle block click from table
  const handleBlockClick = (user) => {
    setUserToBlock(user);
    setConfirmModal(true);
  };
 const dispatch = useDispatch(); 
  const handleConfirmBlockUnblock = async (data) => {  
    try {
      const res = await blockUnblockUser({
        email: userToBlock?.email,
        role: "CUSTOMERS",
        is_block: !userToBlock?.authId?.is_block,
      }).unwrap();
      console.log("res",res)
      SuccessToast(res.message || "User status updated successfully");
    } catch (err) {
      const message = err?.data?.message || "Something went wrong";
      dispatch(SetForgotError(message));
    } finally {
      setConfirmModal(false);
    }
  };


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
        {isLoading ? (
          <TableLoader />
        ) : (
          <UserManagementTable
            paged={paged}
            onBlockUnblockClick={handleBlockClick}
            isBlockingLoading={isBlockingLoading}
          />
        )}
      </div>

      <Pagination {...{ page, setPage, pageCount, pageSize, filtered }} />


      {/* Confirm Modal */}
      <ConfirmModal
        setConfirmModal={setConfirmModal}
        confirmModal={confirmModal}
        message={`Are you sure you want to ${userToBlock?.status === "active" ? "block" : "unblock"} ${userToBlock?.name}?`}
        onConfirm={handleConfirmBlockUnblock}
      />
    </PageContainer>
  );
};

export default CustomerManagement;
