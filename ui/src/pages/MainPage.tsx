"use client";
import React, {FC} from "react";
import Navbar from "../components/navigation/Navigation";
import GameList from "../components/gameList/GameList";
import PaginationSide from "../components/pagination/Pagination";
import SearchBox from "../components/search/SearchBar";

const MainPage: FC = () => {
    return (
        <div>
            <Navbar />
            <SearchBox />
            <GameList />
            <PaginationSide />
        </div>
    )
};

export default MainPage;