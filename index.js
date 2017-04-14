var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var TelegramBot = require('node-telegram-bot-api');

var COLLECTION = "users";

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

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

// CONTACTS API ROUTES BELOW

var token = '235548784:AAHkS-f8J4D4LTM527TldPFHRKt0DL1ykB4';
var bot = new TelegramBot(token, { polling: true });

  
bot.on('message', function (msg) {

  var chatId = msg.chat.id;

  bot.sendMessage(chatId,  msg.text);
  var newContact =  msg;
    newContact.createDate = new Date();
  db.collection(COLLECTION).insertOne(newContact, function(err, doc) {
   
  });

});


app.get("/sensor/:id", function(req, res) {
//  var re = db.collection('bot').findOne();

  db.collection('bot').findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      console.log(doc.status);
    }
  });

  
  // sensor.status = req.params.valueSensor;

  // db.collection(COLLECTION).updateOne({_id: sensor._id}, sensor, function(err, doc) {
   
  // });
});