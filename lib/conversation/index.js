var memcachedClient = require('../memcached/nice-client').create();
var facebook = require('../facebook');
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
            memcachedClient.setFirstInteractionToday(user, function (err) {
                if (err) {
                    // TODO Exception handling
                    throw err;
                }
                session.send(_getGreetingForFirstInteractionOfToday());
                //facebook.sendEmotionButtons(user, session.client.config.access_token);
            });
        }
        else {
            session.send('Hey again!');
            facebook.sendEmotionButtons(user, session.client.config.access_token);
        }
    });
}

module.exports = {
    handleUserInteraction: handleUserInteraction
};
