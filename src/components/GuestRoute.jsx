import { withRouter, Redirect, Route } from "react-router-dom";
import { withCookies } from "react-cookie";

const GuestRoute = (props) => {
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
        <Redirect to="/dashboard" />
      ) : (
        <Route {...props} component={props.component} />
      )}
    </>
  );
};

export default withCookies(withRouter(GuestRoute));
