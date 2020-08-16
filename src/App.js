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
