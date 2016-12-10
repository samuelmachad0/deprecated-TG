"use strict";
var TelegramBot = require('node-telegram-bot-api');

module.exports = function(){
  var token = '235548784:AAHkS-f8J4D4LTM527TldPFHRKt0DL1ykB4';
  var bot = new TelegramBot(token, { polling: true });
  bot.onText(/\/echo (.+)/, function (msg, match) {
    var chatId = msg.chat.id;
    var resp = match[1]; 
    bot.sendMessage(chatId, resp);
  });
  bot.on('message', function (msg) {
    var chatId = msg.chat.id;

    bot.sendMessage(chatId, "Suzana");
   });
}






