"use strict";

var http = require("http");
var TelegramBot = require('node-telegram-bot-api');

var port = (process.env.PORT || 5000);




// setInterval(function() {
//   http.get('https://nodejschatbot.herokuapp.com/');
// }, 1800000); 

var token = '235548784:AAHkS-f8J4D4LTM527TldPFHRKt0DL1ykB4';
var bot = new TelegramBot(token, { polling: true });

  
bot.on('message', function (msg) {

  var chatId = msg.chat.id;

  bot.sendMessage(chatId,  msg.text);
  var newContact = '{"a":"b"}';
  db.collection(users).insertOne(newContact, function(err, doc) {
   
  });

});



mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
    // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

http.createServer(function(request, response){

  response.writeHead(response.statusCode.toString(),{'Content-Type':'application/json'});
  response.write(JSON.stringify({name: 'smartcitiesbot', ver:'0.0.1'}));
  response.end();
}).listen(port);

});