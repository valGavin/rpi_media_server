import React, { Component } from "react";
import { Link } from "react-router-dom";

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", episode: "", season: "", series: "", year: "",
      genre: "", path: "", icon: { series: "", season: "" } };
  }

  /**
   * A listener for value change in the form.
   * @param e: Element to catch: the ID and value
   */
  onChange = e => { this.setState({ [e.target.id]: e.target.value }); };

  /**
   * A handler for form submit event.
   *
   * @param e: The fetched element
   */
  onSubmit = e => {
    e.preventDefault();  // Prevent re-loading the page upon submission

    const newEpisode = {
      title: this.state.title,
      episode: this.state.episode,
      season: this.state.season,
      series: this.state.series,
      year: this.state.year,
      genre: this.state.genre,
      path: this.state.path,
      icon: { series: this.state.icon.series, season: this.state.icon.season } };

    console.log(newEpisode);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/admin" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i>
              Back to admin page
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Add an episode</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Add a <Link to="/movies/upload">movie</Link> or a <Link to="/series/upload">song</Link> instead?
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.title}
                  error={errors.title}
                  id="title"
                  type="text" />
                <label htmlFor="title">Title</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.episode}
                  error={errors.episode}
                  id="episode"
                  type="number"
                  min="1" />
                <label htmlFor="episode">Episode</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.season}
                  error={errors.season}
                  id="season"
                  type="number"
                  min="1" />
                <label htmlFor="season">Season</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.series}
                  error={errors.series}
                  id="series"
                  type="text" />  {/* TODO: Create a drop-down list of the series available in the database.*/}
                <label htmlFor="series">Series</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.year}
                  error={errors.year}
                  id="year"
                  type="number"
                  min="1888"
                  max={(new Date().getFullYear())} />
                <label htmlFor="year">Year</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.genre}
                  error={errors.genre}
                  id="genre"
                  type="text" />  {/* TODO: Create a drop-down list of the genres available in the database.*/}
                <label htmlFor="genre">Genre</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.path}
                  error={errors.path}
                  id="path"
                  type="file" />  {/* TODO: Specify the acceptable audio file extensions.*/}
                <label htmlFor="path">Video file</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.icon.series}
                  error={errors.icon.series}
                  id="icon_series"
                  type="file" />
                <label htmlFor="icon_series">Series Poster</label>  {/* TODO: Specify the acceptable image file extensions.*/}
              </div>
              <div className="input-field col s12">
                <input
                    onChange={this.onChange}
                    value={this.state.icon.season}
                    error={errors.icon.season}
                    id="icon_season"
                    type="file" />
                <label htmlFor="icon_season">Season Poster</label>  {/* TODO: Specify the acceptable image file extensions.*/}
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem" }}
                  type="submit">
                  UPLOAD
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Series;