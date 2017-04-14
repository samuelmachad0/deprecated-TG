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
  // Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});


  var chatId = msg.chat.id;

  bot.sendMessage(chatId,  msg.text);
});



http.createServer(function(request, response){

  response.writeHead(response.statusCode.toString(),{'Content-Type':'application/json'});
  response.write(JSON.stringify({name: 'smartcitiesbot', ver:'0.0.1'}));
  response.end();
}).listen(port);