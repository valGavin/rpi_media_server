import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {del, selectPlaylistState, selectSongs} from "../../../../features/songPlaylist";

function Playlist() {
  const open = useSelector(selectPlaylistState);
  const playlist = useSelector(selectSongs);
  const dispatch = useDispatch();

  /**
   * Gather the songs from the playlist global state, and create table rows from that.
   *
   * @returns {*}
   */
  const playlistContent = () => {
    return playlist.map((res) => {
      return (
        <tr key={`playlist_${res._id}`}>
          <td style={{ textAlign: "left" }}>{res.artist} - {res.title}</td>
          <td style={{ textAlign: "right" }}>
            <button
              className="btn-flat"
              title="Remove from playlist"
              onClick={() => { dispatch(del(res)); }}>
              <i className="material-icons">clear</i>
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="row" style={!open || playlist.length < 1 ? {
      height: "0%", width: "80%", position: "relative", zIndex: "2",
      bottom: "30px", overflowY: "hidden", visibility: "hidden"} : {
      height: "50%", width: "80%", position: "sticky", zIndex: "2",
      bottom: "100px", overflowY: "hidden", transition: ".5s" }}>
      <div className="col s6 offset-s6" style={{ background: "white", border: "2px solid" }}>
        <table className="highlight">
          <tbody>{playlistContent()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Playlist;