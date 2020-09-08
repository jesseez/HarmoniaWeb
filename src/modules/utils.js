export const calculateNoteLengthInSeconds = function(note, tempo) {
  return calculateLengthInSeconds(note.noteLength, tempo);
};

export const calculateLengthInSeconds = function(noteLength, tempo) {
  // beats per second
  const bps = tempo / 60;
  // seconds per beat
  const spb = 1 / bps;

  return spb * noteLength;
};
