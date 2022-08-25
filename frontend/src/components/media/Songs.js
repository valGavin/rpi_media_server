import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_id: 0,
      songs: [],
      library_open: false,
      playlist: [],
      playing_id: 0,
      is_playing: false,
      query: null,
      playing: { title: "", artist: "", album: "", genre: "", year: null, icon: null } };
  }

  /**
   * Fetch the data from the songs collection in the database.
   */
  componentDidMount() { this.databaseToTable(0, null); }

  databaseToTable = (id, query) => {
    const url = query ? `/api/media/songs/${id}/${query}` : `/api/media/songs/${id}`
    axios.get(url)
      .then(res => { this.setState({ list_id: id, songs: res.data, query: query }); })
      .catch(error => { console.error(error); });
  }

  backArrow = () => {
    return (
      <Link to="/" className="btn-flat waves-effect">
        <i className="material-icons left">keyboard_backspace</i>
        Back to media list
      </Link>
    );
  }

  /**
   * Gather the songs from the component's state.
   *
   * @returns {unknown[]}
   */
  songsContent = () => {
    return this.state.songs.map(res => {
      return (
        <tr key={res._id}>
          <td>{res.title}</td>
          <td>{res.artist}</td>
          <td>{res.album}</td>
          <td>{res.year}</td>
          <td style={{ textAlign: "center" }}>
            <button
              className="waves-effect waves-teal btn-flat"
              onClick={() => {this.setState({ playlist: [...this.state.playlist, res] })}}
              title="Add to playlist" disabled={this.state.playlist.includes(res)}>
              <i className="material-icons">add</i>
            </button>
            <a className="waves-effect waves-teal btn-flat" href={res.path}>
              <i className="material-icons">file_download</i>
            </a>
          </td>
        </tr>
      );
    });
  }

  /**
   * Gather the songs from the playlist state, and create rows from that
   * @returns {unknown[]}
   */
  playlistContent = () => {
    return this.state.playlist.map((res) => {
      return (
        <tr key={`playlist_${res._id}`}>
          <td style={{ textAlign: "left" }}>{res.artist} - {res.title}</td>
          <td style={{ textAlign: "right" }}>
            <button
              className="btn-flat"
              title="Remove from playlist"
              onClick={() => {
                let filteredPlaylist = this.state.playlist.filter(function (val) {
                  return val._id !== res._id;
                });
                this.setState({ playlist: filteredPlaylist}) }}>
              <i className="material-icons">clear</i>
            </button>
          </td>
        </tr>
      );
    });
  }

  /**
   * Play the song on the playlist according to the given command.
   *
   * @param command A command either to play the current, previous, or next song in the playlist
   */
  play = (command) => {
    let id;  // The playlist content pointer
    let isPlaying = this.state.is_playing;
    if (command === "PLAY") {
      id = this.state.playing_id;
      isPlaying = !isPlaying;
    }
    else if (command === "PREV")
      id = this.state.playing_id - 1;
    else if (command === "NEXT")
      id = this.state.playing_id + 1;

    // Get the song to play, and update the state
    const song = this.state.playlist[id];
    this.setState({ playing_id: id, is_playing: isPlaying, playing: {
      title: song.title, artist: song.artist, album: song.album, genre: song.genre, year: song.year, icon: song.icon }
    });
  }

  render() {
    return (
      <div className="container">
        <div style={{ top: "4rem", position: "sticky", zIndex: 2, background: "white" }} className="row">
          <div className="input-field col s5 offset-s3 push-s4">
            <input
              id="search"
              type="search"
              onChange={e => { this.databaseToTable(0, e.target.value); }} />
            <label htmlFor="search">Search</label>
          </div>
          <div style={{ marginTop: "1.4rem" }} className="col s4 pull-s9">
            {this.backArrow()}
          </div>
        </div>
        <div style={{ top: "9rem", position: "sticky", zIndex: 2, background: "white" }} className="row">
          <div className="col s4 offset-s4 push-s4">
            <button
              className="btn-flat waves-effect"
              title="Next 50"
              onClick={() => { this.databaseToTable(this.state.list_id + 1, this.state.query); }}
              disabled={this.state.songs.length < 50}>
              <i className="material-icons right">navigate_next</i>
              Next list
            </button>
          </div>
          <div className="col s4 pull-s8">
            <button
              className="btn-flat waves-effect"
              title="Previous 50"
              onClick={() => { this.databaseToTable(this.state.list_id - 1, this.state.query) }}
              disabled={this.state.list_id < 1}>
              <i className="material-icons left">navigate_before</i>
              Previous list
            </button>
          </div>
        </div>
        <table className="highlight">
          <thead><tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Year</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr></thead>
          <tbody>{this.songsContent()}</tbody>
        </table>
        <div
          className="row"
          style={!this.state.library_open || this.state.playlist.length < 1 ? {
            height: "0%", width: "80%", position: "relative", zIndex: "2",
            bottom: "30px", overflowY: "hidden", visibility: "hidden" } : {
            height: "50%", width: "80%", position: "sticky", zIndex: "2",
            bottom: "100px", overflowY: "hidden", transition: "0.5s" }}>
          <div className="col s6 offset-s6" style={{ background: "white", border: "2px solid"}}>
            <table className="highlight">
              <tbody>{this.playlistContent()}</tbody>
            </table>
          </div>
        </div>
        <div
          style={{ border: "2px solid", bottom: "0", position: "sticky", background: "white", zIndex: "3" }}
          className="row">
          <div className="col s2" style={{ padding: ".5rem"}}>
            <img
              src={this.state.playing.icon ? `data:image/jpeg;base64,${this.state.playing.icon}` : "/no_art.svg"}
              alt="album_art" width="80" />
          </div>
          <div className="col s4" style={{ fontSize: ".8em", marginTop: ".2rem" }}>
            Title: {this.state.playing.title}<br />
            Artist: {this.state.playing.artist}<br />
            Album: {this.state.playing.album}<br />
            Genre: {this.state.playing.genre}<br />
            Year: {this.state.playing.year}
          </div>
          <div style={{ marginTop: "2rem" }} className="col s1.5">
            <button className="waves-effect waves-teal btn-flat"
                    title="Previous"
                    onClick={() => {this.play("PREV")}}
                    disabled={this.state.playing_id < 1}>
              <i className="material-icons">skip_previous</i>
            </button>
          </div>
          <div style={{ marginTop: "2rem" }} className="col s1.5">
            <button className="waves-effect waves-teal btn-flat"
                    title={this.state.is_playing ? "Pause" : "Play"}
                    onClick={() => {this.play("PLAY")}}
                    disabled={this.state.playlist.length < 1}>
              <i className="material-icons">{this.state.is_playing ? "pause" : "play_arrow"}</i>
            </button>
          </div>
          <div style={{ marginTop: "2rem" }} className="col s1.5">
            <button className="waves-effect waves-teal btn-flat"
                    title="Next"
                    onClick={() => {this.play("NEXT")}}
                    disabled={this.state.playing_id >= this.state.playlist.length - 1}>
              <i className="material-icons">skip_next</i>
            </button>
          </div>
          <div style={{ marginTop: "2rem" }} className="col s1.5">
            <button
              className="btn-flat"
              title={this.state.library_open ? "Hide library" : "Open library"}
              onClick={() => {this.setState({ library_open: !this.state.library_open })}}
              disabled={this.state.playlist.length < 1}>
              <i className="material-icons">playlist_play</i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Songs;