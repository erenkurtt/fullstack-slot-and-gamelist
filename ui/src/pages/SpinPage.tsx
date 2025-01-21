"use client";
import React from "react";
import Navbar from "../components/navigation/Navigation";
import Slot from "../components/slotspin/Slot";

const SpinPage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Slot />
        </div>
    )
};

export default SpinPage;