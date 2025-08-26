"use client";

import PageContainer from "@/components/container/PageContainer";
import Pagination from "@/components/pagination/Pagination";
import UserManagementTable from "@/components/table/user-management-table/UserManagementTable";
import { useGetAccountsQuery, useCreateAccountMutation, useBlockUnblockUserMutation } from "@/redux/features/customer/customerApi";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import TableLoader from "@/components/loader/TableLoader"; 
import { SuccessToast, ErrorToast } from "@/helper/ValidationHelper";
import { useDispatch } from "react-redux";
import AddAgentModal from "@/components/modal/add-agent-modal/AddAgentModal";
import { MdAdd } from "react-icons/md";
import ConfirmModal from "@/components/modal/confirm-modal/ConfirmModal";
import { SetForgotError } from "@/redux/features/auth/authSlice";

const AgentManagement = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
    const [confirmModal, setConfirmModal] = useState(false);
  const [addAgentModal, setAddAgentModal] = useState(false);
    const [userToBlock, setUserToBlock] = useState(null);
  const [blockUnblockUser, { isLoading: isBlockingLoading }] = useBlockUnblockUserMutation();
  const { data, isLoading } = useGetAccountsQuery({ page, query, role: "AGENT" });
  const paged = data?.data?.results || [];

  const pageSize = 10;
  const pageCount = Math.ceil(data?.data?.meta?.total / pageSize);
  const filtered = { length: data?.data?.meta?.total || 0 };

  const [createAccount, { isLoading: isCreatingAgent }] = useCreateAccountMutation(); 
  const dispatch = useDispatch(); 
    const handleBlockClick = (user) => {
      setUserToBlock(user);
      setConfirmModal(true);
    };
 
    const handleConfirmBlockUnblock = async (data) => {  
      try {
        const res = await blockUnblockUser({
          email: userToBlock?.email,
          role: "AGENT",
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

  const handleAddAgent = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);
      formData.append("vehicleType", values.vehicleType);

      if (values.phone_number) formData.append("phone_number", values.phone_number);
      if (values.address) formData.append("address", values.address);

      if (values.profile_images && values.profile_images.length > 0) {
        formData.append("profile_image", values.profile_images[0]);
      }

      formData.append("role", "AGENT");

      console.log("===", ...formData)

      const res = await createAccount(formData).unwrap();
      SuccessToast(res.message || "Agent created successfully");
      setAddAgentModal(false);
    } catch (err) {
      const message = err?.data?.message || "Something went wrong";
      ErrorToast(message);
    }
  };

  return (
    <PageContainer>
      <div className="flex flex-wrap gap-2 justify-between mb-2">
        <h1 className="font-medium">Agent Management</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <FiSearch className="absolute text-gray-400 -translate-y-1/2 left-2 top-1/2" size={14} />
            <input
              placeholder="Search here..."
              value={query}
              onChange={(e) => { setPage(1); setQuery(e.target.value); }}
              className="w-full pl-8 pr-4 py-1 text-sm placeholder:text-xs rounded-sm border border-gray-300 focus:ring-1 focus:ring-primary transition-all duration-300 focus:outline-none"
            />
          </div>
          <button
            onClick={() => setAddAgentModal(true)}
            className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-white bg-primary rounded-sm hover:bg-primary-dark transition-colors duration-300"
          >
            <MdAdd size={18} />
            Add Agent
          </button>
        </div>
      </div>

      <div className="overflow-auto md:h-[calc(100vh-175px)] h-[calc(100vh-200px)] scrl-hide rounded-md border border-gray-200">
        {isLoading ? <TableLoader /> : <UserManagementTable onBlockUnblockClick={handleBlockClick}  isBlockingLoading={isBlockingLoading} paged={paged} mood="agent" />}
      </div>

      <Pagination {...{ page, setPage, pageCount, pageSize, filtered }} />

      <AddAgentModal
        addAgentModal={addAgentModal}
        setAddAgentModal={setAddAgentModal}
        onAddAgent={handleAddAgent}
        isCreatingAgent={isCreatingAgent}
      />

<ConfirmModal
        setConfirmModal={setConfirmModal}
        confirmModal={confirmModal}
        message={`Are you sure you want to ${userToBlock?.status === "active" ? "block" : "unblock"} ${userToBlock?.name}?`}
        onConfirm={handleConfirmBlockUnblock}
      />
    </PageContainer>
  );
};

export default AgentManagement;
