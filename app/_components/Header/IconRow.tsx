import React from "react";

const IconRow: React.FC = () => (
  <div style={{ display: "flex", gap: "16px" }}>
    <span style={{
      width: 36, height: 36, background: "#C4D9D2", borderRadius: "50%", display: "inline-block"
    }} title="Star" />
    <span style={{
      width: 36, height: 36, background: "#B1C9C0", borderRadius: "50%", display: "inline-block"
    }} title="Search" />
    <span style={{
      width: 36, height: 36, background: "#7B998E", borderRadius: "50%", display: "inline-block"
    }} title="Menu" />
  </div>
);

export default IconRow;
