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
        <Link to="/" className="btn-flat waves-effect">
          <i className="material-icons left">keyboard_backspace</i>
          Back to media list
        </Link>
      );
    }
  }

  gridContent = () => {
    let series, seasons = [];
    return this.state.episodes.map((res) => {
      if (res.series === this.state.series) {  // User selected a series.
        if (res.season === this.state.season) {  // User selected a season.
          return (  // Show the list of episodes from the associated season and series
            <div className="col s3">
              <img src={""/* TODO: Replace with episode icon.*/} alt={res.title} />
              {/* TODO: Add buttons to download or play.*/}
            </div>
          );
        } else if (this.state.season == null && !seasons.includes(res.season)) { // User does not select any season yet.
          seasons.push(res.season);
          return (  // Show the list of seasons from the associated series
            <div className="col s3">
              <label onChange={(e) => this.onClickDirectory(this.state.series, res.season, e)} htmlFor="season">
                <input type="button" id="season" hidden />
                <img src={res.icon.season} alt={res.season} />
              </label>
            </div>
          );
        }
      } else if (this.state.series == null && !series.includes(res.series)) { // User does not select any series yet
        series.push(res.series);
        return (  // Show the list of series
          <div className="col s3">
            <label onChange={(e) => this.onClickDirectory(res.series, "", e)} htmlFor="series">
              <input type="button" id="series" hidden />
              <img src={res.icon.series} alt={res.series} />
            </label>
          </div>
        );
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }}>
          <div className="col s3 offset-s9">
            {this.backArrow()}
          </div>
          {this.gridContent()}
        </div>
      </div>
    );
  }
}

export default Series;