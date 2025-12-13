'use client';

import React from "react";
import styles from "./TabBar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
    { label: "MyHomepage", href: "/home", color: "#0E3C35", fontFamily: "Kanit, sans-serif", title: "View appointments, prescriptions, and doctor's notes.",},
    { label: "MyInsurance", href: "/insurance", color: "#0E3C35", fontFamily: "Kanit, sans-serif", title: "View and upload insurance documents and active insurances.",},
    { label: "MyHealth", href: "/health", color: "#0E3C35", fontFamily: "Kanit, sans-serif", title: "Find a health provider and book an appointment.",},
    { label: "MyCost", href: "/cost", color: "#0E3C35", fontFamily: "Kanit, sans-serif", title: "Calculate potential estimate costs of procedures.",},
];

const TabBar: React.FC = () => {

    const pathname = usePathname();

    return (
        <nav className={styles.tabBar}>
           {tabs.map(({ label, href, title }) => {
            const isActive = pathname === href;
                return (
                    <Link
                    key={label}
                    href={href}
                    title={title}
                    className={`${styles.tabButton} ${isActive ? styles.activeTab : ""}`}
                    >
                    {label}
                    </Link>
                );
            })}

        </nav>
    );
};

export default TabBar;
