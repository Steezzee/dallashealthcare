import React from "react";
import styles from "./Header.module.css";
import ProfileSection from "./ProfileSection";
import BannerTitle from "./BannerTitle";
import IconRow from "./IconRow";

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <ProfileSection />
            <BannerTitle />
            <IconRow />
        </header>
    );
};

export default Header;
