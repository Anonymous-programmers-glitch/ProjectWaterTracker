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
    isDeleteModalOpen: false,
    isResetPasswordModalOpen: false,
    deleteModalData: { id: "" },
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
      state.isDeleteModalOpen = false;
      state.isResetPasswordModalOpen = false;
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
      state.isDeleteModalOpen = false;
      state.isResetPasswordModalOpen = false;
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
      state.isDeleteModalOpen = false;
      state.isResetPasswordModalOpen = false;
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
      state.isDeleteModalOpen = false;
      state.isResetPasswordModalOpen = false;
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
      state.isDeleteModalOpen = false;
      state.isResetPasswordModalOpen = false;
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
      state.isDeleteModalOpen = false;
      state.isResetPasswordModalOpen = false;
    },
    closeDailyNormaModal: (state) => {
      state.isDailyNormaModalOpen = false;
    },

    openDeleteModal: (state, action) => {
      state.isLogoModalOpen = false;
      state.isSettingModalOpen = false;
      state.isLogoutModalOpen = false;
      state.isAddModalOpen = false;
      state.isEditModalOpen = false;
      state.isDailyNormaModalOpen = false;
      state.isDeleteModalOpen = true;
      state.isResetPasswordModalOpen = false;
      state.deleteModalData = action.payload || {
        id: "",
      };
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
      state.deleteModalData = { id: "" };
    },

    openResetPasswordModal: (state) => {
      state.isLogoModalOpen = false;
      state.isSettingModalOpen = false;
      state.isLogoutModalOpen = false;
      state.isAddModalOpen = false;
      state.isEditModalOpen = false;
      state.isDailyNormaModalOpen = false;
      state.isDeleteModalOpen = false;
      state.isResetPasswordModalOpen = true;
    },
    closeResetPasswordModal: (state) => {
      state.isResetPasswordModalOpen = false;
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
  openDeleteModal,
  closeDeleteModal,
  openResetPasswordModal,
  closeResetPasswordModal,
} = modalSlice.actions;

export default modalSlice.reducer;
