
const AudioContext = window.AudioContext || window.webkitAudioContext;

export default class NotePlayerPool {
  static audioContext = new AudioContext();

  constructor() {
    this.notePlayerConnectionPool = [];
    this.filterNode = NotePlayerPool.audioContext.createDynamicsCompressor();
    this.filterNode.connect(NotePlayerPool.audioContext.destination);
  }

  getNotePlayer() {
    let notePlayerConnection = this.notePlayerConnectionPool.find((o) => o.available);
    if (notePlayerConnection == null) {
      notePlayerConnection = new NotePlayerConnection(this._createNotePlayer());
    }
    notePlayerConnection.available = false;

    return notePlayerConnection.notePlayer;
  }

  _createNotePlayer() {
    const oscillator = NotePlayerPool.audioContext.createOscillator();
    const gainNode = NotePlayerPool.audioContext.createGain();
    gainNode.connect(this.filterNode);
    oscillator.connect(gainNode);
    return new NotePlayer(oscillator, gainNode, this.filterNode, NotePlayerPool.audioContext);
  }

  returnNotePlayer(notePlayer) {
    const connection = this.notePlayerConnectionPool.find((o) => o.notePlayer === notePlayer);

    if (connection != null) connection.available = true;
  }
}

// used to track availability/usage of notePlayers
class NotePlayerConnection {
  constructor(notePlayer) {
    this.notePlayer = notePlayer;
    this.available = true;
  }
}

class NotePlayer {
  constructor(oscillator, gainNode, filterNode, audioContext) {
    this.oscillator = oscillator;
    this.gainNode = gainNode;
    this.filterNode = filterNode;
    this.audioContext = audioContext;
  }

  setFrequency(frequency) {
    this.oscillator.frequency.value = frequency;
  }

  start() {
    this.gainNode.gain.setValueAtTime(1/1000, this.getCurrentTime());
    this.oscillator.start();
    this.gainNode.gain.exponentialRampToValueAtTime(0.2, this.getCurrentTime() + 0.01);
  }

  stop(time) {
    if (!time) {
      this.gainNode.gain.setTargetAtTime(1/1000, this.getCurrentTime(), 0.01);
      this.oscillator.stop(this.getCurrentTime() + 0.05);
    } else {
      this.gainNode.gain.linearRampToValueAtTime(1/1000, time);
      this.oscillator.stop(time);
    }
  }

  onEnded(callback) {
    this.oscillator.onended = callback;
  }

  getCurrentTime() {
    return this.audioContext.currentTime;
  }
}
