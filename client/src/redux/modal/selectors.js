export const selectLogoModal = (state) => state.modal.isLogoModalOpen;
export const selectSettingModal = (state) => state.modal.isSettingModalOpen;
export const selectLogoutModal = (state) => state.modal.isLogoutModalOpen;
export const selectAddModal = (state) => state.modal.isEditModalOpen;
export const selectEditModal = (state) => state.modal.isAddModalOpen;
export const selectDailyNormaModal = (state) =>
  state.modal.isDailyNormaModalOpen;
