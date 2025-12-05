"use client";

import React, { useState, useEffect } from "react";
import UploadedDocuments from "../_components/UploadedDocuments";
import InsuranceCards from "../_components/InsuranceCards";

type Doc = {
    title: string;
    fileNum: string;
    date: string;
    fileUrl?: string;  /* added fileUrl */
  }; 

export default function Insurance() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [docs, setDocs] = useState<Doc[]>([]);
  const [title, setTitle] = useState("");
  const [fileNum, setFileNum] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number|null>(null);

  useEffect(() => {
      if (typeof window !== "undefined") {
          const stored = localStorage.getItem("uploadedDocs");
          if (stored) {
              setDocs(JSON.parse(stored));
          }
        }
      }, []);

  const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if (!file){ /*added to ensure file is uploaded */
        alert("Please upload a file");
        return;
      }
      const fileUrl = URL.createObjectURL(file); /* added to click file to view it */
      const newDoc: Doc = { title, fileNum, date, fileUrl };
      const updatedDocs = [...docs, newDoc];


      setDocs(updatedDocs);

      if (typeof window !== "undefined") {
          localStorage.setItem("uploadedDocs", JSON.stringify(updatedDocs));
      }

      setIsModalOpen(false);
      setTitle("");
      setFileNum("");
      setDate("");
      setFile(null);
  };

  const requestDelete = (index: number, isDefault: boolean) =>{
    if (isDefault){
      alert("Deleting default documents requires aditional state management...");
    return;
    }

    setDeleteIndex(index);
    setIsDeleteModalOpen(true); //this is for the confirmation popup
  }

  const confirmDelete = () => {
    if(deleteIndex === null) 
        return;

    const updatedDocs = docs.filter((_, i) => i !== deleteIndex);
    setDocs(updatedDocs);

    localStorage.setItem("uploadedDocs", JSON.stringify(updatedDocs));
    setIsDeleteModalOpen(false);
    setDeleteIndex(null);

  }

  /*
  const handleDelete = (index: number, isDefault: boolean) => {
      if (isDefault) {
          alert("Deleting default documents requires additional state management...");
      } else {
          const updatedDocs = docs.filter((_, i) => i !== index);
          setDocs(updatedDocs);
          if (typeof window !== "undefined") {
              localStorage.setItem("uploadedDocs", JSON.stringify(updatedDocs));
          }
      }
  };
*/

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        minHeight: "100vh",
        fontFamily: "'Kanit', sans-serif",
      }}
    >
     <main
        style={{
          display: "flex",
          flexDirection: "row", 
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "2rem",
          padding: "2rem",
          minHeight: "60vh",
          flex: 1,
        }}
      >
      <div
       style={{
        width: "100%",        
        display:"flex",
        flexDirection: "column",
        gap: "1rem",
      }}
      >
        <UploadedDocuments docs={docs} onDelete={requestDelete} />

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
            width: "30%",

          }}
          onMouseOver={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#ACCCC1")
          }
          onMouseOut={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#C4D9D2")
          }
        >
          Upload Document
        </button>
      </div>

      <div
        style={{
          flex: "1 1 55%",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <InsuranceCards />
      </div>
    </main>

{isModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
          style={modalOverlay}
        >
          <div style={modalContent}>
            <span
              onClick={() => setIsModalOpen(false)}
              style={closeButton}
            >
              &times;
            </span>

            <h2 style={{ textAlign: "center" }}>Upload a Document</h2>

            <form onSubmit={handleSubmit}>
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={inputStyle}
              />

              <label>File Number:</label>
              <input
                type="text"
                value={fileNum}
                onChange={(e) => setFileNum(e.target.value)}
                required
                maxLength={16} //keeping this to a shorten input (might change later)
                style={inputStyle}
              />

              <label>Date of file:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                min="1900-01-01"
                max={new Date().toISOString().split("T")[0]}
                style={inputStyle}
              />

              <div style={fileDropStyle}>
                <p>Browse and add your file here!</p>
                <p>Only .PDF, .XML, .JSON, .TXT, and .CSV</p>
                <p>files are allowed for upload!</p>

                <input
                  type="file"
                  id="fileInput"
                  name="file"
                  required
                  accept=".pdf, .xml, .json, .txt, .csv"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      //setFile(e.target.files[0]);
                      const selected = e.target.files[0];

                      const allowedFileTypes = [
                        "application/pdf", 
                        "application/xml",
                        "application/json", 
                        "text/plain",
                        "text/csv"
                      ];

                      if(!allowedFileTypes.includes(selected.type)){
                        alert("Only PDF, XML, JSON, TXT, and CSV files are allowed for upload!")
                        e.target.value = "";
                        return;
                      }

                      setFile(selected);
                    }
                  }}
                />
                {/*Change so it shows that something has been uploaded*/}
                <label htmlFor="fileInput" style={fileBrowseStyle}>
                  Browse Files
                </label>
              </div>

              <button type="submit" style={uploadBtnStyle}>
                Upload
              </button>
            </form>
          </div>
        </div>
      )}

      {/* delete modal */}
      {isDeleteModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsDeleteModalOpen(false);
          }}
          style={modalOverlay}
        >
          <div style={deleteModalStyle}>
            <h3>Are you sure you want to delete this document?</h3>

            <div style={{ display: "flex", marginTop: "1.5rem", gap: "1rem" }}>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                style={cancelButtonStyle}
              >
                Cancel
              </button>

              <button onClick={confirmDelete} style={deleteButtonStyle}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* looks/styles*/

const modalOverlay: React.CSSProperties = {
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
};

const modalContent: React.CSSProperties = {
  backgroundColor: "#f8f9fa",
  borderRadius: "12px",
  padding: "2rem",
  maxWidth: "500px",
  width: "90%",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const deleteModalStyle: React.CSSProperties = {
  backgroundColor: "white",
  borderRadius: "10px",
  padding: "2rem",
  width: "90%",
  maxWidth: "400px",
  textAlign: "center",
};

const closeButton: React.CSSProperties = {
  float: "right",
  cursor: "pointer",
  fontSize: "1.5rem",
  fontWeight: "bold",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.5rem",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "1rem",
  marginTop: "0.5rem",
};

const fileDropStyle: React.CSSProperties = {
  border: "2px dashed #4CAF50",
  borderRadius: "8px",
  padding: "2rem",
  textAlign: "center",
  marginTop: "1.5rem",
  backgroundColor: "#fff",
};

const fileBrowseStyle: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "0.5rem 1.5rem",
  borderRadius: "6px",
  cursor: "pointer",
};

const uploadBtnStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "2rem",
  padding: "0.8rem",
  backgroundColor: "#30a05f",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontSize: "1rem",
  cursor: "pointer",
};

const cancelButtonStyle: React.CSSProperties = {
  flex: 1,
  padding: "0.7rem",
  border: "none",
  backgroundColor: "#ccc",
  borderRadius: "6px",
  cursor: "pointer",
};

const deleteButtonStyle: React.CSSProperties = {
  flex: 1,
  padding: "0.7rem",
  border: "none",
  backgroundColor: "#CA425F",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer",
};