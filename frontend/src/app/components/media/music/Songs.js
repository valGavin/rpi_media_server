import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { add, selectSongs } from "../../../../features/songPlaylist";
import Player from "./Player";
import Playlist from "./Playlist";

function Songs() {
  const [param, setParam] = useState({ page: 0, query: "" });
  const [songs, setSongs] = useState([]);

  const playlist = useSelector(selectSongs);
  const dispatch = useDispatch();

  useEffect(() => {
    const url = param.query ? `/api/media/songs/${param.page}/${param.query}` : `/api/media/songs/${param.page}`;
    axios.get(url)
      .then(res => {
        setSongs(res.data); })
      .catch(error => { console.error(error); });
  }, [param]);

  const songsContent = () => {
    return songs.map(res => {
      return (
        <tr key={res._id}>
          <td>{res.artist}</td>
          <td>{res.title}</td>
          <td>{res.album}</td>
          <td>{res.year}</td>
          <td style={{ textAlign: "center" }}>
            <button
              className="btn-flat waves-effect"
              title="Add to playlist"
              onClick={() => dispatch(add(res))}
              disabled={playlist.includes(res)}>
              <i className="material-icons">add</i>
            </button>
            <a className="btn-flat waves-effect" href={res.path}>
              <i className="material-icons">file_download</i>
            </a>
          </td>
        </tr>
      );
    });
  }

  return (
    <div>
      <div className="container">
        <div style={{ top: "4rem", position: "sticky", zIndex: "2", background: "white" }} className="row">
          <div className="input-field col s5 offset-s3 push-4">
            <input id="search" type="search" onChange={e => { setParam({ page: 0, query: e.target.value }); }} />
            <label htmlFor="search">Search</label>
          </div>
          <div className="col s4 pull-s9" style={{ marginTop: "1.4rem" }}>
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i>
              Back to media list
            </Link>
          </div>
        </div>
        <div style={{ top: "9rem", position: "sticky", zIndex: "2", background: "white" }} className="row">
          <div className="col s4 offset-s4 push-s4">
            <button
              className="btn-flat waves-effect"
              title="Next 50"
              onClick={() => { setParam({ page: param.page + 1, query: param.query }); }}
              disabled={songs.length < 50}>
              <i className="material-icons right">navigate_next</i>
              Next list
            </button>
          </div>
          <div className="col s4 pull-s8">
            <button
              className="btn-flat waves-effect"
              title="Previous 50"
              onClick={() => { setParam({ page: param.page - 1, query: param.query }); }}
              disabled={param.page < 1}>
              <i className="material-icons left">navigate_before</i>
              Previous list
            </button>
          </div>
        </div>
        <table className="highlight">
          <thead><tr>
            <th>Artist</th>
            <th>Title</th>
            <th>Album</th>
            <th>Year</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr></thead>
          <tbody>{songsContent()}</tbody>
        </table>
      </div>
      <Playlist />
      <Player />
    </div>
  );
}

export default Songs;