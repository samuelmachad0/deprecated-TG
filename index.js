var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var TelegramBot = require('node-telegram-bot-api');
var token = '235548784:AAHkS-f8J4D4LTM527TldPFHRKt0DL1ykB4';
var bot = new TelegramBot(token, { polling: true });
var app = express();
var Moment = require('moment-timezone');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
var db;

mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = database;
  console.log("Banco de dados pronto para uso");

  // Inicialização do servidor.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("Aplicação rodando na porta ", port);
  });
});

bot.on('message', function (msg) {
 
  readMessage(msg);
  
});

function readMessage(msg){
    switch(msg.text){
    case '🚫 Desativar Notificações': 
      db.collection('users').remove({ _id: msg.chat.id }, function(err, doc) {
        responseReply("Removido com sucesso 👍",msg);
      });
    break;
    case '✅ Ativar Notificações':
      var user = {_id: msg.chat.id, name: msg.chat.first_name, type: "User"  };
      db.collection('users').update({_id:msg.chat.id}, {user}, {upsert:true, safe:false}, function(err, doc) {
        responseReply("Quando o sensor mudar de status você será notificado. 😃",msg);
      });
    break;
    case 'Verificar Leitura':
      db.collection('bot').findOne({ _id: '1' }, function(err, doc) {
        responseReply(doc.status+ " a última leitura foi em " + doc.date,msg);
      }); 
    break;
    case '/start':
      responseReply("Olá! Vamos começar?",msg);
    break;
    default:
      responseReply("Tente novamente!",msg);
    break;     
  }
}
function send(response,chatId, message_id){
  db.collection('users').count({ _id: chatId }, function(err, countDocuments) {
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
  send(response,msg.chat.id,msg.message_id);
}


app.get("/sensor/:value/:token", function(req, res) {
  db.collection('bot').findOne({ _id: '1' }, function(err, doc) {
    if(req.params.token != doc.token){
      res.send( { message: 'Token inválido', status: 'error'} );
      return 0;
    }
    var status;
    switch(req.params.value){
    	case '1':  status = "✅ ✅ ✅ Verde ✅ ✅ ✅"; break;
  		case '2':  status =  "✴ ✴ ✴ Amarelo ✴ ✴ ✴"; break;
  		case '3':  status =  "🚫 🚫 🚫 Vermelho 🚫 🚫 🚫"; break;
  		default:   status =   "⚠ ⚠ ⚠ Calibrando... ⚠ ⚠ ⚠"; break;
    }
    doc.status = status;
    doc.date = new Date();
  	db.collection('bot').updateOne({_id: doc._id}, doc, function(err, doc) {
    	var cursor = db.collection('users').find();
      cursor.each(function(err, user) {
        //if(user != null && user._id == '153878723'){
        if(user != null){  
          send("Houve a seguinte mudança no sensor: " +   status,user._id,0);
        }
       });
      res.send( { message: 'Realizado com sucesso', status: 'success'} );
      return 0;
  	});    			
  });
});