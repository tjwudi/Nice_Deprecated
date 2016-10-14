var request = require('request');

var POSTBACK_TYPE = 'postback';
var userStatus = {
    USER_STATUS_FEEL_GOOD: 'USER_STATUS:FEEL_GOOD',
    USER_STATUS_DECENT: 'USER_STATUS:DECENT',
    USER_STATUS_SAD: 'USER_STATUS:SAD'
};


function sendEmotionButtons (user, accessToken) {
    var buttons = [
        {
            type: POSTBACK_TYPE,
            title: 'I am feeling good',
            payload: userStatus.USER_STATUS_FEEL_GOOD
        },
        {
            type: POSTBACK_TYPE,
            title: 'I feel decent',
            payload: userStatus.USER_STATUS_DECENT
        },
        {
            type: POSTBACK_TYPE,
            title: 'I feel sad',
            payload: userStatus.USER_STATUS_SAD
        }
    ];

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
    sendEmotionButtons: sendEmotionButtons
};
