
import { apiSlice } from "../api/apiSlice";

export const customerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccounts: builder.query({
      query: (args) => {
        const { page, query, role } = args;
        return {
          url: "/auth/get-accounts",
          params: { page, searchTerm: query, role:role },
        };
      },
      providesTags: ["get-accounts"],
    }),
    blockUnblockUser: builder.mutation({
      query: ({ email, role, is_block }) => ({
        url: `/auth/block-unblock`,
        method: 'PATCH',
        body: { role, email, is_block },
      }),
      invalidatesTags: ['get-accounts'], 
    }),
    createAccount: builder.mutation({
      query: (data) => ({
        url: `/auth/create-account`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['get-accounts'],
    }),
  }),
});

export const { useGetAccountsQuery, useBlockUnblockUserMutation, useCreateAccountMutation } = customerApi;
