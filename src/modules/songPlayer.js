import AudioPlayer from "./audioPlayer";
import { calculateNoteLengthInSeconds } from "./utils";

export default class SongPlayer {
  static state = {
    ready: "ready",
    playing: "playing",
    paused: "paused",
    ended: "ended"
  }

  constructor() {
    this.audioPlayer = new AudioPlayer();
    this.song = []; // TODO: make song a class
    this._scheduledEvents = [];
    this.state = SongPlayer.state.ready;
    // the time at which play is pressed
    this._startTime = 0;
    // the time of the song when play is pressed
    this._startLocation = 0;
  }

  reset() {
    this._scheduledEvents = [];
    this.state = SongPlayer.state.ready;
    // the time at which play is pressed
    this._startTime = 0;
    // the time of the song when play is pressed
    this._startLocation = 0;
  }

  isPlaying() {
    return this.state === SongPlayer.state.playing;
  }

  isEnded() {
    return this.state === SongPlayer.state.ended;
  }

  setSong(song) {
    this.song = song;
    this.reset();
  }

  setTempo(tempo) {
    if (tempo == null) return;
    const playing = this.isPlaying();

    const currentTempo = this.audioPlayer.tempo;
    this.audioPlayer.tempo = tempo;
    
    this.pause();
    // scale current location to new location
    this._startLocation = this._startLocation * currentTempo / tempo;
    
    if (playing) {
      this.play();
    }
  }

  play() {
    // TODO IMPELEMTN IS ENDED
    if (this.isEnded()) this.state = SongPlayer.state.ready;
    if (this.song.length === 0 || this.isPlaying() || this.isEnded()) return;

    this._startTime = Date.now();

    this.state = SongPlayer.state.playing;
    let timeElapsedInMillis = 0;
    for (const note of this.song) {
      const noteLengthInMillis = calculateNoteLengthInSeconds(note, this.audioPlayer.tempo) * 1000;

      if (note.noteValue !== 0 && (timeElapsedInMillis + noteLengthInMillis) >= this._startLocation) {
        // TODO CUT THE FIRST ONE SHORT IF IT WAS PAUSED
        this._scheduledEvents.push(setTimeout(this._playNote.bind(this), timeElapsedInMillis - this._startLocation, note));
      }

      timeElapsedInMillis += noteLengthInMillis;
    }
  }

  _playNote(note) {
    this.audioPlayer.play(note);
  }

  pause() {
    if (this.state !== SongPlayer.state.playing) return;
    this.state = SongPlayer.state.paused;

    const endTime = Date.now();
    this._startLocation = endTime - this._startTime;

    this._scheduledEvents.forEach((e) => clearTimeout(e));
    this._scheduledEvents = [];
  }
}
