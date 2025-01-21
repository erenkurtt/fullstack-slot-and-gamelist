"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, {FC} from "react";
import Navbar from "../components/navigation/Navigation";
import Slot from "../components/slotspin/Slot";

const SpinPage: FC = () => {
    return (
        <div>
            <Navbar />
            <Slot />
        </div>
    )
};

export default SpinPage;