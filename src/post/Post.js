import React, { useContext } from "react";
import { Link } from "react-navi";
import { MDBListGroupItem } from "mdbreact";

import { ThemeContext } from "../contexts";

function Post({ id, title, content, author, short = false }) {
  let processedContent = content;
  if (short) {
    if (content.length > 30) {
      processedContent = content.substring(0, 30) + "...";
    }
  }

  console.log("rendering Post");
  const { secondaryColor } = useContext(ThemeContext);
  return (
    <MDBListGroupItem className="my-1">
      <div className="d-flex w-100 justify-content-between ">
        <h3 style={{ color: secondaryColor }} className="mb-1">
          {title}
        </h3>
      </div>
      <p className="mb-1">{processedContent}</p>
      {short && (
        <div>
          <br />
          <Link href={`/view/${id}`}>View full post</Link>
        </div>
      )}
      <small className="text-muted">
        <i>
          Written by <b>{author}</b>
        </i>
      </small>
    </MDBListGroupItem>
  );
}
export default React.memo(Post);
