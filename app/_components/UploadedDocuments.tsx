import React, { useState } from "react"; 
import styles from "./UploadedDocuments.module.css";


type Doc = {
    title: string | null;
    fileNum: string | null;
    date: string | null;
    fileUrl?: string; 

};

const defaultDocs: Doc[] = [
    { title: "Debra_Smith_BCBS_051", fileNum: "Print this out", date: "2025-12-12", fileUrl: "/Debra_Smith_BCBS_051.pdf", /*made pdfs here to click existing docs */
  },
    { title: "George_Lucas_DDS_223", fileNum: "Latest Visit From Step-Father", date: "2025-11-22", fileUrl:"/George_Lucas_BCBS_223.pdf"},
];

const UploadedDocuments = ({ docs, onDelete, }: { docs: Doc[]; onDelete: (index: number, isDefault: boolean) => void; }) => {
    const [previewDoc, setPreviewDoc] = useState<Doc | null>(null);
    const closePreview = () => setPreviewDoc(null);

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>
                Uploaded Documents
            </h3>
            <div className={styles.tableHeader}>
                <span>  Document Name  </span>
                <span>  Date  </span>
                <span>  Notes: </span>
                <span> </span> { /* for delete button */ }
            </div>
            <div className={styles.tableBody}>
                {defaultDocs.map(({ title, fileNum, date, fileUrl }, index) => (
                    <div key={`default-${index}`} className={styles.docEntry}>
                      <span
                          style={{
                            color: fileUrl ? "#0E3C35" : "inherit",
                            textDecoration: fileUrl ? "underline" : "none",
                          }}
                          onClick={() => {
                            if (fileUrl) window.open(fileUrl); /* added to click doc to open in new page */
                          }}
                        >
                          {title}
                        </span>                        
                        <span>{date}</span>
                        <span>{fileNum}</span>
                        </div>
                ))}
                
            
                {docs.map(({ title, fileNum, date, fileUrl}, index) => (
                    <div key={`doc-${index}`} className={styles.docEntry}>
                           <span
                            style={{
                                color: fileUrl ? "#0E3C35" : "inherit",
                                textDecoration: fileUrl ? "underline" : "none",
                                cursor: fileUrl ? "pointer" : "default",
                            }}
                            onClick={() => {
                              if(fileUrl){
                                window.open(fileUrl, "_blank", "noopener,noreferrer"); /* added to click doc to open in new page */
                              }
                            }}
                            >
                            {title}
                            </span>
                        <span>{date}</span>
                        <span>{fileNum}</span>
                        <button
                            onClick={() => onDelete(index, false)}
                            className={styles.deleteButton}
                            aria-label="Delete Document"
                            >
                            Delete
                        </button>
                    </div>
                ))}

          </div>      
    </div>
  );
};
      

export default UploadedDocuments;
