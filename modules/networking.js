var request = require('request');
var skins = require('./skins');

var session_url = "https://sessionserver.mojang.com/session/minecraft/profile/";

var exp = {};

exp.get_profile = function(uuid, callback) {
  request.get({
    url: session_url + uuid,
    timeout: 1000 // ms
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, JSON.parse(body));
    } else {
      if (error) {
        callback(error, null);
        return;
      } else if (response.statusCode == 204 || response.statusCode == 404) {
        // we get 204 No Content when UUID doesn't exist (including 404 in case they change that)
      } else if (response.statusCode == 429) {
        // Too Many Requests
        console.warn("Too many requests for " + uuid);
        console.warn(body);
      } else {
        console.error("Unknown error:");
        console.error(response);
        console.error(body);
      }
      callback(null, null);
    }
  });
};

exp.skin_file = function(url, outname, callback) {
  request.get({
    url: url,
    encoding: null, // encoding must be null so we get a buffer
    timeout: 1000 // ms
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      skins.extract_face(body, outname, function() {
        callback();
      });
    } else {
      if (error) {
        console.error(error);
      } else if (response.statusCode == 404) {
        console.warn("Texture not found: " + url);
      } else if (response.statusCode == 429) {
        // Too Many Requests
        // Never got this, seems like textures aren't limited
        console.warn("Too many requests for " + url);
        console.warn(body);
      } else {
        console.error("Unknown error:");
        console.error(response);
        console.error(body);
      }
      callback(null);
    }
  });
};

module.exports = exp;