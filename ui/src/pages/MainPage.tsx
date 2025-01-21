"use client";
import React from "react";
import GameList from "../components/gameList/GameList";
import PaginationSide from "../components/pagination/PaginationSide";
import SearchBox from "../components/search/SearchBox";
import Navigation from "../components/navigation/Navigation";

const MainPage: React.FC = () => {
    return (
        <div>
            <Navigation />
            <SearchBox />
            <GameList />
            <PaginationSide />
        </div>
    )
};

export default MainPage;