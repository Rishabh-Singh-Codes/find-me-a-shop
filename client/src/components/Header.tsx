import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootStateType } from "../store/store";

const Header = () => {
    const location = useLocation();
    const isLoggedIn = useSelector((state: RootStateType) => state.auth.isLoggedIn)

    const isRegisterOrLoginPage = ["/register", "/login"].includes(
      location.pathname
    );

  return (
    <div className="bg-gradient-to-b from-orange-400 py-6 relative z-10">
      <div className="container mx-auto flex justify-between">
        <span className={`text-xl md:text-3xl font-bold tracking-tight hover:cursor-pointer hover:text-teal-600 transition ${isRegisterOrLoginPage && "text-white"}`}>
          <Link to="/">Find Me A Coffee Shop</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
              <>
                <Link
                  className="flex items-center px-3 font-bold hover:text-teal-600 rounded-md"
                  to="/my-orders"
                >
                  My Orders
                </Link>
                {/* <SignOutButton /> */}
              </>
            ) : (
          <Link
            to="/sign-in"
            className="flex bg-white rounded-md items-center px-3 font-bold hover:cursor-pointer hover:bg-gray-100 hover:text-teal-600 transition"
          >
            Sign In
          </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
