var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

/*var Datastore = require('nedb')
  , db = new Datastore({ filename: 'db/db.db', autoload: true });

db = {};
db.users = new Datastore('db/users.db');
db.users.loadDatabase();*/

app.set('port', process.env.PORT || 8080);

io.on('connection', function (socket) {

	app.get('/yohook/', function(req, res){
		var username = req.query.username;
		/*var doc = { username: username, date: new Date()};
			db.users.insert(doc, function (err, newDoc) {  
	  			console.log(newDoc);
			});*/
			socket.broadcast.emit('user', { username: username });
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
	

});

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});