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

function getTrackFile(index) {
  const trackFiles = listTrackFiles();
  if(index >= trackFiles.length) {
    return null;
  } else {
    return {
      name: files[index],
      duration: '01:00'
    };
  }

}

module.exports = {
  listTrackFiles,
  getTrackFile
};
