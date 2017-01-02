const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

http.listen(5000, '127.0.0.1');

require('./app/routes.js')(app);
require('./app/server.js')(io);
console.log('[INFO] Server running on port 5000');

