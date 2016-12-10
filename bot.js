"use strict";
var TelegramBot = require('node-telegram-bot-api');
module.exports = function(){
  var token = '235548784:AAHkS-f8J4D4LTM527TldPFHRKt0DL1ykB4';
  var bot = new TelegramBot(token, { polling: true });

  // msg = json do telegram
  bot.on('message', function (msg) {
    var chatId = msg.chat.id;

    bot.sendMessage(chatId,  response.data);
   });
}
// json do telegram, 
 // {
 //      "update_id": 782684373,
 //      "message": {
 //        "message_id": 123,
 //        "from": {
 //          "id": 153878723,
 //          "first_name": "Samuel",
 //          "last_name": "Alves",
 //          "username": "samuelmachado"
 //        },
 //        "chat": {
 //          "id": 153878723,
 //          "first_name": "Samuel",
 //          "last_name": "Alves",
 //          "username": "samuelmachado",
 //          "type": "private"
 //        },
 //        "date": 1481370898,
 //        "text": "sda"
 //      }
 //    }





