import Reacht from "react";
import Link from "next/link";
import styles from "./UploadedDocuments.module.css";

const docs = [
    { name: "Debra Smith", caseNum: "1433232", date: "12/25/25"},
    { name: "Pablo Sangrito", caseNum: "487240", date: "11/22/25"},
    { name: "Chico Mojito", caseNum: "388922", date: "1/25/25"},
];

const UploadedDocuments = () => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>
                Uploaded Documents
            </h3>
            <div className={styles.tableHeader}>
                <span>  Document Name  </span>
                <span>  Claim Number  </span>
                <span>  Date </span>
            </div>
            <div className={styles.tableBody}>
                {docs.map(({ name, caseNum, date }, index) => (
                    <div key={index} className={styles.docEntry}>
                        <span>{name}</span>
                        <span>{caseNum}</span>
                        <span>{date}</span>
                        </div>
                ))}
            </div>
        </div>
    );
};

export default UploadedDocuments;
