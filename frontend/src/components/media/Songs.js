import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      library_open: false,
      playlist: [],
      playing_id: 0,
      is_playing: false,
      playing: { title: "", artist: "", album: "", genre: "", year: null, icon: null },
      query: "" };
    // TODO: Create a table rows limit
  }

  /**
   * Fetch the data from the songs collection in the database.
   */
  componentDidMount() {
    axios.get('/api/media/songs')
      .then(res => { this.setState({ songs: res.data }); })
      .catch((error) => { console.error(error); });
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
   * Gather the songs from the component's state, compare them to the search query, and create rows from that.
   *
   * @returns {unknown[]}
   */
  tableContent = () => {
    return this.state.songs.filter(res => {
      if (this.state.query === "") {
        return res;
      } else if (
        res.path.toLowerCase().includes(this.state.query.toLowerCase()) ||
        res.album.toLowerCase().includes(this.state.query.toLowerCase())) {
        return res;
      }
    }).map((res) => {
      return (
        <tr key={res._id}>
          <td>{res.title}</td>
          <td>{res.artist}</td>
          <td>{res.album}</td>
          <td>{res.year}</td>
          <td style={{ textAlign: "center" }}>
            <a className="waves-effect waves-teal btn-flat" onClick={() => {
              this.setState({ playlist: [...this.state.playlist, res] })}}>
              <i className="material-icons">add</i>
            </a>
            <a className="waves-effect waves-teal btn-flat" href={res.path}>
              <i className="material-icons">file_download</i>
            </a>
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
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="input-field col s5 offset-s4 push-s3">
            <input id="search" type="search" onChange={e => { this.setState({ query: e.target.value }); }} />
            <label htmlFor="search">Search</label>
          </div>
          <div style={{ marginTop: "1.4rem" }} className="col s3 pull-s9">
            {this.backArrow()}
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
          <tbody>{this.tableContent()}</tbody>
        </table>
        <div
          style={{ border: "2px solid", bottom: "0", position: "sticky", background: "white", zIndex: "2" }}
          className="row">
          <div className="col s2" style={{ padding: ".5rem"}}>
            <img
              src={this.state.playing.icon ? `data:image/jpeg;base64,${this.state.playing.icon.slice(2, -1)}` : "/no_art.svg"}
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
            <button className="btn-flat"
                    title={this.state.library_open ? "Hide library" : "Open library"}
                    onClick={() => {/* TODO: Create a "bottom bar" and the function to hide/show it*/}}
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