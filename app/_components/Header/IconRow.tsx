import React from "react";

const IconRow: React.FC = () => (
  <div style={{ display: "flex", gap: "16px" }}>

    <span style={{
      width: 54, height: 54, background: "#6ab2eeff", borderRadius: "50%", display: "flex", overflow: "hidden", position: "relative", alignItems: "center", justifyContent: "center",
    }}
    >
    <img src="/searchPlaceholder.svg" 
        alt="Profile Picture" style={{ width: "80%", height: "80%", objectFit: "cover" }} 
    />
    </span>

    <span style={{
      width: 54, height: 54, background: "#90caf9", borderRadius: "100%", display: "flex", overflow: "hidden", position: "relative", alignItems: "center", justifyContent: "center",
    }} title="Menu"
    >
    <img src="/hamburgerPlaceholder.svg" 
        alt="Profile Picture" style={{ width: "80%", height: "80%", objectFit: "cover",  }} 
        />
    </span>
  </div>
);

export default IconRow; 
