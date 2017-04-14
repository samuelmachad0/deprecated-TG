"use strict";

var http = require("http");

var express = require('express');
var app = express();

var TelegramBot = require('node-telegram-bot-api');

var port = (process.env.PORT || 5000);




setInterval(function() {
  http.get('https://testnodebot.herokuapp.com/');
}, 1800000); 

var token = '235548784:AAHkS-f8J4D4LTM527TldPFHRKt0DL1ykB4';
var bot = new TelegramBot(token, { polling: true });

  
bot.onText(/ADS/, function (msg) {
  

  var chatId = msg.chat.id;
  
  bot.sendMessage(chatId, 'O curso de Análise e Desenvolvimento de Sistemas ...');
});

bot.onText(/BD/, function (msg) {
  

  var chatId = msg.chat.id;
  
  bot.sendMessage(chatId, 'O curso de Banco de Dados ...');
});

bot.onText(/\/cursos/, function (msg) {
  var chatId = msg.chat.id;
  var opts = {
      reply_to_message_id: msg.message_id,
      reply_markup: JSON.stringify({
        keyboard: [
          ['ADS'],
          ['BD']]
      })
    };
    bot.sendMessage(chatId, 'Sobre qual curso você deseja receber informações?', opts);
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
