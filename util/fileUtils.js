'use strict'
const fs = require('fs');

const DIR = './tracks';

const getFiles = () => new Promise((resolve, reject) => {
  fs.readdir(DIR, (err, files) => {
    resolve(files);
  });
});

const isWavFile = file => file.endsWith('.wav');

module.exports = {
  getFiles,
  isWavFile
};
