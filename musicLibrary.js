'use strict'
const FileUtils = require('./util/fileUtils.js');
const Track = require('./model/track.js');

const listTrackFiles = () => new Promise((resolve, reject) => {
  FileUtils.getFiles().then( files => {
    const trackFiles = files.filter(FileUtils.isWavFile);
    resolve(trackFiles);
  })
});

const getTrackFile = (index) => new Promise((resolve, reject) => {
  listTrackFiles().then( trackFiles => {
    if(index >= trackFiles.length) {
      reject('Index out of bones');
    } else {
      const trackFile = trackFiles[index];
      const trackPath = FileUtils.getFilePath(trackFile);
      const track = new Track(trackFile,trackPath);
      const decoratedTrack = track.decorate();
      resolve(decoratedTrack);
    }
  });
});

module.exports = {
  listTrackFiles,
  getTrackFile
};
