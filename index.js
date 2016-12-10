"use strict";

var http = require("http");

var port = (process.env.PORT || 5000);
require('./bot.js'){};

http.createServer(function(request, response){

  response.write(200,{'Content-Type':'application/json'});
  response.write(JSON.stringify({name: 'smartcitiesbot', ver:'0.0.1'}));
  response.end();
}).listen(port);



