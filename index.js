"use strict";

var http = require("http");
var url = require('url');
var port = (process.env.PORT || 5000);


http.createServer(function(request, response){
var TelegramBot = require('node-telegram-bot-api');

  response.writeHead(response.statusCode.toString(),{'Content-Type':'application/json'});
  response.write(JSON.stringify({name: 'smartcitiesbot', ver:'0.0.1'}));
    var token = '235548784:AAHkS-f8J4D4LTM527TldPFHRKt0DL1ykB4';
    var parts = url.parse(request.url, true);
    var query = parts.query;
  var bot = new TelegramBot(token, { polling: true });
  bot.sendMessage("153878723",  request.query.valor);
  response.end();
}).listen(port);



