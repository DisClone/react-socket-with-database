var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var connectionString = 'postgress://postgres:unnamed1@localhost/postgres';
var massiveInstance = massive.connectSync({connectionString : connectionString});
var app = express();
app.set('db', massiveInstance);


var db = app.get('db');

app.use(cors({origin: 'http://127.0.0.1:55457'}));
app.use(bodyParser.json());
app.use(express.static('../public'));

var http = require('http').Server(app);

var io = require('socket.io')(http);

io.on('connection', function(socket) {
  console.log('we have a connection');
  socket.on('new-message', function(msg) {
    console.log(msg);
    io.emit('recieve-message', msg);
    db.new_test_msg([msg.body, msg.user], function(err, response) {
      console.log(err, response);
    });
    db.get_all_msgs(function(err, response) {
      console.log(response);
    });
  });
  socket.on('test', function() {
    console.log('Mounted');
  });
});

app.get('/api/test_msgs', function(req, res, next) {
  db.get_all_msgs(function(err, response) {
    console.log(err, response);
    res.set(200).json(response);
  });
});

app.get('/api/test', function(req, res, next) {
  res.set(200).json("We got it booooiiiiiiiz");
  console.log(res);
});

http.listen('3000', function() {
  console.log('listening on port 3000');
});
