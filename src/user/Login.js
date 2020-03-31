import React, { useState, useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { useInput } from "react-hookedup";
import { StateContext } from "../contexts";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

const Login = () => {
  const { value: username, bindToInput: bindUsername } = useInput("");
  const { value: password, bindToInput: bindPassword } = useInput("");
  const [loginFailed, setLoginFailed] = useState(false);

  const { dispatch } = useContext(StateContext);

  const [user, login] = useResource((username, password) => ({
    url: `/login/${encodeURI(username)}/${encodeURI(password)}`,
    method: "get"
  }));

  useEffect(() => {
    if (user && user.data) {
      if (user.data.length > 0) {
        setLoginFailed(false);
        dispatch({ type: "LOGIN", username: user.data[0].username });
      } else {
        setLoginFailed(true);
      }
    }
    if (user && user.error) {
      setLoginFailed(true);
    }
  }, [dispatch, user]);

  return (
    <MDBContainer>
      <MDBRow className="justify-content-center align-items-center mt-5 pt-5 ">
        <MDBCol md="6">
          <form
            onSubmit={e => {
              e.preventDefault();
              login(username, password);
            }}
          >
            <p className="h5 text-center mb-4">Sign in</p>
            <div className="grey-text">
              <MDBInput
                label="Type your username"
                value={username}
                {...bindUsername}
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Type your password"
                value={password}
                {...bindPassword}
                icon="lock"
                group
                type="password"
                validate
              />
            </div>
            <div className="text-center">
              <MDBBtn disabled={username.length === 0} type="submit">
                Login
              </MDBBtn>
            </div>
            {loginFailed && (
              <span style={{ color: "red" }}>Invalid username or password</span>
            )}
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
