import React, { useState, useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../contexts";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

const Register = () => {
  const { dispatch } = useContext(StateContext);

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [user, register] = useResource((username, password) => ({
    url: "/users",
    method: "post",
    data: { username, password }
  }));

  useEffect(() => {
    if (user && user.data) {
      dispatch({ type: "REGISTER", username: user.data.username });
    }
  }, [dispatch, user]);

  function handleUsername(evt) {
    setUsername(evt.target.value);
  }
  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function handlePasswordRepeat(evt) {
    setPasswordRepeat(evt.target.value);
  }

  return (
    <MDBContainer>
      <MDBRow className="justify-content-center align-items-center mt-5 pt-5 ">
        <MDBCol md="6">
          <form
            onSubmit={e => {
              e.preventDefault();
              register(username, password);
            }}
          >
            <p className="h5 text-center mb-4">Sign up</p>
            <div className="grey-text">
              <MDBInput
                label="Type your username"
                value={username}
                onChange={handleUsername}
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Password"
                icon="lock"
                group
                type="password"
                validate
                value={password}
                onChange={handlePassword}
              />
              <MDBInput
                label="Repeat password"
                icon="lock"
                group
                type="password"
                validate
                value={passwordRepeat}
                onChange={handlePasswordRepeat}
              />
            </div>
            <div className="text-center">
              <MDBBtn
                type="submit"
                disabled={
                  username.length === 0 ||
                  password.length === 0 ||
                  password !== passwordRepeat
                }
              >
                Register
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Register;
