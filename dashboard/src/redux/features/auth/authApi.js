/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthId, setAuthId, setForgetEmail, setToken, setVerifyEmail } from "@/helper/SessionHelper";
import { ErrorToast, SuccessToast } from "@/helper/ValidationHelper";
import { SetChangePasswordError, SetForgotError, SetLoginError, SetRegisterError, SetUserDetails, SetVerifyAccountOtpError, SetVerifyOtpError } from "./authSlice";
import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: data,
            }),
            async onQueryStarted({ email }, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    setVerifyEmail(email);
                    SuccessToast("Please check you email");
                } catch (err) {
                    const message = err?.error?.data?.message;
                    dispatch(SetRegisterError(message));
                }
            },
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const res = await queryFulfilled;
                    const userData = res?.data?.data;
                    const authId = userData?.user?.authId;
                    const token = userData?.accessToken;
                    const role = userData?.user?.role;
                    if (["SUPER_ADMIN", "ADMIN", "CUSTOMERS", "AGENT"].includes(role)) {
                        setToken(token);
                        setAuthId(authId);
                        dispatch(SetUserDetails(userData))
                    } else {
                        dispatch(SetLoginError("You are not allowed to login here"));
                    }
                } catch (err) {
                    const message = err?.error?.data?.message || "Something went wrong";

                    dispatch(SetLoginError(message));

                }
            },
        }),
        forgotPasswordSendOtp: builder.mutation({
            query: (data) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: data,
            }),
            async onQueryStarted({ email }, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    setForgetEmail(email);
                } catch (err) {
                    const message = err?.error?.data?.message;
                    if (message === "Cannot read properties of null (reading 'email')") {
                        dispatch(SetForgotError("Couldn't find this email address"))
                    }
                    else {
                        dispatch(SetForgotError(message))
                    }
                }
            },
        }),
        forgotPasswordResendOtp: builder.mutation({
            query: (data) => ({
                url: "/auth/resend-forgot",
                method: "POST",
                body: data,
            }),
            async onQueryStarted({ email }, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    setForgetEmail(email);
                } catch (err) {
                    const message = err?.error?.data?.message;
                    if (message === "Cannot read properties of null (reading 'email')") {
                        ErrorToast("Couldn't find this email address");
                    }
                    else {
                        ErrorToast(message);
                    }
                }
            },
        }),
        forgotPasswordVerifyOtp: builder.mutation({
            query: (data) => ({
                url: "/auth/verify-otp",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                } catch (err) {
                    const message = err?.error?.data?.message;
                    dispatch(SetVerifyOtpError(message));
                }
            },
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: "/auth/reset-password",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    setTimeout(() => {
                        localStorage.clear()
                        window.location.href = "/auth/login";
                    }, 300);
                } catch (err) {
                    const message = err?.error?.data?.message;
                    if (message === "password is incorrect") {
                        dispatch(SetChangePasswordError("Wrong Current Password"))
                    } else {
                        dispatch(SetChangePasswordError(message))
                    }
                }
            },
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: "/auth/change-password",
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    setTimeout(() => {
                        localStorage.clear()
                        window.location.href = "/login";
                    }, 300);
                } catch (err) {
                    const message = err?.error?.data?.message;
                    if (message === "password is incorrect") {
                        dispatch(SetChangePasswordError("Wrong Current Password"))
                    } else {
                        dispatch(SetChangePasswordError(message))
                    }
                }
            },
        }),
        verifyAccountResendOtp: builder.mutation({
            query: (data) => ({
                url: "/auth/active-resend",
                method: "POST",
                body: data,
            }),
            async onQueryStarted({ email }, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    setVerifyEmail(email);
                } catch (err) {
                    const message = err?.error?.data?.message;
                    if (message === "Cannot read properties of null (reading 'email')") {
                        ErrorToast("Couldn't find this email address");
                    }
                    else {
                        ErrorToast(message);
                    }
                }
            },
        }),
        verifyAccountVerifyOtp: builder.mutation({
            query: (data) => ({
                url: "/auth/activate-user",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const res = await queryFulfilled;
                    const userData = res?.data?.data;
                    const authId = userData?.user?.authId;
                    const token = userData?.accessToken;
                    const role = userData?.user?.role;

                    if (["SUPER_ADMIN", "ADMIN", "CUSTOMERS", "AGENT"].includes(role)) {
                        setToken(token);
                        setAuthId(authId);
                        dispatch(SetUserDetails(userData))
                        localStorage.removeItem("verify_email");
                    }

                } catch (err) {
                    const message = err?.error?.data?.message;
                    dispatch(SetVerifyAccountOtpError(message));
                }
            },
        }),
        deleteAccount: builder.mutation({
            query: () => ({
                url: `/auth/delete-account?authId=${getAuthId()}`,
                method: "DELETE",
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    SuccessToast("Account is deleted successfully");
                    setTimeout(() => {
                        localStorage.clear()
                        window.location.href = "/";
                    }, 300);
                } catch (err) {
                    const message = err?.error?.data?.message;
                    ErrorToast(message)
                }
            },
        }),
         useUpdateProfileMutation: builder.mutation({
            query: (data) => ({
                url: "/auth/edit-profile",
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted({ email }, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    setVerifyEmail(email);
                    SuccessToast("Please check you email");
                } catch (err) {
                    const message = err?.error?.data?.message;
                    dispatch(SetRegisterError(message));
                }
            },
        }),
    }),
});

export const {
    useRegisterMutation,
    useUpdateProfileMutation,
    useLoginMutation,
    useForgotPasswordSendOtpMutation,
    useForgotPasswordResendOtpMutation,
    useForgotPasswordVerifyOtpMutation,
    useChangePasswordMutation,
    useResetPasswordMutation,
    useVerifyAccountResendOtpMutation,
    useVerifyAccountVerifyOtpMutation,
    useDeleteAccountMutation
} = authApi;