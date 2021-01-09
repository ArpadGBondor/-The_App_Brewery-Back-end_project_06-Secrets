const util = require('util');
const consoleStamp = require('console-stamp');
// I like logging with this tool
consoleStamp(console, {
  pattern: 'HH:MM:ss.l',
  colors: {
    stamp: 'yellow',
    label: 'blue'
  }
});

/**
 * log - colorfull console.log() for "description: object" style logging
 *
 * @param  {string} msg description of the object
 * @param  {any}    obj will be logged using util.inspect()
 * @return {undefined}
 */

module.exports = function(msg, obj) {
  if (typeof obj === 'undefined') {
    if (typeof msg === 	'string'){
      return console.log('\x1b[36m' + msg + '\x1b[0m');
    }
    return console.log(msg);
  }
  return console.log('\x1b[36m' + msg + '\x1b[0m' +
    util.inspect(obj, {
      colors: true
    }));
};
