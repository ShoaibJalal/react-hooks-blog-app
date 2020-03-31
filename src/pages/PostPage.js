import React, { useEffect } from "react";
import { useResource } from "react-request-hook";
import { Link } from "react-navi";
import { MDBBtn } from "mdbreact";
import Post from "../post/Post";

export default function PostPage({ id }) {
  const [post, getPost] = useResource(() => ({
    url: `/posts/${id}`,
    method: "get"
  }));
  useEffect(getPost, [id]);
  return (
    <>
      <MDBBtn color="amber">
        <Link href="/">Go back</Link>
      </MDBBtn>
      {post && post.data ? <Post {...post.data} /> : "Loading..."}
      <hr />
    </>
  );
}
