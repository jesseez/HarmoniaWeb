import OscillatorPool from "./oscillatorPool";
import { calculateNoteLengthInSeconds } from "./utils";

export default class AudioPlayer {
    static oscillatorPool = new OscillatorPool();

    constructor(tempo) {
      this.tempo = tempo ?? 120;
      this._oscillatorsInUse = [];
    }

    play(note) {
      const oscillator = AudioPlayer.oscillatorPool.getOscillator();
      this._oscillatorsInUse.push(oscillator);

      oscillator.frequency.value = note.getFrequency();
      oscillator.start();

      const timeInSeconds = calculateNoteLengthInSeconds(note, this.tempo);
      oscillator.stop(OscillatorPool.audioContext.currentTime + timeInSeconds);
      oscillator.onended = this._freeOscillator.bind(this, oscillator);
    }

    _freeOscillator(oscillator) {
      AudioPlayer.oscillatorPool.returnOscillator(oscillator);
      this._oscillatorsInUse.splice(this._oscillatorsInUse.indexOf(oscillator), 1);
    }

    stop() {
      this._oscillatorsInUse.forEach((o) => o.stop());
    }
}
