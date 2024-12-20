import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isLogoModalOpen: false,
    isSettingModalOpen: false,
    isLogoutModalOpen: false,
    isAddModalOpen: false,
    isEditModalOpen: false,
    isDailyNormaModalOpen: false,
    editModalData: {
      amount: "",
      date: "",
      _id: "",
    },
  },
  reducers: {
    openLogoModal: (state) => {
      state.isLogoModalOpen = true;
      state.isSettingModalOpen = false;
      state.isLogoutModalOpen = false;
      state.isAddModalOpen = false;
      state.isEditModalOpen = false;
      state.isDailyNormaModalOpen = false;
    },
    closeLogoModal: (state) => {
      state.isLogoModalOpen = false;
    },

    openSettingModal: (state) => {
      state.isLogoModalOpen = false;
      state.isSettingModalOpen = true;
      state.isLogoutModalOpen = false;
      state.isAddModalOpen = false;
      state.isEditModalOpen = false;
      state.isDailyNormaModalOpen = false;
    },
    closeSettingModal: (state) => {
      state.isSettingModalOpen = false;
    },

    openLogoutModal: (state) => {
      state.isLogoModalOpen = false;
      state.isSettingModalOpen = false;
      state.isLogoutModalOpen = true;
      state.isAddModalOpen = false;
      state.isEditModalOpen = false;
      state.isDailyNormaModalOpen = false;
    },
    closeLogoutModal: (state) => {
      state.isLogoutModalOpen = false;
    },

    openAddModal: (state) => {
      state.isLogoModalOpen = false;
      state.isSettingModalOpen = false;
      state.isLogoutModalOpen = false;
      state.isAddModalOpen = true;
      state.isEditModalOpen = false;
      state.isDailyNormaModalOpen = false;
    },

    closeAddModal: (state) => {
      state.isAddModalOpen = false;
    },

    openEditModal: (state, actions) => {
      state.isLogoModalOpen = false;
      state.isSettingModalOpen = false;
      state.isLogoutModalOpen = false;
      state.isAddModalOpen = false;
      state.isEditModalOpen = true;
      state.isDailyNormaModalOpen = false;
      state.editModalData = actions.payload || {
        amount: "",
        date: "",
        _id: "",
      };
    },
    closeEditModal: (state) => {
      state.isEditModalOpen = false;
      state.editModalData = {
        amount: "",
        date: "",
        _id: "",
      };
    },

    openDailyNormaModal: (state) => {
      state.isLogoModalOpen = false;
      state.isSettingModalOpen = false;
      state.isLogoutModalOpen = false;
      state.isAddModalOpen = false;
      state.isEditModalOpen = false;
      state.isDailyNormaModalOpen = true;
    },
    closeDailyNormaModal: (state) => {
      state.isDailyNormaModalOpen = false;
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
  openEditModal,
  closeEditModal,
  openDailyNormaModal,
  closeDailyNormaModal,
} = modalSlice.actions;

export default modalSlice.reducer;
