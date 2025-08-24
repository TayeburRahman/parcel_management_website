import { jwtDecode } from "jwt-decode";

class SessionHelper {
  setToken(token) {
    localStorage.setItem("token", token);
  }

  getToken() {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("token");
    }
    return "";
  }

  getUserInfo() {
    const token = this.getToken();
    if (token) {
      const decodedData = jwtDecode(token);
      return decodedData;
    }
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.clear();
      window.location.href = "/";
    }
  }

  isLoggedIn() {
    const token = this.getToken();
    return !!token;
  }

  setEmail(email) {
    localStorage.setItem("email", email);
  }

  getEmail() {
    return localStorage.getItem("email");
  }
  setForgetEmail(email) {
    localStorage.setItem("forgot_email", email);
  }

  setVerifyEmail(email) {
    localStorage.setItem("verifyEmail", email);
  }

  getVerifyEmail() {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("verifyEmail");
    }
  }
  setOtp(otp) {
    localStorage.setItem("otp", otp);
  }

  getOtp() {
    return localStorage.getItem("otp");
  }

  setAuthId(authId) {
    localStorage.setItem("authId", authId);
  }

  getAuthId() {
    return localStorage.getItem("authId");
  }

 
}

export const {
  setToken,
  getToken,
  setEmail,
  getEmail,
  setVerifyEmail,
  getUserInfo,
  getVerifyEmail,
  setOtp,
  getOtp, 
  isLoggedIn,
  setAuthId,
  getAuthId,
  setForgetEmail
} = new SessionHelper();
