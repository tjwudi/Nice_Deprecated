var memcachedClient = require('./_client');

function NiceMemCachedClient (_store) {
  this._store = _store;
}

NiceMemCachedClient.keyMakers = {
  makeKeyForFirstInteraction: function (userId) {
    return 'first_interaction:' + userId;
  }
};

NiceMemCachedClient.prototype.hadInteractionToday = function (userId, callback) {
  var key = NiceMemCachedClient.keyMakers.makeKeyForFirstInteraction(userId);
  var client = this;

  client._store.get(key, function (err, val) {
    if (err) return callback(err);
    callback(null, val);
  });
};

NiceMemCachedClient.prototype.setFirstInteractionToday = function (userId, callback) {
  var key = NiceMemCachedClient.keyMakers.makeKeyForFirstInteraction(userId);
  var client = this;

  client._store.get(key, function (err, val) {
    if (err) return callback(err);
    // Already had interaction today.
    if (val) return;
    var exp = 60 * 60 * 24 - client._getSecondsSinceToday();
    client._store.set(key, 1, function (err, val) {
      if (err) return callback(err);
      callback();
    }, exp);
  });
};

NiceMemCachedClient.prototype._getSecondsSinceToday = function () {
  var dt = new Date();
  var secs = dt.getSeconds() + (60 * dt.getMinutes()) + (60 * 60 * dt.getHours());
  return secs;
};

NiceMemCachedClient.create = function () {
  return new NiceMemCachedClient(memcachedClient);
}

module.exports = NiceMemCachedClient;
