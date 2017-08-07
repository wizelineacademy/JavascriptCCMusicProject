'use strict'
const TimeUtils = require('./timeUtils.js');

const files = [
  'track1.wav',
  'track2.wav',
  '.cache'
];

const endsWithWav = file => file.endsWith('.wav');

function listTrackFiles() {
  return files.filter( endsWithWav );
}

function getTrackFile(index) {
  const trackFiles = listTrackFiles();
  if(index >= trackFiles.length) {
    return null;
  } else {
    const name = files[index];
    const ms = TimeUtils.getTrackMs(name);
    return {
      name,
      duration_as_ms: ms,
      duration_as_time_format: TimeUtils.msToTimeFormat(ms)
    };
  }

}

module.exports = {
  listTrackFiles,
  getTrackFile
};
