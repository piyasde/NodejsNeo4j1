var neo4j = require('neo4j-js');
var application_root = __dirname,
    express = require("express"),
	path = require("path");
	
var app = express();

// Config

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/api', function (req, res) {
  res.send('REST API is running');
});


app.get('/friendoffriend/:username', function (req, res){
	res.writeHead(200, {'Content-Type': 'text/json'});
	//res.end( req.params.username);
	username = req.params.username;
	type = 'user';
	neo4j.connect('http://localhost:7474/db/data/', function (err, graph) {
		
		var query = [
				'START me=node:node_auto_index(name={inputusername}) MATCH me<--friend<--friend_of_friend where (friend_of_friend.entitytype={inputentitytype}) RETURN friend_of_friend;'
			];
			graph.query(query.join('\n'), {inputusername : username, inputentitytype :type} ,function (err, results) {	
				if (err) {
					console.log(err);
				}
				else {
					res.end(JSON.stringify(results));
				}
			});	
	});
});

app.get('/insertuser/:username', function (req, res){
	res.writeHead(200, {'Content-Type': 'text/json'});
	//res.end( req.params.username);
	username = req.params.username;
	type = 'user';
	neo4j.connect('http://localhost:7474/db/data/', function (err, graph) {
		
		var query = [
				'CREATE (user {entitytype:{inputentitytype}, name : {inputname}}) return user;'
			];
			graph.query(query.join('\n'), {inputname : username, inputentitytype :type} ,function (err, results) {	
				if (err) {
					console.log(err);
				}
				else {
					res.end(JSON.stringify(results));
				}
			});	
	});
});


app.listen(1212);