import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  userId: string;
  isAuthenticated: boolean;
  isTempAuthenticated: boolean;
  tempToken: string;
  isUserAgreement: boolean;
  isPartnerAgreement: boolean;
  isMFARegistered: boolean;
  isMFARequired: boolean;
  token: string;
  fullName: string;
  partnerId: number;
  partnerName: string;
  userType: string;
  isPIIAgreement: boolean;
  isAdministrator: boolean;
}
const initialState: UserState = {
  userId: "",
  isAuthenticated: false,
  isTempAuthenticated: false,
  tempToken: "",
  isUserAgreement: false,
  isPartnerAgreement: false,
  isMFARegistered: false,
  isMFARequired: false,
  token: "",
  fullName: "",
  partnerId: 0,
  partnerName: "",
  userType: "",
  isPIIAgreement: false,
  isAdministrator: false,
};

export const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    setMFARegister: (state, action) => {
      state.isMFARegistered = action.payload;
    },
    setMFARequired: (state, action) => {
      state.isMFARequired = action.payload;
    },
    setTempAuthenticate: (state, action) => {
      state.isTempAuthenticated = action.payload;
    },
    setTempToken: (state, action) => {
      state.tempToken = action.payload;
    },
    setLoggedInUser: (state, action) => {
      state.userId = action.payload.userId;
      state.fullName = action.payload.fullName;
      state.partnerId = action.payload.partnerId;
      state.userType = action.payload.userType;
      state.partnerName = action.payload.partnerName;
      state.isUserAgreement = action.payload.isUserAgreement;
      state.isPartnerAgreement = action.payload.isPartnerAgreement;
    },
    setLoggedOut: (state) => {
      console.log("Log Out method");
      state.userId = "";
      state.isAuthenticated = false;
      state.isTempAuthenticated = false;
      state.tempToken = "";
      state.isUserAgreement = false;
      state.isPartnerAgreement = false;
      state.isMFARegistered = false;
      state.isMFARequired = false;
      state.token = "";
      state.fullName = "";
      state.partnerId = 0;
      state.partnerName = "";
      state.userType = "";
      state.isPIIAgreement = false;
      state.isAdministrator = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLoggedIn,
  setMFARegister,
  setMFARequired,
  setTempAuthenticate,
  setTempToken,
  setLoggedInUser,
  setLoggedOut,
} = userSlice.actions;

export default userSlice.reducer;
