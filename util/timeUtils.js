'use strict'
const moment = require('moment');
const AV = require('av');

const getTrackMs = trackPath => new Promise((resolve, reject) => {
  AV.Asset.fromFile(trackPath).get('duration', ms => {
    resolve(ms);
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
