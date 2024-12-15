import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: { isSettingModalOpen: false, isLogoutModalOpen: false },
  reducers: {
    openSettingModal: (state) => {
      state.isSettingModalOpen = true;
    },
    closeSettingModal: (state) => {
      state.isSettingModalOpen = false;
    },
    openLogoutModal: (state) => {
      state.isLogoutModalOpen = true;
    },
    closeLogoutModal: (state) => {
      state.isLogoutModalOpen = false;
    },
  },
});

export const {
  openSettingModal,
  closeSettingModal,
  openLogoutModal,
  closeLogoutModal,
} = modalSlice.actions;

export const selectSettingModal = (state) => state.modal.isSettingModalOpen;
export const selectLogoutModal = (state) => state.modal.isLogoutModalOpen;

export default modalSlice.reducer;
