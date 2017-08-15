'use strict'
const FileUtils = require('./util/fileUtils.js');
const Track = require('./model/track.js');

function listTrackFiles() {
  return FileUtils.getFiles().filter( FileUtils.isWavFile );
}

function getTrack(index) {
  const trackFiles = listTrackFiles();
  if(index >= trackFiles.length) {
    return null;
  } else {
    const track = new Track(trackFiles[index]);
    return track.decorate();
  }
}

module.exports = {
  listTrackFiles,
  getTrack
};
