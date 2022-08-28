import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./app/components/layout/Navbar";
import Landing from "./app/components/layout/Landing";
import Songs from "./app/components/media/music/Songs";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/musics" element={<Songs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;