'use strict'
const TimeUtils = require('../util/timeUtils.js');

module.exports = class Track {
  constructor(name, path) {
    this.name = name;
    this.path = path;
    this.ms = TimeUtils.getTrackMs(name);
  }

  decorate() {
    return {
      name: this.name,
      path: this.path,
      duration_as_ms: this.ms,
      duration_as_time_format: TimeUtils.msToTimeFormat(this.ms)
    };
  }
}
