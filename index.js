var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express()
  , port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/'));

var server = http.createServer(app);
server.listen(port);

var Datastore = require('nedb')
  , db = new Datastore({ filename: 'db/db.db', autoload: true });

db = {};
db.users = new Datastore('db/users.db');
db.users.loadDatabase();

console.log('http server listening on %d', port);

var wss = new WebSocketServer({server: server});
console.log('websocket server created');

wss.broadcast = function(data) {
    for (var i in this.clients)
        this.clients[i].send(data);
    console.log('broadcasted: %s', data);
};

	app.get('/yohook/', function(req, res){
		var username = req.query.username;
		var doc = { username: username, date: new Date()};
			db.users.insert(doc, function (err, newDoc) {  
	  			console.log(newDoc);
			});
			
			wss.on('connection', function(ws) {

			    wss.broadcast(JSON.stringify(username), function() {  });
			    console.log(username + 'OK');
		
			});
		res.sendfile(__dirname + '/index.html');
	});

	app.get('/', function(req, res){
		wss.on('connection', function(ws) {
			});
		 res.sendfile(__dirname + '/index.html');
	});

	app.get('/all/fdsfdfdsTyrez', function (req, res) {
		db.users.find({}, function (err, docs) {
			console.log(docs);
		});
	});
	app.get('/remove/fdfh86YVYUFyy', function (req, res) { 
		db.users.remove({}, { multi: true }, function (err, numRemoved) {
		  console.log(numRemoved);
		});
	});
	

