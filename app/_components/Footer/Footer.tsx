import React from "react";
import styles from "./Footer.module.css";
import Trademark from "./Trademark";

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
                <Trademark />
        </footer>
    );
};

export default Footer;

