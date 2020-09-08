import NotePlayerPool from "./notePlayerPool";
import { calculateNoteLengthInSeconds } from "./utils";

export default class AudioPlayer {
  constructor() {
    this.notePlayerPool = new NotePlayerPool();
    this._notePlayersInUse = [];
  }

  play(note, tempo, onNoteEnd) {
    const notePlayer = this.notePlayerPool.getNotePlayer();
    this._notePlayersInUse.push(notePlayer);

    notePlayer.setFrequency(note.getFrequency());
    notePlayer.start();

    const timeInSeconds = calculateNoteLengthInSeconds(note, tempo);
    notePlayer.stop(notePlayer.getCurrentTime() + timeInSeconds);
    notePlayer.onEnded(function() {
      this._freeNotePlayer.bind(this, notePlayer);
      if (onNoteEnd) onNoteEnd();
    }.bind(this));
  }

  _freeNotePlayer(notePlayer) {
    this.notePlayerPool.returnNotePlayer(notePlayer);
    this._notePlayersInUse.splice(this._notePlayersInUse.indexOf(notePlayer), 1);
  }

  stop() {
    this._notePlayersInUse.forEach((o) => o.stop());
  }
}
