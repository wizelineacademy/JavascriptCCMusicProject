'use strict'
const WavDecoder = require("wav-decoder");
const WavEncoder = require("wav-encoder");
const fs = require('fs');

/**
 * Decoded audioObject properties:
 * numberOfChannels: 1 for mono and 2 for stereo
 * length: the length of each channel
 * sampleRate: the number of bytes per second
 * channelData: for each channel, a Float32Array that extends an ArrayBuffer object
**/
const decode = (filepath) => new Promise((resolve, reject) => {
  fs.readFile(filepath, (err, encoded) => {
    if (err) reject(err);
    else resolve(WavDecoder.decode(encoded));
  });
});

const encode = (decoded, filepath) => new Promise((resolve, reject) => {
  WavEncoder.encode(decoded).then(encoded => {
    fs.writeFileSync(filepath, new Buffer(encoded));
    resolve(true);
  });
});

module.exports = {
  decode,
  encode
};
