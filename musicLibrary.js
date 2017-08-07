'use strict'
const moment = require('moment');

const files = [
  'track1.wav',
  'track2.wav',
  '.cache'
];

const endsWithWav = file => file.endsWith('.wav');

const getTrackMs = track => 60000

const msToTimeFormat = ms => {
  const momentMs = moment.duration(ms).asMilliseconds();
  return moment.utc(momentMs).format('mm:ss');
}

function listTrackFiles() {
  return files.filter( endsWithWav );
}

function getTrackFile(index) {
  const trackFiles = listTrackFiles();
  if(index >= trackFiles.length) {
    return null;
  } else {
    const name = files[index];
    const ms = getTrackMs(name);
    return {
      name,
      duration_as_ms: ms,
      duration_as_time_format: msToTimeFormat(ms)
    };
  }

}

module.exports = {
  listTrackFiles,
  getTrackFile
};
