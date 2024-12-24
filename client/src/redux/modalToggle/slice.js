import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isBodyBlock:false,
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
      state.isBodyBlock = true;
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
      state.isBodyBlock = false;
      state.isLogoModalOpen = false;
    },

    openSettingModal: (state) => {
      state.isBodyBlock = true;
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
      state.isBodyBlock = false;
      state.isSettingModalOpen = false;
    },

    openLogoutModal: (state) => {
      state.isBodyBlock = true;
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
      state.isBodyBlock = false;
      state.isLogoutModalOpen = false;
    },

    openAddModal: (state) => {
      state.isBodyBlock = true;
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
      state.isBodyBlock = false;
      state.isAddModalOpen = false;
    },

    openEditModal: (state, actions) => {
      state.isBodyBlock = true;
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
      state.isBodyBlock = false;
      state.isEditModalOpen = false;
      state.editModalData = {
        amount: "",
        date: "",
        _id: "",
      };
    },

    openDailyNormaModal: (state) => {
      state.isBodyBlock = true;
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
      state.isBodyBlock = false;
      state.isDailyNormaModalOpen = false;
    },

    openDeleteModal: (state, action) => {
      state.isBodyBlock = true;
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
      state.isBodyBlock = false;
      state.isDeleteModalOpen = false;
      state.deleteModalData = { id: "" };
    },

    openResetPasswordModal: (state) => {
      state.isBodyBlock = true;
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
      state.isBodyBlock = false;
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
