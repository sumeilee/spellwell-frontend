import { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import jwt from "jsonwebtoken";
import moment from "moment";

import api from "../services/api";

import AuthContext from "../contexts/AuthContext";

const Login = (props) => {
  const [errMsg, setErrMsg] = useState("");
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
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setErrMsg(err.response.data.message);
      } else {
        setErrMsg("Error logging in");
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-60 mt-10 mx-auto">
      <h1 className="text-2xl py-2">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col mt-4">
        <div className="flex flex-col">
          <label htmlFor="username" className="font-semibold ml-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="py-2 px-4 mt-1 border rounded-lg focus:outline-none"
          />
        </div>

        <div className="flex flex-col mt-4">
          <label htmlFor="password" className="font-semibold ml-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="py-2 px-4 mt-1 border rounded-lg focus:outline-none"
          />
        </div>

        <p className="text-red-500 ml-1 mt-2 h-2">{errMsg}</p>

        <button
          type="submit"
          className="text-md text-white border rounded-xl py-2 px-4 mt-8 shadow-xl bg-purple-600 focus:outline-none"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default withRouter(withCookies(Login));
