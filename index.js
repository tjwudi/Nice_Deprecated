var env = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

var Bottr = require('bottr')
var BottrApp = require('bottr-app')
var memcachedClient = require('./lib/memcached/nice-client').create();
var conversation = require('./lib/conversation');

var bot = new Bottr.Bot()
bot.use(new BottrApp())
bot.use(new Bottr.FacebookMessengerClient())

bot.on('message_received', function (message, session) {
    // Facebook bot is currently the only source of message.
    conversation.handleUserInteraction('facebook', message, session);
});

bot.listen()


