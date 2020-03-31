import React, { useState, useEffect, useContext } from "react";

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
  let defaultWidth;
  if (typeof window !== `undefined`) {
    defaultWidth = window.innerWidth;
  }
  const useWindowSize = () => {
    const [dimensions, setDimensions] = useState({
      windowWidth: defaultWidth
    });
    useEffect(() => {
      const handler = () =>
        setDimensions({
          windowWidth: window.innerWidth
        });

      window.addEventListener(`resize`, handler);
      return () => window.removeEventListener(`resize`, handler);
    }, []);

    return dimensions;
  };

  let { windowWidth } = useWindowSize();
  const mobilePhone = windowWidth < 640;

  return (
    <div>
      <MDBRow className="justify-content-center align-items-center  ">
        <Header text="Your Blog" />
      </MDBRow>
      <MDBRow className="justify-content-center align-items-center  ">
        {!mobilePhone && <ChangeTheme theme={theme} setTheme={setTheme} />}
        {!mobilePhone && <br />}

        {!mobilePhone && (
          <React.Suspense fallback={"Loading..."}>
            <UserBar />
          </React.Suspense>
        )}

        {!mobilePhone && <br />}
        {user && <CreatePost />}
      </MDBRow>
    </div>
  );
}
