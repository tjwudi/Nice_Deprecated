var env = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

var Bottr = require('bottr')
var BottrApp = require('bottr-app')
var conversation = require('./lib/conversation');
var facebook = require('./lib/facebook');

var bot = new Bottr.Bot()
bot.use(new BottrApp())
bot.use(new Bottr.FacebookMessengerClient())

bot.on('message_received', function (message, session) {
    if (session.client.constructor.name === 'FacebookMessengerClient') {
        // Facebook bot is currently the only source of message.
        conversation.handleUserInteraction('facebook', message, session);
    }
    else {
        // Drop other messages
    }
});

bot.on('postback_received', function (postback, session) {
    facebook.postback.handlePostback(postback, session);
});

bot.listen()


