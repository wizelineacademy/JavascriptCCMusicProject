'use strict'

const files = [
  'track1.wav',
  'track2.wav',
  '.cache'
];

const endsWithWav = file => file.endsWith('.wav');

function listTrackFiles() {
  return files.filter( endsWithWav );
}

exports.listTrackFiles = listTrackFiles;
