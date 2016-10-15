var request = require('request');

var POSTBACK_TYPE = 'postback';
var constant = require('../constant');
var userMood = constant.userMood;


function sendTextMessage (user, accessToken, messageBody) {
    var messageData = {
        recipient: {
            id: user
        },
        message: {
            text: messageBody
        }
    };

    return request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: accessToken },
        method: 'POST',
        json: messageData
    }, function (err, res, body) {
        if (err) throw err;
    });
}


function sendEmotionButtons (user, accessToken) {
    var buttons = [
        {
            type: POSTBACK_TYPE,
            title: 'I am feeling good',
            payload: userMood.USER_MOOD_FEEL_GOOD
        },
        {
            type: POSTBACK_TYPE,
            title: 'I feel decent',
            payload: userMood.USER_MOOD_DECENT
        },
        {
            type: POSTBACK_TYPE,
            title: 'I feel sad',
            payload: userMood.USER_MOOD_SAD
        }
    ];
    console.log(buttons);

    var messageData = {
        recipient: {
            id: user
        },
        message: {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'button',
                    text: 'How are you feeling now?',
                    buttons: buttons
                }
            }
        }
    };

    return request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: accessToken },
        method: 'POST',
        json: messageData
    }, function (err, res, body) {
        if (err) {
            // TODO error handling
            throw err;
        }
        console.log(body);
    });
}


module.exports = {
    sendEmotionButtons: sendEmotionButtons,
    messageTypes: require('./message-types'),
    postback: require('./postback')
};
