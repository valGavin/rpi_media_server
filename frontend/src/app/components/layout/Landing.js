import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
        <div className="col s12 center-align">
          <h4>
            <span style={{ fontFamily: "monospace" }}>Media Content</span>
          </h4>
          <p className="flow-text grey-text text-darken-1">
            Available Media
          </p>
          <div className="col s4">
            <Link
              to="/musics"
              style={{ width: "140px", borderRadius: "3px", letterSpacing: "1.5px" }}
              className="btn btn-large btn-flat waves-effect white black-text">
              Musics
            </Link>
          </div>
          <div className="col s4">
            <Link
              to="/movies"
              style={{ width: "140px", borderRadius: "3px", letterSpacing: "1.5px" }}
              className="btn btn-large btn-flat waves-effect white black-text">
              Movies
            </Link>
          </div>
          <div className="col s4">
            <Link
              to="/series"
              style={{ width: "140px", borderRadius: "3px", letterSpacing: "1.5px" }}
              className="btn btn-large btn-flat waves-effect white black-text">
              Series
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;