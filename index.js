"use strict";
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  var TelegramBot = require('node-telegram-bot-api');

    var token = '235548784:AAHkS-f8J4D4LTM527TldPFHRKt0DL1ykB4';

  var bot = new TelegramBot(token, { polling: true });
  bot.sendMessage("153878723",  "macaco");
  res.send("porra");
});

app.listen(80, function () {
  console.log('Example app listening on port 3000!');
});

