import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = { songs: [] };
    // TODO: Create filter field and table rows limit
  }

  /**
   * Fetch the data from the songs collection in the database.
   */
  componentDidMount() {
    axios.get('/api/media/songs')
      .then(res => { this.setState({ songs: res.data }); })
      .catch((error) => { console.log(error); });
  }

  /**
   * Gather the songs from the component's state, and create rows from that.
   *
   * @returns {unknown[]}
   */
  tableContent = () => {
    return this.state.songs.map((res) => {
      return (
        <tr>
          <td>{res.title}</td>
          <td>{res.artist}</td>
          <td>{res.album}</td>
          <td>{res.year}</td>
          <td>{/* TODO: Create play and download buttons here.*/}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <div style={{ marginTop: "4rem"}}>
          <div className="col s3 offset-s9">
            <Link to="/media" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i>
              Back to media list
            </Link>
          </div>
          <table className="highlight">
            <thead><tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Year</th>
              <th>Action</th>
            </tr></thead>
            <tbody>{this.tableContent}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Songs;