import toast from "react-hot-toast";
import { signup } from "../../redux/user/operations";

const EmailRejacted = () => {
  if (signup.user.email) return toast.error("This didn't work.");
};

export { EmailRejacted };
