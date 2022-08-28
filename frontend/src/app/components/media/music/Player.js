import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectSongs, selectPlaylistState, triggerPlaylist } from "../../../../features/songPlaylist";

function Player() {
  const [paused, setPaused] = useState(true);
  const [playing, setPlaying] = useState({
    id: 0, song: { icon: "", title: "", artist: "", album: "", genre: "", year: "", path: "" } });

  const playlist = useSelector(selectSongs);
  const open = useSelector(selectPlaylistState);
  const dispatch = useDispatch();

  useEffect(() => {}, [playing]);

  const trackNavigation = (control) => {
    let id = playing.id;
    let song = playlist;
    if (control === "PREV")
      id -= 1;
    else if (control === "NEXT")
      id += 1;

    setPlaying({ id: id, song: {
      icon: song[id].icon, title: song[id].title, artist: song[id].artist, album: song[id].album,
      genre: song[id].genre, year: song[id].year, path: song[id].path } });
  }

  const playPause = (control) => {
    if (control === "PLAY" && playing.song.path === "") {
      const song = playlist[0];
      setPaused(false);
      setPlaying({ id: 0, song: {
        icon: song.icon, title: song.title, artist: song.artist, album: song.album,
        genre: song.genre, year: song.year, path: song.path } });
    } else if (control === "PAUSE") {
      setPaused(true);
      // TODO: Pause the playing track
    } else if (control === "PLAY" && playing.song.path !== "") {
      setPaused(false);
      // TODO: Resume the paused track
    }
  }

  return (
    <div
      style={{ border: "2px solid", bottom: "0", position: "sticky", background: "white", zIndex: "3" }}
      className="row">
      <div className="col s2" style={{ padding: ".5rem" }}>
        <img
          src={playing.song.icon ? `data:image/jpeg;base64,${playing.song.icon}` : "/no_art.svg"}
          alt="album_art" width="80" />
      </div>
      <div className="col s4" style={{ fontStyle: ".8em", marginTop: ".2rem", textAlign: "left" }}>
        Title: {playing.song.title}<br />
        Artist: {playing.song.artist}<br />
        Album: {playing.song.album}<br />
        Genre: {playing.song.genre}<br />
        Year: {playing.song.year}<br />
      </div>
      <div style={{ marginTop: "2rem" }} className="col s1.5">
        <button
          className="btn-flat waves-effect"
          title="Play previous"
          onClick={() => trackNavigation("PREV")}
          disabled={playing.id < 1}>
          <i className="material-icons">skip_previous</i>
        </button>
      </div>
      <div style={{ marginTop: "2rem" }} className="col s1.5">
        <button
          className="btn-flat waves-effect"
          title={paused ? "PLAY" : "PAUSE"}
          onClick={() => playPause(paused ? "PLAY" : "PAUSE")}
          disabled={playlist.length < 1}>
          <i className="material-icons">{paused ? "play_arrow" : "pause"}</i>
        </button>
      </div>
      <div style={{ marginTop: "2rem" }} className="col s1.5">
        <button
          className="btn-flat waves-effect"
          title="Play next"
          onClick={() => trackNavigation("NEXT")}
          disabled={playing.id >= playlist.length - 1}>
          <i className="material-icons">skip_next</i>
        </button>
      </div>
      <div style={{ marginTop: "2rem" }} className="col s1.5">
        <button
          className="btn-flat"
          title={open ? "Hide library" : "Open library"}
          onClick={() => dispatch(triggerPlaylist())}
          disabled={playlist.length < 1}>
          <i className="material-icons">playlist_play</i>
        </button>
      </div>
    </div>
  );
}

export default Player;