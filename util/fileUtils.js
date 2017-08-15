'use strict'
const fs = require('fs');

const DIR = fs.realpathSync('./tracks');

const getFiles = () => new Promise((resolve, reject) => {
  fs.readdir(DIR, (err, files) => {
    resolve(files);
  });
});

const isWavFile = file => file.endsWith('.wav');

const getFilePath = file => DIR + '/' + file;

module.exports = {
  getFiles,
  isWavFile,
  getFilePath
};
