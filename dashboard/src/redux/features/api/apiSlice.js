
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "@/helper/SessionHelper";
import { SetLoginError } from "../auth/authSlice";

// export const baseUrl = "https://backend.machmakers.co.uk";
export const baseUrl = "http://10.10.20.11:5000";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers) => {
    if (getToken()) {
      headers.set("Authorization", `Bearer ${getToken()}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    const error = result?.error;

    if (error?.status === 401) {
      if (error?.data?.message === "Please activate your account then try to login") {
        api.dispatch(SetLoginError(error?.data?.message));
      } else {
        localStorage.clear(); 
        window.location.href = "/auth/login";
      }
    }

    return result;
  },
  tagTypes: ["get-accounts", "get-parcels", "get-my-parcels", "get-assigned-parcels", "create-parcel", "assigned-parcel-agent", "update-parcel", "delete-parcel", "parcels_details"],
  endpoints: () => ({}),
});
