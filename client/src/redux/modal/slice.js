import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isLogoModalOpen: false,
    isSettingModalOpen: false,
    isLogoutModalOpen: false,
  },
  reducers: {
    openLogoModal: (state) => {
      state.isLogoModalOpen = true;
      state.isSettingModalOpen = false;
      state.isLogoutModalOpen = false;
    },
    closeLogoModal: (state) => {
      state.isLogoModalOpen = false;
    },
    openSettingModal: (state) => {
      state.isLogoModalOpen = false;
      state.isSettingModalOpen = true;
      state.isLogoutModalOpen = false;
    },
    closeSettingModal: (state) => {
      state.isSettingModalOpen = false;
    },
    openLogoutModal: (state) => {
      state.isLogoModalOpen = false;
      state.isSettingModalOpen = false;
      state.isLogoutModalOpen = true;
    },
    closeLogoutModal: (state) => {
      state.isLogoutModalOpen = false;
    },
  },
});

export const {
  openLogoModal,
  closeLogoModal,
  openSettingModal,
  closeSettingModal,
  openLogoutModal,
  closeLogoutModal,
} = modalSlice.actions;

export default modalSlice.reducer;
