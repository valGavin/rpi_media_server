import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = { movies: [], sequel: null }
  }

  /**
   * Fetch the data from the movies collection in the database.
   */
  componentDidMount() {
    axios.get("/api/media/movies")
      .then(res => { this.setState({ movies: res.data }); })
      .catch((error) => { console.log(error); });
  }

  /**
   * Set the currently selected film sequel.
   *
   * @param sequel A sequel name from the selected object
   */
  onClickSequel(sequel) { this.setState({ sequel: sequel }); }

  /**
   * Create a back arrow and its function based on the component's state.
   *
   * @returns {JSX.Element}
   */
  backArrow = () => {
    if (this.state.sequel == null) {
      return (
        <Link to="/media" className="btn-flat waves-effect">
          <i className="material-icons left">keyboard_backspace</i>
          Back to media list
        </Link>
      );
    } else {
      return (
        <label className="btn-flat waves-effect" htmlFor="back"
               onChange={(e) => this.onClickSequel(null, e)}>
          <input type="button" id="back" hidden/>
          <i className="material-icons left">keyboard_backspace</i>
          Back to movies list
        </label>
      );
    }
  }

  /**
   * Gather the movies from the component's state and create a grid out of it.
   *
   * @returns {unknown[]}
   */
  gridContent = () => {
    let sequels = [];
    return this.state.movies.map((res) => {
      if (res.sequel == null || res.sequel === '') {
        return (
          <div className="col s3">
            <img src={res.icon} alt={res.title} />
            {/* TODO: Add buttons to download or play.*/}
          </div>);
      } else if (res.sequel != null || res.sequel !== '' && !sequels.includes(res.sequel)) {
        sequels.push(res.sequel);
        return (
          <div className="col s3">
            <label onChange={(e) => this.onClickSequel(res.sequel, e)} htmlFor="sequel">
              <input type="button" id="sequel" hidden />
              <img src={/* TODO: Replace with sequel icon.*/} alt={res.sequel} />
            </label>
          </div>
        );
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row" style={{ marginTop: "4rem" }}>
          <div className="col s3 offset-s9">
            {this.backArrow}
          </div>
          {this.gridContent}
        </div>
      </div>
    );
  }
}

export default Movies;