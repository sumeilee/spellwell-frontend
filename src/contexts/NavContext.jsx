import React, { useState } from "react";

const NavContext = React.createContext({
  page: null,
  setPage: () => {},
});

export const NavContextProvider = (props) => {
  const [page, setPage] = useState(null);

  return (
    <NavContext.Provider value={{ page, setPage }}>
      {props.children}
    </NavContext.Provider>
  );
};

export default NavContext;
