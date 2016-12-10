"use strict";

var http = require("http");

var port = (process.env.PORT || 5000);


http.createServer(function(request, response){
var TelegramBot = require('node-telegram-bot-api');

  response.writeHead(response.statusCode.toString(),{'Content-Type':'application/json'});
  response.write(JSON.stringify({name: 'smartcitiesbot', ver:'0.0.1'}));
    var token = '235548784:AAHkS-f8J4D4LTM527TldPFHRKt0DL1ykB4';
  var bot = new TelegramBot(token, { polling: true });
  bot.sendMessage("153878723",  response.data);
  response.end();
}).listen(port);



