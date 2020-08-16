import React from "react";
import { Button } from "@material-ui/core";
import SongPlayer from "../modules/songPlayer";
import Note from "../modules/note";

export default class PlaySong extends React.Component {
  constructor() {
    super();
    this.songPlayer = new SongPlayer();
    
    this.songPlayer.setSong(mySong);
    this.songPlayer.setTempo(120);
  }

  startAudio() {
    this.songPlayer.play();
  }

  stopAudio() {
    this.songPlayer.pause();
  }

  render() {
    return <div>HI

      <Button onClick={this.startAudio.bind(this)}>play</Button>
      <Button onClick={this.stopAudio.bind(this)}>pause</Button>
    </div>;
  }
}

const mySong = [
  // phrase 1
  new Note(53, 1),
  new Note(61, 1.5),
  new Note(60, 0.5),
  new Note(58, 0.5),
  new Note(53, 0.5),
  new Note(58, 1.5),
  new Note(53, 1.5),
  new Note(46, 1),
  new Note(51, 1.5),
  new Note(54, 1),
  new Note(51, 0.5),
  new Note(54, 0.5),
  new Note(49, 0.5),
  new Note(48, 2.5),
  // phrase 2
  new Note(46, 0.5),
  new Note(51, 0.5),
  new Note(58, 0.5),
  new Note(53, 1),
  new Note(61, 1.5),
  new Note(68, 0.5),
  new Note(70, 0.5),
  new Note(61, 0.5),
  new Note(66, 1.5),
  new Note(65, 1.5),
  new Note(58, 0.5),
  new Note(49, 0.5),
  new Note(51, 1.5),
  new Note(53, 1),
  new Note(49, 0.5),
  new Note(48, 0.5),
  new Note(44, 0.5),
  new Note(46, 1.5),
  new Note(44, 2)
];

/*
e = 53
f = 54
g = 56
a = 58
b = 60
c = 61
d = 63


*/
