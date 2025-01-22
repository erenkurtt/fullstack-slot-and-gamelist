import axios from "axios";
const apiUrl: string = process.env.NEXT_PUBLIC_API_URL as string;
const exchangeApi: string = process.env.NEXT_PUBLIC_EXCHANGE_API_URL as string;


export const getGameList = async (pageNumb: number = 1, searchText: string = "") => {
    const response = await axios.get(apiUrl + `/games?page=${pageNumb}&searchText=${searchText}`);
    return response.data;
}

export const spinSlot = async () => {
    const response = await axios.post(`${apiUrl}/spinSlot`)
    return response.data;
}

export const resetBalance = async () => {
    const response = await axios.post(`${apiUrl}/resetBalance`)
    return response.data;
}

export const getBalance = async () => {
    const response = await axios.get(`${apiUrl}/currentBalance`)
    return response.data;
}

export const getExchange = async () => {
    const response = await axios.get(`${exchangeApi}/latest/EUR`)
    return response;
}