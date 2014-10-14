'use strict';

var Promise = require('bluebird');

var protoEnd = null,
  nativePromiseEnd = null,
  getPromiseEnd = function (previousEnd) {
    return function (success, failure) {
      var self = this,
        promise = new Promise(function (resolve, reject) {
          previousEnd.call(self, function (error, res) {
            if (error || !res.ok) {
              reject(error || res);
            } else {
              resolve(res);
            }
          });
        });

      if (success || failure) {
        promise = promise.then(success, failure);
      }

      return promise;
    };
  };

module.exports = function (request) {
  protoEnd = protoEnd || request.constructor.prototype.end;
  nativePromiseEnd = nativePromiseEnd || getPromiseEnd(protoEnd);
  request.end = request.end === protoEnd ? nativePromiseEnd : getPromiseEnd(protoEnd);
};

// useful for testing
module.exports.uncache = function () {
  nativePromiseEnd = undefined;
};
