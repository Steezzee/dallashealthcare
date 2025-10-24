import React from "react";

const ProfileSection: React.FC = () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
    <div style={{
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      background: "#2064a8ff"
    }} />
    <div>
      <div style={{ fontWeight: "bold", color: "#0E3C35", fontFamily: "Kanit, sans-serif" }}>username</div>
      <div style={{ fontSize: "0.9em", color: "#0E3C35", fontFamily: "Kanit, sans-serif" }}>ID: xx-xxx</div>
    </div>
  </div>
);

export default ProfileSection;
