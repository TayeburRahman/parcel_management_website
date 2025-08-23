


import { getAuthId, getEmail, setAuthId, setEmail, setToken, setVerifyEmail } from "@/helper/SessionHelper";
import { ErrorToast, SuccessToast } from "@/helper/ValidationHelper";
import { SetChangePasswordError, SetForgotError, SetLoginError, SetRegisterError, SetResetPasswordError, SetVerifyAccountError, SetVerifyAccountOtpError, SetVerifyOtpError } from "./authSlice";
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

                    const authId = userData?.id;
                    const token = userData?.accessToken;
                    const role = userData?.user?.role;

                    // Handle allowed roles dynamically
                    if (["SUPER_ADMIN", "ADMIN", "CUSTOMERS", "AGENT"].includes(role)) {
                        SuccessToast("Login Success");
                        setToken(token);
                        setAuthId(authId);

                        setTimeout(() => {
                            window.location.href = "/";
                        }, 300);
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
                    setEmail(email);
                    SuccessToast("OTP is sent successfully");
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
                url: "/auth/forgot-resend",
                method: "POST",
                body: data,
            }),
            async onQueryStarted({ email }, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    setEmail(email);
                    SuccessToast("OTP is sent successfully");
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
                    SuccessToast("Otp is verified successfully");
                } catch (err) {
                    const message = err?.error?.data?.message;
                    dispatch(SetVerifyOtpError(message));
                }
            },
        }),
        forgotPasswordReset: builder.mutation({
            query: (data) => ({
                url: `/auth/reset-password?email=${getEmail()}`,
                method: "POST",
                body: data,
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    SuccessToast("Password is reset successfully!");
                    localStorage.clear();
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 300);
                } catch (err) {
                    const message = err?.error?.data?.message;
                    dispatch(SetResetPasswordError(message));
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
                    SuccessToast("Password is updated successfully");
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
        verifyAccountSendOtp: builder.mutation({
            query: (data) => ({
                url: "/auth/active-resend",
                method: "POST",
                body: data,
            }),
            async onQueryStarted({ email }, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    setVerifyEmail(email);
                    SuccessToast("OTP is sent successfully");
                } catch (err) {
                    const message = err?.error?.data?.message;
                    if (message === "Cannot read properties of null (reading 'email')") {
                        dispatch(SetVerifyAccountError("Couldn't find this email address"))
                    }
                    else {
                        dispatch(SetVerifyAccountError(message));
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
                    SuccessToast("OTP is sent successfully");
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
                    await queryFulfilled;
                    SuccessToast("Account is verified successfully");
                    localStorage.clear();
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 300);
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
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useForgotPasswordSendOtpMutation,
    useForgotPasswordResendOtpMutation,
    useForgotPasswordVerifyOtpMutation,
    useForgotPasswordResetMutation,
    useChangePasswordMutation,
    useVerifyAccountSendOtpMutation,
    useVerifyAccountResendOtpMutation,
    useVerifyAccountVerifyOtpMutation,
    useDeleteAccountMutation
} = authApi;