import React from "react";
import { Button } from "@material-ui/core";
import OrderedSongPlayer from "../modules/orderedSongPlayer";
import SongPlayer from "../modules/songPlayer";
import Note from "../modules/note";

export default class PlaySong extends React.Component {
  constructor() {
    super();
    // this.songPlayer = new OrderedSongPlayer();
    // this.songPlayer1 = new OrderedSongPlayer();

    this.songPlayer = new SongPlayer();
    const mySong1 = mySong.map((n) => new Note(n.noteValue + 12, n.noteLength, n.startTime));
    this.songPlayer.setSong(mySong1);
    // mySong1.map((a) => console.log(a.startTime));
    // this.songPlayer.setSong(mySong);
    // this.songPlayer1.setSong(mySong1);
    // this.songPlayer.setSong([new Note(53, 4)]);
    this.songPlayer.setTempo(120);
    // this.songPlayer1.setTempo(120);
  }

  startAudio() {
    this.songPlayer.play();
    // this.songPlayer1.play();
  }

  stopAudio() {
    this.songPlayer.pause();
    // this.songPlayer1.pause();
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
  new Note(53, 1, 0),
  new Note(61, 1.5, 1),
  new Note(60, 0.5, 2.5),
  new Note(58, 0.5, 3),
  new Note(53, 0.5, 3.5),
  new Note(58, 1.5, 4),
  new Note(53, 1.5, 5.5),
  new Note(46, 1, 7),
  new Note(51, 1.5, 8),
  new Note(54, 1, 9.5),
  new Note(51, 0.5, 10.5),
  new Note(54, 0.5, 11),
  new Note(49, 0.5, 11.5),
  new Note(48, 2.5, 12),
  // phrase 1 accompaniment
  new Note(34, 4, 0),
  new Note(41, 4, 0),
  new Note(37, 4, 4),
  new Note(42, 4, 4),
  new Note(39, 4, 8),
  new Note(46, 4, 8),
  new Note(32, 4, 12),
  new Note(39, 4, 12),
  // phrase 2
  new Note(46, 0.5, 14.5),
  new Note(51, 0.5, 15),
  new Note(58, 0.5, 15.5),
  new Note(53, 1, 16),
  new Note(61, 1.5, 17),
  new Note(68, 0.5, 18.5),
  new Note(70, 0.5, 19),
  new Note(61, 0.5, 19.5),
  new Note(66, 1.5, 20),
  new Note(65, 1.5, 21.5),
  new Note(58, 0.5, 23),
  new Note(49, 0.5, 23.5),
  new Note(51, 1.5, 24),
  new Note(53, 1, 25.5),
  new Note(49, 0.5, 26.5),
  new Note(48, 0.5, 27),
  new Note(44, 0.5, 27.5),
  new Note(46, 1.5, 28),
  new Note(44, 2, 29.5),
  // phrase 2 accompaniment
  new Note(34, 4, 16),
  new Note(41, 4, 16),
  new Note(37, 4, 20),
  new Note(42, 4, 20),
  new Note(39, 4, 24),
  new Note(46, 4, 24),
  new Note(32, 4, 28),
  new Note(39, 4, 28),
  // Violin
  new Note(61, 1, 13.5),
  new Note(63, 0.25, 14.5),
  new Note(65, 0.25, 14.75),
  new Note(66, 0.25, 15),
  new Note(68, 0.25, 15.25),
  new Note(70, 0.25, 15.5),
  new Note(72, 0.25, 15.75),
  new Note(70, 4, 16),
  new Note(73, 4, 16),
  new Note(73, 4, 20),
  new Note(77, 4, 20),
  new Note(70, 4, 24),
  new Note(75, 4, 24),
  new Note(63, 4, 28),
  new Note(68, 4, 28)
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
