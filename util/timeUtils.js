'use strict'
const moment = require('moment');

const getTrackMs = track => 60000

const msToTimeFormat = ms => {
  const momentMs = moment.duration(ms).asMilliseconds();
  return moment.utc(momentMs).format('mm:ss');
}

module.exports = {
  getTrackMs,
  msToTimeFormat
};
