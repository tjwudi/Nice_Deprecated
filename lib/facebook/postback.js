module.exports = {
    handlePostback: function (postback, session) {
        session.send('Nice reaction!');
    }
};
