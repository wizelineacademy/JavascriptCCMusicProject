'use strict'

const files = [
  'track1.wav',
  'track2.wav',
  '.cache'
]

const listTrackFiles = () => {
  return files.filter( file => file.endsWith('.wav') )
}

console.log('tracks:')
console.log(listTrackFiles())
