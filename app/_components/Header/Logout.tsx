'use client';

import React from "react";
import { useRouter, usePathname } from "next/navigation";
const Logout: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();


  const logOutUser = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/"; 
  };
  return(
    <div style={{ display: "flex", alignItems: "center"}}>

      <button
      onClick={logOutUser}
      style={{
        backgroundColor: "#0E3C35", color: "white", borderRadius: "50px",
        padding: "0.6rem 1.2rem",
        fontWeight: 600,
        fontSize: "0.9rem",
        transition: "all 0.2s ease-in-out",
        fontFamily: "Kanit, sans-serif",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = "#374151")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "#1F2937")
      }
      > 
        Logout
      </button>

    </div>
    );
};

export default Logout;