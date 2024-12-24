export const selectLogoModal = (state) => state.modal.isLogoModalOpen;
export const selectSettingModal = (state) => state.modal.isSettingModalOpen;
export const selectLogoutModal = (state) => state.modal.isLogoutModalOpen;
export const selectAddModal = (state) => state.modal.isAddModalOpen;
export const selectEditModal = (state) => state.modal.isEditModalOpen;
export const selectEditData = (state) => state.modal.editModalData;
export const selectDailyNormaModal = (state) =>
  state.modal.isDailyNormaModalOpen;
export const selectDeleteModal = (state) => state.modal.isDeleteModalOpen;
export const selectDeleteData = (state) => state.modal.deleteModalData;
export const selectResetPasswordModal = (state) =>
  state.modal.isResetPasswordModalOpen;
export const selectBodyBlock   = (state) => state.modal.isBodyBlock;
