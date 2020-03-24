import React, { useReducer, useEffect, useState } from "react";
import { useResource } from "react-request-hook";
import appReducer from "./reducers";
import { MDBContainer, MDBRow } from "mdbreact";
import { ThemeContext, StateContext } from "./contexts";
import ChangeTheme from "./ChangeTheme";

import PostList from "./post/PostList";
import CreatePost from "./post/CreatePost";
import UserBar from "./user/UserBar";
import Header from "./Header";

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

  const [posts, getPosts] = useResource(() => ({
    url: "/posts",
    method: "get"
  }));
  useEffect(getPosts, []);

  useEffect(() => {
    if (posts && posts.error) {
      dispatch({ type: "POSTS_ERROR" });
    }
    if (posts && posts.data) {
      dispatch({ type: "FETCH_POSTS", posts: posts.data });
    }
  }, [posts]);
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
            {error && <b>{error}</b>}
            <PostList />
          </MDBRow>
        </MDBContainer>
      </ThemeContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
