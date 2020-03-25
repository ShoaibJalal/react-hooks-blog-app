import React, { useContext } from "react";
import { MDBRow } from "mdbreact";

import CreatePost from "../post/CreatePost";
import UserBar from "../user/UserBar";
import Header from "../Header";
import ChangeTheme from "../ChangeTheme";
import { ThemeContext, StateContext } from "../contexts";

export default function HeaderBar({ setTheme }) {
  const theme = useContext(ThemeContext);

  const { state } = useContext(StateContext);
  const { user } = state;

  return (
    <div>
      <MDBRow className="justify-content-center align-items-center  ">
        <Header text="Your Blog" />
      </MDBRow>
      <MDBRow className="justify-content-center align-items-center  ">
        <ChangeTheme theme={theme} setTheme={setTheme} />
        <React.Suspense fallback={"Loading..."}>
          <UserBar />
        </React.Suspense>
        {user && <CreatePost />}
      </MDBRow>
    </div>
  );
}
