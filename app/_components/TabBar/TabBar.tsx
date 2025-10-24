'use client';

import React from "react";
import styles from "./TabBar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
    { label: "Home", href: "/" },
    { label: "My Insurance", href: "/insurance" },
    { label: "My Health", href: "/health" },
    { label: "My Cost", href: "/cost" },
];

const TabBar: React.FC = () => {

    const pathname = usePathname();

    return (
        <nav className={styles.tabBar}>
           {tabs.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
                <Link key={label} href={href} className={`${styles.tabButton} ${isActive ? styles.activeTab : ""}`}>
                    {label}
                </Link>
            );
           })}
        </nav>
    );
};

export default TabBar;
