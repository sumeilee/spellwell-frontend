import { useContext, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";

import AuthContext from "../contexts/AuthContext";
import NavContext from "../contexts/NavContext";

const Header = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { page } = useContext(NavContext);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    props.cookies.remove("token", { path: "/" });
    window.location.href = "/login";
  };

  return (
    <>
      {page !== "spell" && (
        <div className="sm:flex sm:items-center sm:justify-between sm:px-6 sm:py-2 shadow-md mb-4">
          <div className="flex justify-between h-20 items-centers px-6 py-4 sm:p-0">
            <div className="flex items-center">
              <Link to="/" className="text-3xl font-semibold">
                spellwell
              </Link>
            </div>
            <div className="flex items-center sm:hidden">
              <button
                type="button"
                onClick={handleMenuClick}
                className="block focus:outline-none"
              >
                <svg
                  className="fill-current h-4 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  )}
                </svg>
              </button>
            </div>
          </div>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } sm:flex sm:items-center`}
          >
            <Link to="/wordbags" className="block mx-3 my-1 px-4 py-2 rounded">
              Browse Word Bags
            </Link>
            <Link to="/new-bag" className="block mx-3 my-1 px-4 py-2 rounded">
              Create Word Bag
            </Link>
            {!user ? (
              <div
                className={`${
                  isMenuOpen ? "block" : "hidden"
                } sm:flex sm:items-center`}
              >
                <Link to="/login" className="block mx-3 my-1 px-4 py-2 rounded">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block mx-3 my-1 px-4 py-2 rounded "
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div
                className={`${
                  isMenuOpen ? "block" : "hidden"
                } py-2 sm:flex sm:items-center`}
              >
                <Link
                  to="/dashboard"
                  className="block mx-3 my-1 px-4 py-2 rounded"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block fmx-3 my-1 px-4 py-2 rounded focus:outline-none"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(withCookies(Header));
