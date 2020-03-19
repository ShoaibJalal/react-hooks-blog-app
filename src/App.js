import React, { useReducer, useEffect, useState } from "react";
import appReducer from "./reducers";
import { MDBContainer, MDBRow } from "mdbreact";
import { ThemeContext, StateContext } from "./contexts";
import ChangeTheme from "./ChangeTheme";

import PostList from "./post/PostList";
import CreatePost from "./post/CreatePost";
import UserBar from "./user/UserBar";
import Header from "./Header";

const defaultPosts = [
  {
    title: "React Hooks",
    content: "The greatest thing since sliced bread!",
    author: "Shoaib Jalal"
  },
  {
    title: "Using React Fragments",
    content: "Keeping the DOM tree clean!",
    author: "Shoaib Jalal"
  }
];

function App() {
  const [theme, setTheme] = useState({
    primaryColor: "#33b5e5",
    secondaryColor: "#00C851"
  });
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    posts: defaultPosts
  });
  const { user, posts } = state;
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
            <Header text="Your Blog" />
          </MDBRow>
          <MDBRow className="justify-content-center align-items-center  ">
            <ChangeTheme theme={theme} setTheme={setTheme} />
            <UserBar />
            {user && <CreatePost />}
            <br />
            <hr />
            <PostList />
          </MDBRow>
        </MDBContainer>
      </ThemeContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
