import React from "react";

const SpellContext = React.createContext({
  status: null,
  setStatus: () => {},
});

export default SpellContext;
