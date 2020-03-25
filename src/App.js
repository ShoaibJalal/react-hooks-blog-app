import React, { useReducer, useEffect, useState } from "react";

import { MDBContainer, MDBRow } from "mdbreact";

import { ThemeContext, StateContext } from "./contexts";
import appReducer from "./reducers";
import HeaderBar from "./pages/HeaderBar";
import HomePage from "./pages/HomePage";

function App() {
  const [theme, setTheme] = useState({
    primaryColor: "#33b5e5",
    secondaryColor: "#00C851"
  });
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    posts: [],
    error: ""
  });
  const { user, error } = state;

  useEffect(() => {
    if (user) {
      document.title = `${user} - Your Blog`;
    } else {
      document.title = " Your Blog App";
    }
  }, [user]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <ThemeContext.Provider value={theme}>
        <MDBContainer>
          <MDBRow className="justify-content-center align-items-center  ">
            <HeaderBar setTheme={setTheme} />
            <br />
            <hr />
            <HomePage />
          </MDBRow>
        </MDBContainer>
      </ThemeContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
