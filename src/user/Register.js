import React, { useEffect } from "react";
import { useInput } from "react-hookedup";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

import { useDispatch, useAPIRegister } from "../hooks";

function useRegisterEffect(user, dispatch) {
  useEffect(() => {
    if (user && user.data) {
      dispatch({ type: "REGISTER", username: user.data.username });
    }
  }, [dispatch, user]);
}

const Register = () => {
  const dispatch = useDispatch();

  const { value: username, bindToInput: bindUsername } = useInput("");
  const { value: password, bindToInput: bindPassword } = useInput("");
  const { value: passwordRepeat, bindToInput: bindPasswordRepeat } = useInput(
    ""
  );

  const [user, register] = useAPIRegister();
  useRegisterEffect(user, dispatch);

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
                {...bindUsername}
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
                {...bindPassword}
              />
              <MDBInput
                label="Repeat password"
                icon="lock"
                group
                type="password"
                validate
                value={passwordRepeat}
                {...bindPasswordRepeat}
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
