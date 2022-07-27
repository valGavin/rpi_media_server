import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = { episodes: [], season: null, series: null };
  }

  /**
   * Fetch the data from the series collection in the database.
   */
  componentDidMount() {
    axios.get("/api/media/series")
      .then(res => { this.setState({ episodes: res.data }); })
      .catch((error) => { console.log(error); });
  }

  /**
   * Set the currently selected series and season.
   *
   * @param series A series name from the selected object
   * @param season A season number from the selected object
   */
  onClickDirectory(series, season) { this.setState({ series: series, season: season }); }

  /**
   * Create a back arrow and its function based on the component's state.
   *
   * @returns {JSX.Element}
   */
  backArrow = () => {
    if (this.state.season != null) {
      return (
        <label className="btn-flat waves-effect" htmlFor="back"
               onChange={(e) => this.onClickDirectory(this.state.series, null, e)}>
          <input type="button" id="back" hidden/>
          <i className="material-icons left">keyboard_backspace</i>
          Back to seasons list
        </label>
      );
    } else if (this.state.series != null && this.state.season == null) {
      return (
        <label className="btn-flat waves-effect" htmlFor="back"
               onChange={(e) => this.onClickDirectory(null, null, e)}>
          <input type="button" id="back" hidden/>
          <i className="material-icons left">keyboard_backspace</i>
          Back to series list
        </label>
      );
    } else {
      return (
        <Link to="/media" className="btn-flat waves-effect">
          <i className="material-icons left">keyboard_backspace</i>
          Back to media list
        </Link>
      );
    }
  }

  gridContent = () => {
    let series, seasons = [];
    return this.state.episodes.map((res) => {
      if (this.state.series == null && !series.includes(res.series)) {
        series.push(res.series);
        return (
          <div className="col s3">
            {/* TODO: Finish this grid creation.*/}
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
        </div>
      </div>
    );
  }
}