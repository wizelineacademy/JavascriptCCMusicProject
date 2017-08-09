'use strict'

const getFiles = path => [
  'track1.wav',
  'track2.wav',
  '.cache'
];

const isWavFile = file => file.endsWith('.wav');

module.exports = {
  getFiles,
  isWavFile
};
