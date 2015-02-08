#!/usr/bin/env node

// This is a simple example sharejs server which hosts the sharejs
// examples in examples/.
//
// It demonstrates a few techniques to get different application behaviour.

require('coffee-script');
var express = require('express'),
	sharejs = require('./src'),
	hat = require('hat').rack(32, 36);

var argv = require('optimist').
  usage("Usage: $0 [-p portnum]").
  default('p', 3000).
  alias('p', 'port').
  argv;

var server = express();
//server.use(express.static(__dirname + '/./examples'));
server.use(express.static(__dirname));

var options = {
  db: {type: 'none'},
  browserChannel: {cors: '*'},
};

// Lets try and enable redis persistance if redis is installed...
try {
  require('redis');
  options.db = {type: 'redis'};
} catch (e) {}

console.log("ShareJS example server v" + sharejs.version);
console.log("Options: ", options);

var port = argv.p;

// Attach the sharejs REST and Socket.io interfaces to the server
sharejs.server.attach(server, options);

//server.get('/?',function(req,res,next){
//	res.writeHead(302,{location: '/table.html'});
//	res.end;
//});
server.listen(port);
console.log("Demos running at http://localhost:" + port);
 
process.title = 'sharejs'
process.on('uncaughtException', function (err) {
  console.error('An error has occurred. Please file a ticket here: https://github.com/josephg/ShareJS/issues');
  console.error('Version ' + sharejs.version + ': ' + err.stack);
});
