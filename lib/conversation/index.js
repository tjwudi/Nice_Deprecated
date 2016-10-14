var memcachedClient = require('../memcached/nice-client').create();
var assert = require('assert');

function _getGreetingForFirstInteractionOfToday() {
    return 'Hello! This is our first conversation today!';
}

function handleUserInteraction (source, message, session) {
    // facebook is the only source now
    assert(source === 'facebook');
    var user = session.user;

    memcachedClient.hadInteractionToday(user, function (err, hadInteractionToday) {
        if (err) {
            // TODO Exception handling.
            throw err;
        }

        if (!hadInteractionToday) {
            memcachedClient.setFirstInteractionToday(user, function () {
                session.send(_getGreetingForFirstInteractionOfToday());
            });
        }
        else {
            session.send('We already met today.');
        }
    });
}

module.exports = {
    handleUserInteraction: handleUserInteraction
};
