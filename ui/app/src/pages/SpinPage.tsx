"use client";
import React from "react";
import Slot from "../components/slotspin/Slot";
import Navigation from "../components/navigation/Navigation";

const SpinPage: React.FC = () => {
    return (
        <div>
            <Navigation />
            <Slot />
        </div>
    )
};

export default SpinPage;