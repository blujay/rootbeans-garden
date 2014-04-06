// web.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();
var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://test:pCM43qAb09WjXLXDxHaA@test.sb01.stations.graphenedb.com:24789');

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send('Hello World!');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});

var node = db.createNode({hello: 'world'});     // instantaneous, but...
node.save(function (err, node) {    // ...this is what actually persists.
    if (err) {
        console.error('Error saving new node to database:', err);
    } else {
        console.log('Node saved to database with id:', node.id);
    }
});