import React from "react";
import styles from "./Header.module.css";
import ProfileSection from "./ProfileSection";
import BannerTitle from "./BannerTitle";
import Logout from "./Logout";

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <ProfileSection />
            <div className={styles.bannerCenterWrapper}>
                <BannerTitle /></div>
            <Logout />
        </header>
    );
};

export default Header;
