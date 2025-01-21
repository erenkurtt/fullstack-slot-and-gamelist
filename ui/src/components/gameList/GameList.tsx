"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, {FC, useEffect, useState} from "react";
import { GameListItem } from "./interface";
import axios from "axios";
import { getGameList } from "@/src/api/apiCalls";
import { Card, Row, Col } from 'antd';
import styles from '@/src/styles/gamelist/gameList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/index';
import { setTotalPage } from "@/src/store/gameSlice";
import Loading from "../utils/Loading";

const { Meta } = Card;

const GameList: FC = () => {
    const [gameItems, setGameItems] = useState<GameListItem[]>();
    const dispatch = useDispatch<AppDispatch>();
    const pageNumb = useSelector((state :RootState) => state.game.page);
    const searchText = useSelector((state :RootState) => state.game.searchText);

    useEffect(() => {
        // fetch the game list with pageNUmb and search text states
        const gameList = async () => {
            const response = await getGameList(pageNumb, searchText);
            setGameItems(response.data);
            dispatch(setTotalPage(response.totalPage));
        }
        gameList();
    }, [pageNumb, searchText]);

    return (
        <div className={styles.gameListContainer}>
            <Row gutter={[36, 36]} justify="center">
                {   
                gameItems ?
                    gameItems.map((item) => 
                        <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={4} key={item.id}>
                            <Card
                                hoverable
                                cover={<img alt="example" style={{width: '100%'}} src={item.thumb && item.thumb.url ? item.thumb.url : '/no-image.jpg'} />}
                                className={styles.gameItem}
                            >
                                <Meta title={item.title} description={item.providerName} />
                            </Card>
                        </Col>
                    )
                    :
                    <Loading />
                }
            </Row>

        </div>
    )
};

export default GameList;