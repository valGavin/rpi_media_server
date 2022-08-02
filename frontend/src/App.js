import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Songs from "./components/media/Songs";
import Movies from "./components/media/Movies";
import Series from "./components/media/Series";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/musics" component={Songs} />
          <Route exact path="/movies" component={Movies} />
          <Route exact path="/series" component={Series} />
        </div>
      </Router>
    );
  }
}

export default App;