import { createSlice } from "@reduxjs/toolkit";

const initialState = { songs: [], show: false };

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    add: (state, action) => {
      state.songs.push(action.payload);
    },
    del: (state, action) => {
      state.songs = state.songs.filter(function (song) { return song._id !== action.payload._id; });
    },
    triggerPlaylist: (state) => {
      state.show = !state.show;
    }
  }
});

export const { add, del, triggerPlaylist } = playlistSlice.actions;

/**
 * These are selectors to select values from the state.
 * Selector can also be defined inline where they're used instead of defining it in the slice file.
 * For instance: `useSelector((state: RootState) => state.playlist)`
 *
 * @param state The global state
 * @returns {[]|*}
 */
export const selectSongs = (state) => state.playlist.songs;

export const selectPlaylistState = (state) => state.playlist.show;

export default playlistSlice.reducer;