"use client";

import { Pagination } from "antd";
import { usePathname, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import React, {useEffect} from "react";
import styles from '@/src/styles/pagination/pagination.module.scss';
import { RootState, AppDispatch } from '../../store/index';
import  {setPage} from '../../store/gameSlice';


const PaginationSide: React.FC = () => {
    const urlParams = useSearchParams();  
    const pathname = usePathname();

    // using redux for state management
    const pageNumb = useSelector((state :RootState) => state.game.page);
    const totalPage = useSelector((state :RootState) => state.game.totalPage);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const page = urlParams?.get("page") ? parseInt(urlParams.get("page") as string, 10) : 1;
        // assings page number with dispatch then GameList component uses the satate to fetch game list by page number
        dispatch(setPage(page));
        // if the totalPage is bigger than page number automatically changes to the last page
        if(totalPage <= page) {
            onChangePage(totalPage);
        }
    }, [totalPage]);

    // Handle pagination change
    const onChangePage = (page: number) => {
        dispatch(setPage(page));
        const newSearchParams = new URLSearchParams(urlParams?.toString());
        newSearchParams.set("page", page.toString());
        
        // update the url with page parameter to make recognizable
        window.history.pushState(null, "", `${pathname}?${newSearchParams.toString()}`);
    };
    
    return (
        <div className={styles.paginationSide}>
            <Pagination defaultCurrent={1} current={pageNumb} total={totalPage * 10} onChange={onChangePage} className={styles.pagination}/>
        </div>
    )
};

export default PaginationSide;