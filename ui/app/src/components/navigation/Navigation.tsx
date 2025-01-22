import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../../styles/navigation/navigation.module.scss";

const Navigation: React.FC = () => {
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

export default Navigation;