import React from "react";

const THEMES = [
  { primaryColor: "#33b5e5", secondaryColor: "#00C851" },
  { primaryColor: "#ff4444", secondaryColor: "#FF8800" }
];

function ThemeItem({ theme, active, onClick }) {
  return (
    <span
      onClick={onClick}
      style={{
        cursor: "pointer",
        paddingLeft: 8,
        fontWeight: active ? "bold" : "normal"
      }}
    >
      <span style={{ color: theme.primaryColor }}>Primary</span> /{" "}
      <span style={{ color: theme.secondaryColor }}>Secondary</span>
    </span>
  );
}

export default function ChangeTheme({ theme, setTheme }) {
  function isActive(t) {
    return (
      t.primaryColor === theme.primaryColor &&
      t.secondaryColor === theme.secondaryColor
    );
  }
  return (
    <div>
      {" "}
      Change theme:{" "}
      {THEMES.map((t, i) => (
        <ThemeItem
          key={"theme-" + i}
          theme={t}
          active={isActive(t)}
          onClick={() => setTheme(t)}
        />
      ))}{" "}
    </div>
  );
}
