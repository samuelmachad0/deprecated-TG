"use strict";
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  var TelegramBot = require('node-telegram-bot-api');

    var token = '235548784:AAHkS-f8J4D4LTM527TldPFHRKt0DL1ykB4';
    var parts = url.parse(request.url, true);
    var query = parts.query;
  var bot = new TelegramBot(token, { polling: true });
  bot.sendMessage("153878723",  request.query.valor);
  res.send("porra");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

