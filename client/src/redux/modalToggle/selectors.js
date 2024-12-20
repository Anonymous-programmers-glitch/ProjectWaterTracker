export const selectLogoModal = (state) => state.modal.isLogoModalOpen;
export const selectSettingModal = (state) => state.modal.isSettingModalOpen;
export const selectLogoutModal = (state) => state.modal.isLogoutModalOpen;
export const selectAddModal = (state) => state.modal.isAddModalOpen;
export const selectEditModal = (state) => state.modal.isEditModalOpen;
export const selectEditData = (state) => state.modal.editModalData;
export const selectDailyNormaModal = (state) =>
  state.modal.isDailyNormaModalOpen;
