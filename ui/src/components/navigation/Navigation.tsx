"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";
import styles from "@/src/styles/navigation/navigation.module.scss";

const Navbar: FC = () => {
    const pathname = usePathname(); // Get current route
    // aims to navigate between spin and games pages
    return (
        <div className={styles.navbar}>
            <nav>
                <ul>
                    <li>
                        <Link href="/" className={pathname === "/" ? styles.active : ""}>
                            Games
                        </Link>
                    </li>
                    <li>
                        <Link href="/spin" className={pathname === "/spin" ? styles.active : ""}>
                            Spin
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;