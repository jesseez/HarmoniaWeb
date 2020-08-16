
const AudioContext = window.AudioContext || window.webkitAudioContext;

export default class OscillatorPool {
  static audioContext = new AudioContext();

  constructor() {
    this.oscillatorConnectionPool = [];
  }

  getOscillator() {
    let oscillatorConnection = this.oscillatorConnectionPool.find((o) => o.available);
    if (oscillatorConnection == null) {
      const oscillator = OscillatorPool.audioContext.createOscillator();
      oscillator.connect(OscillatorPool.audioContext.destination);
      oscillatorConnection = new OscillatorConnection(oscillator);
    }
    oscillatorConnection.available = false;

    return oscillatorConnection.oscillator;
  }

  returnOscillator(oscillator) {
    const connection = this.oscillatorConnectionPool.find((o) => o.oscillator === oscillator);

    if (connection != null) connection.available = true;
  }
}

// used to track availability/usage of oscillators
class OscillatorConnection {
  constructor(oscillator) {
    this.oscillator = oscillator;
    this.available = true;
  }
}
