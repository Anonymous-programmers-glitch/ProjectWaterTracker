import { toast } from "react-hot-toast";

export const updateNotifier = async ({
  dispatchAction,
  values,
  closeModal,
  resetForm,
  status,
  message,
}) => {
  const response = await dispatchAction(values);
  const updateStatus =
    response.payload?.status ||
    response.payload?.data?.status ||
    response.payload ||
    response.error?.status;

  const updateMessage =
    message ||
    response.payload?.error ||
    response.payload?.data?.message ||
    response.payload?.message;

  if (updateStatus === status) {
    toast.success(updateMessage);
    if (closeModal) closeModal();
    if (resetForm) resetForm();
  } else {
    toast.error(updateMessage);
  }
};
