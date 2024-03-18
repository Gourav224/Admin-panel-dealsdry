import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";

const LoginHeader = () => {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: "Create Employee ",
      slug: "/create-employee",
    },
    {
      name: "Employee List",
      slug: "/employee-list",
    },
  ];
  return (
    <ul className="flex ml-auto">
      {navItems.map((item) => (
        <li key={item.name}>
          <button
            onClick={() => navigate(item.slug)}
            className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
          >
            {item.name}
          </button>
        </li>
      ))}
      <li>
        <div className="inline-bock px-6 py-2  ">
          {userData?.fullName} -
        </div>
      </li>
      <li>
        <LogoutBtn />
      </li>
    </ul>
  );
};

export default LoginHeader;
