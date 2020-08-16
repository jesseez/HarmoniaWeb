export default class Note {
  static _frequencyStep = Math.pow(2, 1/12);
  static _baseFrequency = 440;
  static _baseNoteValue = 58;

  // Note value is described down below
  // Note length is a number describing the duration of the note in quarter notes. Ie a quarter note is 1, half note is 2, eighth note is 0.5
  constructor(noteValue, noteLength) {
    this.noteValue = noteValue;
    this.noteLength = noteLength;
  }

  getFrequency() {
    return Note._baseFrequency * Math.pow(Note._frequencyStep, this.noteValue - Note._baseNoteValue);
  }
}

// Note value is defined as a numerical assignment to a note depending on it's frequency.
// ie C0 is 1, and A4 (440) is 58.
// Each half step is an increment. Just like old times.

// To calculate frequency, the formula is f1 = f0 * (2^(1/12))^n
// Where f0 is a base frequency and n is the number of half steps away.
// Given this info and that 440 is home base, we can compute frequency using this formula.
