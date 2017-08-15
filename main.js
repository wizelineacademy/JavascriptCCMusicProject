'use strict'
const express = require('express');
const HTTPStatus = require('http-status');
const MusicLibrary = require('./musicLibrary.js');

const server = express();
const PORT = 9000;

server.route('/tracks').get((req,res) => {
  MusicLibrary.listTrackFiles().then(trackFiles => {
    res.json(trackFiles);
  });
});

server.route('/tracks/:index').get((req,res) => {
  const index = req.params.index;
  MusicLibrary.getTrack(index).then(track => {
    res.json(track);
  }).catch(err => {
    res.status(HTTPStatus.BAD_REQUEST);
    res.send(err);
  });
});

server.listen(PORT,() => {
  console.log(`Server listening at port ${PORT}`);
});
