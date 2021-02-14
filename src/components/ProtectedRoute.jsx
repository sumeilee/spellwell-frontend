import { withRouter, Redirect, Route } from "react-router-dom";
import { withCookies } from "react-cookie";

const ProtectedRoute = (props) => {
  const isAuthenticated = () => {
    const token = props.cookies.get("token");

    if (!token) {
      return false;
    }

    return true;
  };

  return (
    <>
      {isAuthenticated() ? (
        <Route {...props} component={props.component} />
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default withCookies(withRouter(ProtectedRoute));
