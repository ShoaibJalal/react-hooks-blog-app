import React, { useState, useEffect } from "react";
import { useNavigation } from "react-navi";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBIcon
} from "mdbreact";

import {
  useUserState,
  useDispatch,
  useDebouncedUndo,
  useAPICreatePost
} from "../hooks";

export default function CreatePost() {
  const user = useUserState();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");

  const [
    content,
    setContent,
    { undo, redo, canUndo, canRedo }
  ] = useDebouncedUndo();

  const [post, createPost] = useAPICreatePost();

  const navigation = useNavigation();

  useEffect(() => {
    if (post && post.data) {
      dispatch({ type: "CREATE_POST", ...post.data });
      navigation.navigate(`/view/${post.data.id}`);
    }
  }, [dispatch, navigation, post]);

  function handleTitle(evt) {
    setTitle(evt.target.value);
  }
  function handleContent(e) {
    const { value } = e.target;
    setContent(value);
  }

  function handleCreate() {
    createPost({ title, content, author: user });
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
            <MDBBtn
              type="button"
              size="sm"
              rounded
              outline
              color="warning"
              onClick={undo}
              disabled={!canUndo}
            >
              Undo
            </MDBBtn>
            <MDBBtn
              type="button"
              size="sm"
              rounded
              outline
              color="info"
              onClick={redo}
              disabled={!canRedo}
            >
              Redo
            </MDBBtn>
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
