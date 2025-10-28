import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./UploadedDocuments.module.css";


type Doc = {
    title: string | null;
    fileNum: string | null;
    date: string | null;
}

const defaultDocs: Doc[] = [
    { title: "Debra_Smith_BCBS_051", fileNum: "1433232", date: "12/25/25"},
    { title: "Debra_Smith_BCBS_223", fileNum: "4872402", date: "11/22/25"},
    //{ title: "Debra_Smith_BCBS_107", fileNum: "3889223", date: "1/25/25"},
];


const UploadedDocuments = () => {
    const [docs, setDocs] = useState<Doc[]>(defaultDocs);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedTitle= localStorage.getItem('title');
            const storedFileNum = localStorage.getItem('fileNum');
            const storedDate = localStorage.getItem('date');
            if (storedTitle || storedFileNum || storedDate) {
                setDocs((prevDocs) => [
                    ...prevDocs,
                    {
                        title: storedTitle,
                        fileNum: storedFileNum,
                        date: storedDate,
                    },
                ]);
            }
        }
    }, []);
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
                {docs.map(({ title, fileNum, date }, index) => (
                    <div key={index} className={styles.docEntry}>
                        <span>{title}</span>
                        <span>{fileNum}</span>
                        <span>{date}</span>
                        </div>
                ))}
            </div>
        </div>
    );
};

export default UploadedDocuments;
