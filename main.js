'use strict'

const files = [
  'track1.wav',
  'track2.wav',
  '.cache'
]

const endsWithWav = file => file.endsWith('.wav')

const listTrackFiles = () => {
  return files.filter( endsWithWav )
}

console.log('tracks:')
console.log(listTrackFiles())
