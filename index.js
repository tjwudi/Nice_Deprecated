var Bottr = require('bottr')
var BottrApp = require('bottr-app')

var bot = new Bottr.Bot()
bot.use(new BottrApp())
bot.listen()

bot.on('message_received', function (message, session) {
  session.send('Hello!');
});
