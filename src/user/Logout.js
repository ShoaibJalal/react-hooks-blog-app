import React from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";

import { useDispatch, useUserState } from "../hooks";

const Logout = () => {
  const dispatch = useDispatch();
  const user = useUserState();

  return (
    <MDBRow className="justify-content-center align-items-center  ">
      <MDBCol md="6">
        <form
          onSubmit={e => {
            e.preventDefault();
            dispatch({ type: "LOGOUT" });
          }}
        >
          <div className="ml-2">
            Logged in as: <b>{user}</b>
            <MDBBtn
              size="sm"
              color="info"
              outline
              className="mr-1 px-3 py-2 z-depth-0"
              type="submit"
            >
              Logout
            </MDBBtn>
          </div>
        </form>
      </MDBCol>
    </MDBRow>
  );
};

export default Logout;
