'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Logout: React.FC = () => {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const confirmLogout = () => {
    localStorage.removeItem("loggedInUser");
    router.push("/");
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={() => setShowConfirm(true)}
          style={{
            backgroundColor: "#0E3C35",
            color: "white",
            borderRadius: "60px",
            padding: "0.6rem 1.2rem",
            fontWeight: 600,
            fontSize: "0.9rem",
            transition: "all 0.2s ease-in-out",
            fontFamily: "Kanit, sans-serif",
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#249b89")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#0E3C35")
          }
        >
          Logout
        </button>
      </div>

      {/* Confirmation pop-up */}
      {showConfirm && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <p style={{ marginBottom: "1rem" }}>
              Are you sure you want to logout?
            </p>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={confirmLogout}
                style={{ ...styles.btn, backgroundColor: "#AFCEC3" }}
              >
                Yes
              </button>

              <button
                onClick={() => setShowConfirm(false)}
                style={{ ...styles.btn, backgroundColor: "#e57373" }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;

          const styles: { [key: string]: React.CSSProperties } = {
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.4)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            },
            modal: {
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "12px",
              width: "280px",
              textAlign: "center",
              fontFamily: "Kanit, sans-serif",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            },
            btn: {
              flex: 1,
              padding: "0.5rem",
              borderRadius: "6px",
              border: "none",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            },
          };









































