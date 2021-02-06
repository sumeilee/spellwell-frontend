import { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";

import AuthContext from "../contexts/AuthContext";
import NavContext from "../contexts/NavContext";

const Header = (props) => {
  const { user } = useContext(AuthContext);
  const { page } = useContext(NavContext);

  const handleLogout = () => {
    props.cookies.remove("token", { path: "/" });
    window.location.href = "/";
  };

  return (
    <>
      {page !== "spell" && (
        <div className="px-4 py-4 h-20 flex justify-between align-center">
          <div>
            <Link to="/" className="text-xl">
              spellwell
            </Link>
          </div>
          <div>
            <Link to="/" className="px-2">
              Browse WordBags
            </Link>
            <Link to="/new-bag" className="px-2">
              Create WordBag
            </Link>
            {!user && (
              <>
                <Link to="/login" className="px-2">
                  Login
                </Link>
                <Link to="/register" className="px-2">
                  Sign Up
                </Link>
              </>
            )}
            {user && (
              <>
                <Link to="/dashboard" className="px-2">
                  Dashboard
                </Link>
                <p
                  className="inline px-2 cursor-pointer"
                  onClick={handleLogout}
                >
                  Log Out
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(withCookies(Header));
