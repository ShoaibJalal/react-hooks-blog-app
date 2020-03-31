import React, { useReducer, useEffect, useState } from "react";
import { Router, View } from "react-navi";
import { mount, route } from "navi";
import { MDBContainer, MDBRow } from "mdbreact";

import { ThemeContext, StateContext } from "./contexts";
import appReducer from "./reducers";
import HeaderBar from "./pages/HeaderBar";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

function App() {
  const routes = mount({
    "/": route({ view: <HomePage /> }),
    "/view/:id": route(req => {
      return { view: <PostPage id={req.params.id} /> };
    })
  });

  const [theme, setTheme] = useState({
    primaryColor: "#33b5e5",
    secondaryColor: "#00C851"
  });
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    posts: [],
    error: ""
  });
  const { user } = state;

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
            <Router routes={routes}>
              <HeaderBar setTheme={setTheme} />
              <br />
              <hr />
              <View />
            </Router>
          </MDBRow>
        </MDBContainer>
      </ThemeContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
