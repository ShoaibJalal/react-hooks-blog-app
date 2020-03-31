import React from "react";
import { MDBListGroup, MDBContainer, MDBRow } from "mdbreact";

import { usePostsState } from "../hooks";
import Post from "./Post";

export default function PostList() {
  const posts = usePostsState();

  return (
    <MDBContainer>
      <MDBRow className="justify-content-center align-items-center mt-3 pt-2 ">
        <MDBListGroup style={{ width: "40rem" }}>
          {posts.map((p, i) => (
            <Post {...p} key={"postId-" + i} short={true} />
          ))}
        </MDBListGroup>
      </MDBRow>
    </MDBContainer>
  );
}
