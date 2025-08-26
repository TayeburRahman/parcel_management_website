import { apiSlice } from "../api/apiSlice";

export const parcelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParcels: builder.query({
      query: ({ page, query, date }) => ({
        url: `/dashboard/get-parcels?page=${page}&searchTerm=${query}${date ? `&date=${date}` : ""}`,
        method: "GET",
      }),
      providesTags: ["get-parcels"],
    }),
    getMyParcels: builder.query({
      query: ({ page, query, date }) => ({
        url: `/dashboard/get-my-parcels?page=${page}&searchTerm=${query}${date ? `&date=${date}` : ""}`,
        method: "GET",
      }),
      providesTags: ["get-my-parcels"],
    }),
    getAssignedParcels: builder.query({
      query: ({ page, query }) => ({
        url: `/dashboard/assigned-parcels?page=${page}&searchTerm=${query}`,
        method: "GET",
      }),
      providesTags: ["get-assigned-parcels"],
    }),
    createParcel: builder.mutation({
      query: (data) => ({
        url: "/dashboard/create-parcel",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["create-parcel", "get-my-parcels", "get-parcels"],
    }),
    assignAgent: builder.mutation({
      query: ({ parcelId, agentId }) => ({
        url: "/dashboard/assigned-parcel-agent",
        method: "PATCH",
        body: { parcelId, agentId },
      }),
      invalidatesTags: ["assigned-parcel-agent", "get-parcels", "get-my-parcels", "get-assigned-parcels"],
    }),
    updateParcel: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/dashboard/update-parcel/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["update-parcel", "get-parcels", "get-my-parcels", "get-assigned-parcels"],
    }),
    deleteParcel: builder.mutation({
      query: (id) => ({
        url: `/dashboard/delete-parcel/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["delete-parcel", "get-parcels", "get-my-parcels"],
    }),
    getParcelById: builder.query({
      query: (id) => ({
        url: `/dashboard/parcels_details/${id}`,
        method: "GET",
      }),
      providesTags: ["parcels_details"],
    }),
  }),
});

export const { useGetParcelsQuery, useGetMyParcelsQuery, useGetAssignedParcelsQuery, useCreateParcelMutation, useAssignAgentMutation, useUpdateParcelMutation, useDeleteParcelMutation, useGetParcelByIdQuery } = parcelApi;
