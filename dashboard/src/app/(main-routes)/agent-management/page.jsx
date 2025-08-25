"use client";
import PageContainer from "@/components/container/PageContainer";
import Pagination from "@/components/pagination/Pagination";
import UserManagementTable from "@/components/table/user-management-table/UserManagementTable";
import { useGetAccountsQuery, useCreateAccountMutation } from "@/redux/features/customer/customerApi";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import TableLoader from "@/components/loader/TableLoader";
import { SetForgotError } from "@/redux/features/auth/authSlice";
import { SuccessToast } from "@/helper/ValidationHelper";
import { useDispatch } from "react-redux";
import AddAgentModal from "@/components/modal/add-agent-modal/AddAgentModal"; // New import
import { MdAdd } from "react-icons/md";


const AgentManagement = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [addAgentModal, setAddAgentModal] = useState(false); // New state for add agent modal

  const { data, isLoading, isError } = useGetAccountsQuery({ page, query, role: "AGENT" });
  const paged = data?.data?.results

  const pageSize = 10; // Assuming a page size of 10
  const pageCount = Math.ceil(data?.data?.meta?.total / pageSize);
  const filtered = { length: data?.data?.meta?.total };

  const [createAccount, { isLoading: isCreatingAgent }] = useCreateAccountMutation();
  const dispatch = useDispatch();

  const handleAddAgent = async (values) => {
    try {
      const res = await createAccount({ ...values, role: "AGENT" }).unwrap();
      SuccessToast(res.message || "Agent created successfully");
      setAddAgentModal(false);
    } catch (err) {
      const message = err?.data?.message || "Something went wrong";
      dispatch(SetForgotError(message));
    }
  };


  return (
    <PageContainer>
      {/* header + search + add agent button */}
      <div className="flex flex-wrap gap-2 justify-between mb-2">
        <h1 className="font-medium">Agent Management</h1>
        <div className="flex items-center gap-2">
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
          <button
            onClick={() => setAddAgentModal(true)}
            className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-white bg-primary rounded-sm hover:bg-primary-dark transition-colors duration-300"
          >
            <MdAdd size={18} />
            Add Agent
          </button>
        </div>
      </div>

      {/* table */}
      <div className="overflow-auto md:h-[calc(100vh-175px)] h-[calc(100vh-200px)] scrl-hide rounded-md border border-gray-200">
        {isLoading ? (
          <TableLoader />
        ) : (
          <UserManagementTable
            paged={paged}
            // Removed onBlockUnblockClick and isBlockingLoading props
          />
        )}
      </div>

      <Pagination {...{ page, setPage, pageCount, pageSize, filtered }} />

      {/* Add Agent Modal */}
      <AddAgentModal
        addAgentModal={addAgentModal}
        setAddAgentModal={setAddAgentModal}
        onAddAgent={handleAddAgent}
        isCreatingAgent={isCreatingAgent}
      />
    </PageContainer>
  );
};

export default AgentManagement;
