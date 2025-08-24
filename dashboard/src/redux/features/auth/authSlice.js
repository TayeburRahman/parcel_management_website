import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  ForgotError: "",
  VerifyOtpError: "",
  ResetPasswordError: "",
  LoginError: "",
  RegisterError: "",
  ChangePasswordError: "",
  ProfileError: "",
  VerifyAccountError: "",
  VerifyAccountOtpError: "",
  user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}") : {},
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    ShowLoading: (state) => {
      state.loading = true;
    },
    HideLoading: (state) => {
      state.loading = false;
    },
    SetUserDetails: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user || {};
      if (accessToken) {
        state.token = accessToken;
        localStorage.setItem("token", accessToken);
      }
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    },

    SetForgotError: (state, action) => {
      state.ForgotError = action.payload;
    },
    SetVerifyOtpError: (state, action) => {
      state.VerifyOtpError = action.payload;
    },
    SetResetPasswordError: (state, action) => {
      state.ResetPasswordError = action.payload;
    },
    SetLoginError: (state, action) => {
      state.LoginError = action.payload;
    },
    SetRegisterError: (state, action) => {
      state.RegisterError = action.payload;
    },
    SetChangePasswordError: (state, action) => {
      state.ChangePasswordError = action.payload;
    },
    SetProfileError: (state, action) => {
      state.ProfileError = action.payload;
    },
    SetVerifyAccountError: (state, action) => {
      state.VerifyAccountError = action.payload;
    },
    SetVerifyAccountOtpError: (state, action) => {
      state.VerifyAccountOtpError = action.payload;
    },
    Logout: (state) => {
      localStorage.clear();
      window.location.href = "/auth/login";
      return initialState;
    },

  },
});

export const {
  ShowLoading,
  HideLoading,
  SetForgotError,
  SetVerifyAccountError,
  SetVerifyAccountOtpError,
  SetVerifyOtpError,
  SetResetPasswordError,
  SetLoginError,
  SetRegisterError,
  SetChangePasswordError,
  SetProfileError,
  SetUserDetails,
  Logout
} = authSlice.actions;

const authSliceReducer = authSlice.reducer;
export default authSliceReducer;