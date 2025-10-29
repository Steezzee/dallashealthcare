"use client";

import { useState } from "react";
import UploadedDocuments from "../_components/UploadedDocuments";

export default function Insurance() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "'Kanit', sans-serif",
      }}
    >
      <main
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "2rem",
          padding: "2rem",
          minHeight: "60vh",
          flex: 1,
        }}
      >
        <UploadedDocuments />

        {/*  MyInsurance Section   */}
        <section style={{ flex: 1 }}>
          <h2>Upload your documents here!</h2>

          {/* Upload Document Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              backgroundColor: "#C4D9D2",
              color: "black",
              border: "none",
              borderRadius: "10px",
              padding: "1rem 2rem",
              fontSize: "1.1rem",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#ACCCC1")
            }
            onMouseOut={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#C4D9D2")
            }
          >
            Upload Document
          </button>
        </section>
      </main>

      {/*  Upload Modal  */}
      {isModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
              padding: "2rem",
              maxWidth: "500px",
              width: "90%",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <span
              onClick={() => setIsModalOpen(false)}
              style={{
                float: "right",
                cursor: "pointer",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              &times;
            </span>

            <h2 style={{ textAlign: "center" }}>Upload a Document</h2>

            <form>
              <label htmlFor="title">Document Name:</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter title"
                required
                style={inputStyle}
              />

              <label htmlFor="fileNumber">File Number:</label>
              <input
                type="text"
                id="fileNumber"
                name="fileNumber"
                placeholder="Enter file number"
                required
                style={inputStyle}
              />

              <label htmlFor="date">Date (MM/DD/YY):</label>
              <input
                type="text"
                id="date"
                name="date"
                placeholder="MM/DD/YY"
                required
                pattern="\d{2}/\d{2}/\d{2}"
                style={inputStyle}
              />

              <div
                id="drop-area"
                style={{
                  border: "2px dashed #4CAF50",
                  borderRadius: "8px",
                  padding: "2rem",
                  textAlign: "center",
                  marginTop: "1.5rem",
                  backgroundColor: "#fff",
                  transition: "background-color 0.3s, border-color 0.3s",
                }}
              >
                <p>Drag & drop your file here, or</p>
                <input type="file" id="fileInput" name="file" required style={{ display: "none" }} />
                <label
                  htmlFor="fileInput"
                  style={{
                    display: "inline-block",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "0.5rem 1.5rem",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                >
                  Browse Files
                </label>
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  marginTop: "2rem",
                  padding: "0.8rem",
                  backgroundColor: "#30a05f",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.5rem",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "1rem",
  marginTop: "0.5rem",
};