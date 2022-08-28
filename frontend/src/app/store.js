import { configureStore } from '@reduxjs/toolkit';
import playlistReducer from '../features/songPlaylist';

export const store = configureStore({
  reducer: {
    playlist: playlistReducer
  },
});
