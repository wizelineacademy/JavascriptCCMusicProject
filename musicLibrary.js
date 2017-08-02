'use strict'

const files = [
  'track1.wav',
  'track2.wav',
  '.cache'
];

const endsWithWav = file => file.endsWith('.wav');

// ie. Using imperative programming
/*function listTrackFiles() {
  const wavFiles = [];
  for(let i=0; i<files.length; i++) {
    const file = files[i];
    if(endsWithWav(file)) {
      wavFiles.push(file);
    }
  }
  return wavFiles;
}*/

// ie. Using a high order function
function listTrackFiles() {
  return files.filter( endsWithWav );
}

exports.listTrackFiles = listTrackFiles;
