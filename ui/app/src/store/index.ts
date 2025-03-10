import { configureStore } from '@reduxjs/toolkit';
import gameSlice from './gameSlice';

export const store = configureStore({
  reducer: {
    game: gameSlice,
  },
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;