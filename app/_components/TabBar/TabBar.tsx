import React from "react";
import styles from "./TabBar.module.css";
import Link from "next/link";

const tabs = [
    { label: "Home", href: "/" },
    { label: "My Insurance", href: "/insurance" },
    { label: "Map", href: "/map" },
    { label: "My Health", href: "/health" },
    { label: "My Cost", href: "/cost" },
];

const TabBar: React.FC = () => {
    return (
        <nav className={styles.tabBar}>
            {tabs.map(({ label, href }) => (
                <Link key={label} href={href} className={styles.tabButton}>
                    {label}
                </Link>
            ))}
        </nav>
    );
};

export default TabBar;
