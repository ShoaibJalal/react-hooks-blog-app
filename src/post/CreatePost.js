import React, { useState, useContext } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../contexts";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBIcon
} from "mdbreact";

export default function CreatePost() {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [, createPost] = useResource(({ title, content, author }) => ({
    url: "/posts",
    method: "post",
    data: { title, content, author }
  }));

  function handleTitle(evt) {
    setTitle(evt.target.value);
  }
  function handleContent(evt) {
    setContent(evt.target.value);
  }

  function handleCreate() {
    createPost({ title, content, author: user });
    dispatch({ type: "CREATE_POST", title, content, author: user });
  }

  return (
    <MDBContainer>
      <MDBRow className="justify-content-center align-items-center mt-3 pt-2 ">
        <MDBCol md="6">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleCreate();
            }}
          >
            {" "}
            <p className="h5 text-center mb-4">Create Post</p>
            <p className="font-weight-bolder">
              <MDBIcon icon="user" size="lg" /> Author: <b>{user}</b>
            </p>
            <MDBInput
              label="Title"
              icon="tag"
              group
              type="text"
              validate
              error="wrong"
              success="right"
              value={title}
              onChange={handleTitle}
            />
            <MDBInput
              type="textarea"
              rows="2"
              label="Your message"
              icon="pencil-alt"
              value={content}
              onChange={handleContent}
            />{" "}
            <div className="text-center">
              <MDBBtn type="submit" outline color="secondary">
                Create
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
