var neo4j = require('neo4j-js');
var application_root = __dirname,
    express = require("express"),
	path = require("path"),
	HTTPStatus = require('http-status');
	
var config = require('./config');	
	
var app = express();
var neo4jurl = process.env.NEO4J_URL ;
neo4jurl = neo4jurl +'/db/data/';

var query = [ 'START me=node:node_auto_index(name={inputusername}) MATCH me<--friend<--friend_of_friend where (friend_of_friend.entitytype={inputentitytype}) RETURN friend_of_friend;'	];
var insertquery = [ 'CREATE (user {entitytype:{inputentitytype}, name : {inputname}}) return user;' ];
var queryforallrelation = [ 'start n = node:node_auto_index(name={inputusername}) match(n)--(x)  return x;'];

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
	res.set({'Content-Type': 'text/json'});
	username = req.params.username;
	type = 'user';
	neo4j.connect(neo4jurl, function (err, graph) {
		
			graph.query(query.join('\n'), {inputusername : username, inputentitytype :type} ,function (err, results) {	
				if (err) {
					res.send(HTTPStatus.INTERNAL_SERVER_ERROR,'Internal Server Error');
				}
				else {
					res.send(HTTPStatus.OK,JSON.stringify(results));
				}
			});	
	});
});

app.get('/insertuser/:username', function (req, res){
	res.set({'Content-Type': 'text/json'});
	username = req.params.username;
	type = 'user';
	neo4j.connect(neo4jurl, function (err, graph) {
			graph.query(insertquery.join('\n'), {inputname : username, inputentitytype :type} ,function (err, results) {	
				if (err) {
					res.send(HTTPStatus.INTERNAL_SERVER_ERROR,'Internal Server Error');
				}
				else {
					res.send(HTTPStatus.OK,JSON.stringify(results));
				}
			});	
	});
});

//Cypher Query with Javascript Callback Example

function neo4jQuery(neo4jurl, query, parameters, giveresults) {
	neo4j.connect(neo4jurl, function (err, graph) {
		graph.query(query.join('\n'), {inputusername : 'andrew'} ,function (err, results) {	
			if (err) {
				giveresults(HTTPStatus.INTERNAL_SERVER_ERROR);
			}
			else {
				giveresults(JSON.stringify(results));
			}
		});	
	});
}

app.get('/allrelations/:username', function (req, res){
	res.set({'Content-Type': 'text/json'});
	username = req.params.username;
	parameters = {inputusername : username};
	neo4jQuery(neo4jurl, queryforallrelation, parameters, function(results){
		res.send(results);
	});
});



app.listen(1212);