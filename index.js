var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var TelegramBot = require('node-telegram-bot-api');
var token = '235548784:AAHkS-f8J4D4LTM527TldPFHRKt0DL1ykB4';

var bot = new TelegramBot(token, { polling: true });
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



bot.on('message', function (msg) {
 var response = "Tente novamente!";
 var chatId = msg.chat.id;
 
 if (msg.text.match("🚫 Desativar Notificações")) {
  db.collection('users').remove({ _id: chatId });

  responseReply("Removido com sucesso 👍",msg);
  console.log("Removido");
//  exit(1);
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
    responseReply("Quando o sensor mudar de status você será notificado. 😃",msg);
    console.log("Incluir!");
 }
 if (msg.text.match("Verificar Leitura")) {
      db.collection('bot').findOne({ _id: '1' }, function(err, doc) {
        responseReply(doc.status,msg);
      });
 }


  // var newContact =  msg;
  //   newContact.createDate = new Date();
  // db.collection(COLLECTION).insertOne(newContact, function(err, doc) {
   
  // });

});

function sendShit(response,chatId, message_id = ''){
   db.collection('users').count({ _id: chatId }, function(err, countDocuments) {
    console.log(countDocuments);
    if(parseInt(countDocuments) > 0){
       var opts = {
            reply_to_message_id: message_id,
            reply_markup: JSON.stringify({
              keyboard: [
                ['🚫 Desativar Notificações'],
                ['Verificar Leitura']]
            })
          };
            bot.sendMessage(chatId,  response ,opts);

    } else {
       var opts = {
            reply_to_message_id: message_id,
            reply_markup: JSON.stringify({
              keyboard: [
                ['✅ Ativar Notificações'],
                ['Verificar Leitura']]
            })
          };
          bot.sendMessage(chatId,  response,opts);
    }
    });

}

function responseReply(response,msg){
  sendShit(response,msg.chat.id,msg.message_id);
}


app.get("/sensor/:value", function(req, res) {
//	  var re = db.collection('bot').findOne();

  db.collection('bot').findOne({ _id: '1' }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      
    	switch(req.params.value){
    	case '1':  doc.status = "✅ ✅ ✅ Verde ✅ ✅ ✅"; break;
			case '2':  doc.status =  "✴ ✴ ✴ Amarelo ✴ ✴ ✴"; break;
			case '3':  doc.status =  "🚫 🚫 🚫 Vermelho 🚫 🚫 🚫"; break;
			default:  doc.status =   "⚠ ⚠ ⚠ Calibrando... ⚠ ⚠ ⚠"; break;
    	}
    	 doc.date = new Date();
		 db.collection('bot').updateOne({_id: doc._id}, doc, function(err, doc) {
		  var cursor = db.collection('users').find();
      cursor.each(function(err, user) {
          sendShit(user.doc.name.", tivemos a seguinte mudança no sensor:" doc.status,user._id);
       });
		      res.status(204).end();
		    
		  });    			
		        res.status(200).json(doc);
    }
  });


  
  // sensor.status = req.params.valueSensor;

  // db.collection(COLLECTION).updateOne({_id: sensor._id}, sensor, function(err, doc) {
   
  // });
});