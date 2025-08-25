import { apiSlice } from "../api/apiSlice";

export const parcelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParcels: builder.query({
      query: ({ page, query, date }) => ({
        url: `/dashboard/get-parcels?page=${page}&query=${query}${date ? `&date=${date}` : ""}`,
        method: "GET",
      }),
      providesTags: ["get-parcels"],
    }),
  }),
});

export const { useGetParcelsQuery } = parcelApi;