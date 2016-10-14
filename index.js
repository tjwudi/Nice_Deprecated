var env = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

var Bottr = require('bottr')
var BottrApp = require('bottr-app')
var memcachedClient = require('./lib/memcached/nice-client').create();

var bot = new Bottr.Bot()
bot.use(new BottrApp())
bot.use(new Bottr.FacebookMessengerClient())

bot.on('message_received', function (message, session) {
  memcachedClient.hadInteractionToday(message.user, function (err, hadInteractionToday) {
    if (err) {
      // TODO Exception handling.
      throw err;
    }

    if (!hadInteractionToday) {
      memcachedClient.setFirstInteractionToday(message.user, function () {
        session.send('Hello! It\'s our first message today!');
      });
    }
    else {
      session.send('We already met today.');
    }
  });
});

bot.listen()


