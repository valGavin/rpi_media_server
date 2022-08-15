import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = { songs: [], query: "" };
    // TODO: Create a table rows limit
  }

  /**
   * Fetch the data from the songs collection in the database.
   */
  componentDidMount() {
    axios.get('/api/media/songs')
      .then(res => { this.setState({ songs: res.data }); })
      .catch((error) => { console.log(error); });
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
        <tr>
          <td>{res.title}</td>
          <td>{res.artist}</td>
          <td>{res.album}</td>
          <td>{res.year}</td>
          <td style={{ textAlign: "center" }}>
            <a className="waves-effect waves-teal btn-flat" onClick={() => {/* TODO: Write a function to call the player*/}}><i className="material-icons">play_arrow</i></a>
            <a className="waves-effect waves-teal btn-flat" href={res.path}><i className="material-icons">file_download</i></a>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="input-field col s5 offset-s4 push-s3">
            <input id="search" type="text" onChange={e => { this.setState({ query: e.target.value }); }} />
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
      </div>
    );
  }
}

export default Songs;