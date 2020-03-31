import React from "react";

import { useTheme } from "./hooks";

const Header = ({ text }) => {
  const { primaryColor } = useTheme();
  return (
    <>
      <h1 className="font-weight-bold " style={{ color: primaryColor }}>
        {text}
      </h1>
    </>
  );
};
export default Header;
