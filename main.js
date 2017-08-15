'use strict'

const MusicLibrary = require('./musicLibrary.js');

console.info('tracks: ', MusicLibrary.listTrackFiles());

console.info('track 1:', MusicLibrary.getTrack(1));

console.info('track 5:', MusicLibrary.getTrack(5));
