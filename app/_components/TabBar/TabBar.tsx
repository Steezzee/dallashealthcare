'use client';

import React from "react";
import styles from "./TabBar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
    { label: "MyHomepage", href: "/home", color: "#0E3C35", fontFamily: "Kanit, sans-serif" },
    { label: "MyInsurance", href: "/insurance", color: "#0E3C35", fontFamily: "Kanit, sans-serif" },
    { label: "MyHealth", href: "/health", color: "#0E3C35", fontFamily: "Kanit, sans-serif" },
    { label: "MyCost", href: "/cost", color: "#0E3C35", fontFamily: "Kanit, sans-serif" },
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
