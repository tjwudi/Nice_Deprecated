module.exports = {
    isTextMessage: function (message) {
        return 'text' in message;
    },
    isPostback: function (message) {
        return 'postback' in message;
    }
};
