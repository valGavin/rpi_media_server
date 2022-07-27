import React, { Component } from "react";
import { Link } from "react-router-dom";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", year: "", genre: "", sequel: "", path: "", icon: "" };
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

    const newMovie = {
      title: this.state.title,
      year: this.state.year,
      genre: this.state.genre,
      sequel: this.state.sequel,
      path: this.state.path,
      icon: this.state.icon };

    console.log(newMovie);
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
                <b>Add a movie</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Add a <Link to="/movies/upload">song</Link> or an <Link to="/series/upload">episode</Link> instead?
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
                  value={this.state.sequel}
                  error={errors.sequel}
                  id="sequel"
                  type="text" />  {/* TODO: Create a drow-down list of the sequels available in the database.*/}
                <label htmlFor="sequel">Sequel</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.path}
                  error={errors.path}
                  id="path"
                  type="file" />  {/* TODO: Specify the acceptable audio file extensions.*/}
                <label htmlFor="path">Audio file</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.icon}
                  error={errors.icon}
                  id="icon"
                  type="file" />
                <label htmlFor="icon">Poster</label>  {/* TODO: Specify the acceptable image file extensions.*/}
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

export default Movie;