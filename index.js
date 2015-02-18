/*
 * ToneGenerator for node.js
 * generates raw PCM data for a tone,
 * specify length, frequency, and rate
 */
function generateCycle(cycle, volume) {
  var data = [];
  var tmp;
  for(var i = 0; i < cycle; i++) {
    tmp = volume * Math.sin((i/cycle) * Math.PI * 2);
    data[i] = Math.round(tmp);
  }
  return data;
}

module.exports = function(freq, lengthInSecs, rate) {
  freq = freq || 440;
  lengthInSecs = lengthInSecs || 2.0;
  rate = rate || 44100;

  var cycle = Math.floor(rate/freq);
  var volume = 30;
  var samplesLeft = lengthInSecs * rate;
  var cycles = samplesLeft/cycle;
  var ret = [];

  for(var i = 0; i < cycles; i++) {
    ret = ret.concat(generateCycle(cycle, volume));
  }

  return ret;
};
