import { useSelector } from "react-redux";
import { loggedInUser } from "../redux/userReducer";
import { RootState } from "../store/store";
import { toast } from "react-toastify";
import { Navigate} from "react-router-dom";
import Loader from "../components/loader/Loader";

interface prop {
  component: React.ReactNode;
}

const Authenticator = ({ component }: prop) => {
  const user: loggedInUser | void = useSelector((state: RootState) => {
    return state.user.loggedInUser;
  });
  const status = useSelector((state: RootState) => {
    return state.user.status;
  });
  const { loggedIn, userType } = user;

  if (status === "loading") {
    return (
      <div className="h-[70vh] w-[90%] mx-auto flex justify-center items-center">
        <Loader />
      </div>
    );
  } else if ((loggedIn && userType === "customer") || userType === "admin") {
    return component;
  } else {
    toast.error("You must be logged in.")
    return <Navigate to={"/login"} />
  }
};

export default Authenticator;
