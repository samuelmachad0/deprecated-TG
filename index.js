"use strict";

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var http = require("http");

var port = (process.env.PORT || 5000);

http.createServer(function(request, response){

  response.write(200,{'Content-Type':'application/json'});
  response.write(JSON.stringify({name: 'smartcitiesbot', ver:'0.0.1'}));
// replace the value below with the Telegram token you receive from @BotFather
var token = '235548784:AAHkS-f8J4D4LTM527TldPFHRKt0DL1ykB4';

// Create a bot that uses 'polling' to fetch new updates
var bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, function (msg, match) {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  var chatId = msg.chat.id;
  var resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', function (msg) {
  var chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, "Barney usa XML");
});

  return "Teste";

  response.end();
}).listen(port);



