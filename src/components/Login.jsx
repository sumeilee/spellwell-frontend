import { useContext } from "react";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import jwt from "jsonwebtoken";
import moment from "moment";

import api from "../services/api";

import AuthContext from "../contexts/AuthContext";

const Login = (props) => {
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await api.login({ username, password });

      if (response.status === 200) {
        const { token, expiresAt } = response.data;

        props.cookies.set("token", token, {
          path: "/",
          expires: moment.unix(expiresAt).toDate(),
        });

        const user = jwt.decode(token);
        setUser(user);

        props.history.push("/dashboard");
      } else {
        console.log(response.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" className="border" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="border"
          />
        </div>

        <button type="submit" className="border">
          Login
        </button>
      </form>
    </div>
  );
};

export default withRouter(withCookies(Login));
