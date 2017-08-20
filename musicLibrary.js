'use strict'
const FileUtils = require('./util/fileUtils.js');
const TimeUtils = require('./util/timeUtils.js');
const EncodingUtils = require('./util/encodingUtils.js');
const Track = require('./model/track.js');

const listTrackFiles = () => new Promise((resolve, reject) => {
  FileUtils.getFiles().then( files => {
    const trackFiles = files.filter(FileUtils.isWavFile);
    resolve(trackFiles);
  })
});

const getTrack = (index) => new Promise((resolve, reject) => {
  listTrackFiles()
    .then( async trackFiles => {
      if(index >= trackFiles.length) {
        reject('Index out of bones');
      } else {
        const trackFile = trackFiles[index];
        const trackPath = FileUtils.getFilePath(trackFile);
        const trackMs = await TimeUtils.getTrackMs(trackPath);
        const track = new Track(trackFile,trackPath, trackMs);
        const decoratedTrack = track.decorate();
        resolve(decoratedTrack);
      }
    });
});

const copyTrack = (index, newName) => new Promise((resolve, reject) => {
  getTrack(index).then(track => {
    return EncodingUtils.decode(track.path);
  }).then(audioObj => {
    const newPath = FileUtils.getFilePath(newName);
    return EncodingUtils.encode(audioObj, newPath);
  }).then(success => {
    resolve({success: true});
  });
});

const cropTrack = (index, newName, fromSec, toSec) => new Promise((resolve, reject) => {
  getTrack(index).then(track => {
    if(fromSec < 0) {
      reject('Bad initial time');
    }
    if(toSec > (track.ms / 1000)) {
      reject('Bad final time');
    }
    return EncodingUtils.decode(track.path);
  }).then(audioObj => {
    const fromByte = audioObj.sampleRate * fromSec;
    const toByte = audioObj.sampleRate * toSec;
    const croppedChannelData = audioObj.channelData.map(channel => channel.slice(fromByte,toByte));
    const newAudioObj = {
      sampleRate: audioObj.sampleRate,
      channelData: croppedChannelData
    }
    const newPath = FileUtils.getFilePath(newName);
    return EncodingUtils.encode(newAudioObj, newPath);
  }).then(success => {
    resolve({success: true});
  });
});

const amplifyTrack = (index, newName, percentage) => new Promise((resolve, reject) => {
  getTrack(index).then(track => {
    return EncodingUtils.decode(track.path);
  }).then(audioObj => {
    const amplifiedChannelData = audioObj.channelData.map(channel => channel.map(audioVal => {
      return Math.min(audioVal * percentage, Number.MAX_VALUE);
    }));
    const newAudioObj = {
      sampleRate: audioObj.sampleRate,
      channelData: amplifiedChannelData
    }
    const newPath = FileUtils.getFilePath(newName);
    return EncodingUtils.encode(newAudioObj, newPath);
  }).then(success => {
    resolve({success: true});
  });
});

const joinTracks = (index1, index2, newName) => new Promise((resolve, reject) => {
  const p1 = new Promise((resolve, reject) => {
    getTrack(index1).then(track => {
      resolve(EncodingUtils.decode(track.path));
    })
  });
  const p2 = new Promise((resolve, reject) => {
    getTrack(index2).then(track => {
      resolve(EncodingUtils.decode(track.path));
    })
  });
  Promise.all([p1, p2]).then(([audioObj1, audioObj2]) => {
    const channels = Math.min(audioObj1.numberOfChannels, audioObj2.numberOfChannels);
    const leftChannelData = EncodingUtils.joinBuffers(audioObj1.channelData[0],audioObj2.channelData[0]);
    const rightChannelData = (channels == 2) ? EncodingUtils.joinBuffers(audioObj1.channelData[1],audioObj2.channelData[1]) : undefined;
    const newAudioObj = {
      sampleRate: audioObj1.sampleRate,
      channelData: [leftChannelData, rightChannelData]
    }
    const newPath = FileUtils.getFilePath(newName);
    return EncodingUtils.encode(newAudioObj, newPath);
  }).then(success => {
    resolve({success: true});
  });
});

module.exports = {
  listTrackFiles,
  getTrack,
  copyTrack,
  cropTrack,
  amplifyTrack,
  joinTracks
};
