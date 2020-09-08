import AudioPlayer from "./audioPlayer";
import { calculateLengthInSeconds } from "./utils";

export default class SongPlayer {
  static state = {
    ready: "ready",
    playing: "playing",
    paused: "paused",
    ended: "ended"
  }

  constructor() {
    this.audioPlayer = new AudioPlayer();
    this.state = SongPlayer.state.ready;
    this._currentIndex = 0;
    this.tempo = 120;
  }

  reset() {
    this._scheduledEvents = [];
    this.state = SongPlayer.state.ready;
    this._currentIndex = 0;
  }

  isReady() {
    return this.state === SongPlayer.state.ready;
  }

  isPlaying() {
    return this.state === SongPlayer.state.playing;
  }

  isEnded() {
    return this.state === SongPlayer.state.ended;
  }

  isPaused() {
    return this.state === SongPlayer.state.paused;
  }

  setSong(song) {
    this.song = song;
    this._convertSongIntoMap(song);
    this.reset();
  }

  _convertSongIntoMap(song) {
    const structuredSong = [];
    for (const note of song) {
      let noteGroup = structuredSong.find((n) => n.startTime === note.startTime);

      if (noteGroup == null) {
        noteGroup = new NoteGroup(note.startTime);
        structuredSong.push(noteGroup);
      }

      noteGroup.notes.push(note);
    }

    structuredSong.sort((a, b) => a.startTime - b.startTime);
    this.structuredSong = structuredSong;
  }

  setTempo(tempo) {
    if (tempo == null || this.isPlaying()) return;
    this.tempo = tempo;
  }

  play() {
    if (this.isEnded()) {
      this.state = SongPlayer.state.playing;
      this._currentIndex = 0;
    } else if (this.isReady() || this.isPaused()) {
      this.state = SongPlayer.state.playing;
    } else if (this.structuredSong.length === 0) return;

    this.playImpl();
  }

  playImpl() {
    if (this.isPaused()) return;
    const noteGroup = this.structuredSong[this._currentIndex];
    for (const note of noteGroup.notes) {
      this._playNote(note);
    }

    this._currentIndex++;
    if (this.structuredSong.length !== this._currentIndex) {
      const noteLengthUntilNextNote = this.structuredSong[this._currentIndex].startTime - noteGroup.startTime;
      const noteLengthInMillis = calculateLengthInSeconds(noteLengthUntilNextNote, this.tempo) * 1000;
      setTimeout(this.playImpl.bind(this), noteLengthInMillis);
    }
  }

  _playNote(note) {
    this.audioPlayer.play(note, this.tempo, this._onNoteEnd.bind(this, note));
  }

  _onNoteEnd(note) {
    const lastNote = this.structuredSong[this.structuredSong.length - 1].notes.reduce((a, b) => Math.max(a.noteLength, b.noteLength));
    if (note === lastNote) {
      this.state = SongPlayer.state.ended;
    }
  }

  pause() {
    if (this.state !== SongPlayer.state.playing) return;
    this.state = SongPlayer.state.paused;
    this._currentIndex--;
  }
}


class NoteGroup {
  constructor(startTime) {
    this.startTime = startTime;
    this.notes = [];
  }
}
