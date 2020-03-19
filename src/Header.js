import React, { useContext } from "react";
import { ThemeContext } from "./contexts";

const Header = ({ text }) => {
  const { primaryColor } = useContext(ThemeContext);
  return (
    <>
      <h1 className="font-weight-bold " style={{ color: primaryColor }}>
        {text}
      </h1>
    </>
  );
};
export default Header;
