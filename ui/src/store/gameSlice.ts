import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameList {
  searchText: string;
  page: number;
  totalPage: number;
}

const initialState: GameList = { searchText: "", page: 1, totalPage: 3};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // this is the action that assigns to search text state
    setSearchText: (state: GameList, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    // the action that assigns to page number state
    setPage: (state: GameList, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    // the action that assign total page number to render how many boxes for pagination component
    setTotalPage: (state: GameList, action: PayloadAction<number>) => {
      state.totalPage = action.payload;
    },
  },
});

export const { setSearchText, setPage, setTotalPage } = gameSlice.actions;
export default gameSlice.reducer;