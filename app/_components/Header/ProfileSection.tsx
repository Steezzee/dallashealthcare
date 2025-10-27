import React from "react";

const ProfileSection: React.FC = () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
    <div style={{
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      background: "#ced4d9ff"
    }}>
      <img src="/defaultProfilePic.svg" 
        alt="Profile Picture" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
    <div>
      <div style={{ fontWeight: "bold", color: "#0E3C35", fontFamily: "Kanit, sans-serif" }}>username</div>
      <div style={{ fontSize: "0.9em", color: "#0E3C35", fontFamily: "Kanit, sans-serif" }}>ID: xx-xxx</div>
    </div>
  </div>
);

export default ProfileSection;
