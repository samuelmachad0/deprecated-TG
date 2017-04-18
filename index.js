var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var TelegramBot = require('node-telegram-bot-api');
const PORT = process.env.PORT;
const URL = process.env.APP_URL;

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

const TOKEN = '235548784:AAHkS-f8J4D4LTM527TldPFHRKt0DL1ykB4';
// Bot
const botOptions = {
  webHook: {
    port: PORT
  }
};

const bot = new TelegramBot(TOKEN, botOptions);
bot.setWebHook(`${URL}/bot${TOKEN}`);

bot.on('message', function (msg) {
 var response = "Tente novamente!";
 var chatId = msg.chat.id;
 
 if (msg.text.match("🚫 Desativar Notificações")) {
  db.collection('users').remove({ _id: chatId });
  console.log("Removido");
 }
 if (msg.text.match("✅ Ativar Notificações")) {
    var user = {_id: chatId, name: msg.chat.first_name, type: "User"  };
    db.collection('users').update({_id:chatId}, {user}, {upsert:true, safe:false}, 
  function(err,data){
        if (err){
            console.log(err);
        }else{
            console.log("score succeded");
        }
    }
      );
    console.log("Incluir!");
 }
 if (msg.text.match("Verificar Leitura")) {
      db.collection('bot').findOne({ _id: '1' }, function(err, doc) {
        response = doc.status;
      });

 }

 db.collection('users').count({ _id: chatId }, function(err, countDocuments) {
    console.log(countDocuments);
    if(parseInt(countDocuments) > 0){
       var opts = {
            reply_to_message_id: msg.message_id,
            reply_markup: JSON.stringify({
              keyboard: [
                ['🚫 Desativar Notificações'],
                ['Verificar Leitura']]
            })
          };
            bot.sendMessage(chatId,  response ,opts);

    } else {
       var opts = {
            reply_to_message_id: msg.message_id,
            reply_markup: JSON.stringify({
              keyboard: [
                ['✅ Ativar Notificações'],
                ['Verificar Leitura']]
            })
          };
          bot.sendMessage(chatId,  response,opts);

    }
    });



  // var newContact =  msg;
  //   newContact.createDate = new Date();
  // db.collection(COLLECTION).insertOne(newContact, function(err, doc) {
   
  // });

});




app.get("/sensor/:value", function(req, res) {
//    var re = db.collection('bot').findOne();

  db.collection('bot').findOne({ _id: '1' }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      switch(req.params.value){
        case 1:  doc.status = "✅ ✅ ✅ Verde ✅ ✅ ✅";
      case 2:  doc.status =  "✴ ✴ ✴ Amarelo ✴ ✴ ✴"; break;
      case 3:  doc.status =  "🚫 🚫 🚫 Vermelho 🚫 🚫 🚫"; break;
      default:  doc.status =   "⚠ ⚠ ⚠ Calibrando... ⚠ ⚠ ⚠"; break;
      }
       doc.date = new Date();
     db.collection('bot').updateOne({_id: doc._id}, doc, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to update contact");
        } else {
          res.status(204).end();
        }
      });         
            res.status(200).json(doc);
    }
  });


  
  // sensor.status = req.params.valueSensor;

  // db.collection(COLLECTION).updateOne({_id: sensor._id}, sensor, function(err, doc) {
   
  // });
});