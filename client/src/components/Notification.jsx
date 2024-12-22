import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  // selectError,
  selectResponseMessage,
  selectResponseStatus,
} from "../../redux/user/selectors";
const Notification = () => {
  // const error = useSelector(selectError);
  const status = useSelector(selectResponseStatus);
  const message = useSelector(selectResponseMessage);
  useEffect(() => {
    if (status === 200 || status === 201 || status === 204) {
      toast.success(message);
    } else {
      status === 400 || status === 401 || (status === 409) | (status === 500);
      toast.error(message);
    }
  }, [status]);
  return null;
};
export default Notification;
