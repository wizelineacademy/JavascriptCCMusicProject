'use strict'
const moment = require('moment');
const EncodingUtils = require('./encodingUtils.js');

const getTrackMs = trackPath => new Promise((resolve, reject) => {
  EncodingUtils.decode(trackPath).then((decodedTrack) => {
    resolve(parseInt(1000 * ( decodedTrack.length / decodedTrack.sampleRate)));
  });
});

const msToTimeFormat = ms => {
  const momentMs = moment.duration(ms).asMilliseconds();
  return moment.utc(momentMs).format('mm:ss');
}

module.exports = {
  getTrackMs,
  msToTimeFormat
};
