var constant = require('../constant');
var userMood = constant.userMood;

module.exports = {
    handlePostback: function (postback, session) {
        switch (postback.postback.payload) {
            case userMood.USER_MOOD_FEEL_GOOD:
                session.send('That\'s nice!');
                break;
            case userMood.USER_MOOD_DECENT:
                session.send('Wish you a good day!');
                break;
            case userMood.USER_MOOD_SAD:
                session.send('Cheer up! I am always with you!');
                break;
            default:
                session.send('What the hell ...');
                break;
        }
    }
};
