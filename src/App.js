import React from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.css";
import PlaySong from "./components/PlaySong";

function App() {
  return (
    <HashRouter basename="/">
      <div className="App">
        <Route exact path="/" component={PlaySong} />
      </div>
    </HashRouter>
  );
}

export default App;


/*
  - automagic volume adjutment based on pitch and number of oscillators playing
  - OG harmonia
  - random note harmonia
  - running average harmonia
  - keyboard harmonia
  - DNA harmonia
  - tone.js
*/
