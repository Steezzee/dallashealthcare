import React from "react";
import styles from "./UploadedDocuments.module.css";


type Doc = {
    title: string | null;
    fileNum: string | null;
    date: string | null;
};

const defaultDocs: Doc[] = [
    { title: "Debra_Smith_BCBS_051", fileNum: "1433232", date: "12/25/25"},
    { title: "Debra_Smith_BCBS_223", fileNum: "4872402", date: "11/22/25"},
];

const UploadedDocuments = ({ docs, onDelete, }: { docs: Doc[]; onDelete: (index: number, isDefault: boolean) => void; }) => {

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>
                Uploaded Documents
            </h3>
            <div className={styles.tableHeader}>
                <span>  Document Name  </span>
                <span>  Claim Number  </span>
                <span>  Date </span>
                <span> </span> { /* for delete button */ }
            </div>
            <div className={styles.tableBody}>
                {defaultDocs.map(({ title, fileNum, date }, index) => (
                    <div key={`default-${index}`} className={styles.docEntry}>
                        <span>{title}</span>
                        <span>{fileNum}</span>
                        <span>{date}</span>
                        </div>
                ))}
                {/* Render uploaded docs after default docs*/}
                {docs.map(({ title, fileNum, date }, index) => (
                    <div key={`doc-${index}`} className={styles.docEntry}>
                        <span>{title}</span>
                        <span>{fileNum}</span>
                        <span>{date}</span>
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
