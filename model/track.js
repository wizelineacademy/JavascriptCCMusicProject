'use strict'
const TimeUtils = require('../timeUtils.js');

module.exports = class Track {
  constructor(name) {
    this.name = name;
    this.ms = TimeUtils.getTrackMs(name);
  }

  decorate() {
    return {
      name: this.name,
      duration_as_ms: this.ms,
      duration_as_time_format: TimeUtils.msToTimeFormat(this.ms)
    };
  }
}
