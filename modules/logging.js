var config = require("./config");

var exp = {};

function debug() {
  if (config.debug_enabled) {
    console.log(Array.prototype.slice.call(arguments).join(" "));
  }
}

function devnull() {

}

exp.log = devnull;
exp.warn = console.warn;
exp.error = console.error;
exp.debug = debug;

module.exports = exp;