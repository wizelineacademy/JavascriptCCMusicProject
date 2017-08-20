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

server.route('/tracks/:index/copy/:newName').get((req,res) => {
  const index = req.params.index;
  const newName = req.params.newName;
  MusicLibrary.copyTrack(index, newName).then(state => {
    res.json(state);
  }).catch(err => {
    res.status(HTTPStatus.BAD_REQUEST);
    res.send(err);
  });
});

server.route('/tracks/:index/crop/:newName').get((req,res) => {
  const index = req.params.index;
  const newName = req.params.newName;
  MusicLibrary.cropTrack(index, newName, 0, 10).then(state => {
    res.json(state);
  }).catch(err => {
    res.status(HTTPStatus.BAD_REQUEST);
    res.send(err);
  });
});

server.route('/tracks/:index/amplify/:newName').get((req,res) => {
  const index = req.params.index;
  const newName = req.params.newName;
  MusicLibrary.amplifyTrack(index, newName, 2).then(state => {
    res.json(state);
  }).catch(err => {
    res.status(HTTPStatus.BAD_REQUEST);
    res.send(err);
  });
});

server.route('/tracks/:index/minify/:newName').get((req,res) => {
  const index = req.params.index;
  const newName = req.params.newName;
  MusicLibrary.amplifyTrack(index, newName, 0.5).then(state => {
    res.json(state);
  }).catch(err => {
    res.status(HTTPStatus.BAD_REQUEST);
    res.send(err);
  });
});

server.route('/tracks/:index1/join/:index2/:newName').get((req,res) => {
  const index1 = req.params.index1;
  const index2 = req.params.index2;
  const newName = req.params.newName;
  MusicLibrary.joinTracks(index1, index2, newName).then(state => {
    res.json(state);
  }).catch(err => {
    res.status(HTTPStatus.BAD_REQUEST);
    res.send(err);
  });
});

server.listen(PORT,() => {
  console.log(`Server listening at port ${PORT}`);
});
