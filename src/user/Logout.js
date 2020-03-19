import React, { useContext } from "react";
import { StateContext } from "../contexts";
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";

const Logout = () => {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
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
