"use strict";

var http = require("http");

var port = (process.env.PORT || 5000);
require('./bot.js')();

http.createServer(function(request, response){

  response.writeHead(response.statusCode.toString(),{'Content-Type':'application/json'});
  response.write(JSON.stringify({name: 'smartcitiesbot', ver:'0.0.1'}));
      if(request.method == "GET")
        {
            response.end("received GET request.")
        }
    else if(request.method == "POST")
        {
            response.end("received POST request.");
        }  
}).listen(port);



