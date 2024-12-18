import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isLogoModalOpen: false,
    isSettingModalOpen: false,
    isLogoutModalOpen: false,
    isAddModalOpen: false,
  },
  reducers: {
    openLogoModal: (state) => {
      state.isLogoModalOpen = true;
      state.isSettingModalOpen = false;
      state.isLogoutModalOpen = false;
      state.isAddModalOpen = false;
    },
    closeLogoModal: (state) => {
      state.isLogoModalOpen = false;
    },

    openSettingModal: (state) => {
      state.isLogoModalOpen = false;
      state.isSettingModalOpen = true;
      state.isLogoutModalOpen = false;
      state.isAddModalOpen = false;
    },
    closeSettingModal: (state) => {
      state.isSettingModalOpen = false;
    },
    openLogoutModal: (state) => {
      state.isLogoModalOpen = false;
      state.isSettingModalOpen = false;
      state.isLogoutModalOpen = true;
      state.isAddModalOpen = false;
    },
    closeLogoutModal: (state) => {
      state.isLogoutModalOpen = false;
    },

    openAddModal: (state) => {
      state.isLogoModalOpen = false;
      state.isSettingModalOpen = false;
      state.isLogoutModalOpen = false;
      state.isAddModalOpen = true;
    },

    closeAddModal: (state) => {
      state.isAddModalOpen = false;
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
  openAddModal,
  closeAddModal,
} = modalSlice.actions;

export default modalSlice.reducer;
