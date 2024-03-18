import { Link } from "react-router-dom";
import Logo from "../Logo";
import LoginHeader from "./LoginHeader";
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  return (
    <header className="py-3 shadow bg-customblue">
      <nav className="flex">
        <div className="mr-4">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        {authStatus && <LoginHeader />}
      </nav>
    </header>
  );
};

export default Header;
