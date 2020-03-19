import React, { useContext } from "react";
import { StateContext } from "../contexts";

import { MDBListGroup, MDBContainer, MDBRow } from "mdbreact";
import Post from "./Post";
export default function PostList() {
  const { state } = useContext(StateContext);
  const { posts } = state;

  return (
    <MDBContainer>
      <MDBRow className="justify-content-center align-items-center mt-3 pt-2 ">
        <MDBListGroup style={{ width: "40rem" }}>
          {posts.map((p, i) => (
            <Post {...p} key={"postId-" + i} />
          ))}
        </MDBListGroup>
      </MDBRow>
    </MDBContainer>
  );
}
