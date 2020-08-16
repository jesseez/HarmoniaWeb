export const calculateNoteLengthInSeconds = function(note, tempo) {
  // beats per second
  const bps = tempo / 60;
  // seconds per beat
  const spb = 1 / bps;

  return spb * note.noteLength;
};
