import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import api from "../../config/apiCall";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    await api.logout();
    dispatch(logout());
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
