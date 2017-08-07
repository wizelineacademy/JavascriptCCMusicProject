'use strict'
const Track = require('./model/track.js');

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
    const track = new Track(files[index]);
    return track.decorate();
  }
}

module.exports = {
  listTrackFiles,
  getTrackFile
};
