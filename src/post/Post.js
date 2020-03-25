import React, { useContext } from "react";
import { ThemeContext } from "../contexts";
import { MDBListGroupItem } from "mdbreact";
function Post({ title, content, author }) {
  console.log("rendering Post");
  const { secondaryColor } = useContext(ThemeContext);
  return (
    <MDBListGroupItem className="my-1">
      <div className="d-flex w-100 justify-content-between ">
        <h3 style={{ color: secondaryColor }} className="mb-1">
          {title}
        </h3>
      </div>
      <p className="mb-1">{content}</p>
      <small className="text-muted">
        <i>
          Written by <b>{author}</b>
        </i>
      </small>
    </MDBListGroupItem>
  );
}
export default React.memo(Post);
