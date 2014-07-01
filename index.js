var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express()
  , port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/'));

var server = http.createServer(app);
server.listen(port);
//var WebSocketServer = require('ws').Server

/*var Datastore = require('nedb')
  , db = new Datastore({ filename: 'db/db.db', autoload: true });

db = {};
db.users = new Datastore('db/users.db');
db.users.loadDatabase();*/

console.log('http server listening on %d', port);

var wss = new WebSocketServer({server: server});
console.log('websocket server created');
wss.on('connection', function(ws) {
    var id = setInterval(function() {
        ws.send(JSON.stringify(new Date()), function() {  });
    }, 1000);

    console.log('websocket connection open');

    ws.on('close', function() {
        console.log('websocket connection close');
        clearInterval(id);
    });
});


	app.get('/yohook/', function(req, res){
		var username = req.query.username;
		/*var doc = { username: username, date: new Date()};
			db.users.insert(doc, function (err, newDoc) {  
	  			console.log(newDoc);
			});*/
			//socket.broadcast.emit('user', { username: username });
		res.send('hello '+username);
	});

	app.get('/', function(req, res){
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
	

