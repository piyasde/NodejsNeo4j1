/*
   // Testing Connection
	if (err)
        console.log(err);
	else
		console.log('Fine');
	
	//	Testing Single Node View
	graph.getNode(5, function (err, node) {
		console.log("Single Node View"); 
		console.log(err ? err : node.data.name); // print the node's properties
	});
	
	//Testing Multiple Node View
	graph.getNode([5, 6, 7], function (err, node) {
		console.log("Multiple Nodes View"); 
		for(i=0;i<node.length;i++)
		{
			console.log(err ? err : node[i].data.name); // print the node's properties
		}
	});
	
	//Cypher Query Execution
	
	//Findiing Nodes
	var query = [
		'start n = node(*) where has(n.entitytype) and n.entitytype = "user" return n'
	];
	graph.query(query.join('\n'), function (err, results) {
		if (err) {
			console.log(err);
			console.log(err.stack);
		}
		else {
			for (var i = 0; i < results.length; i++) {
				console.log(err ? err : results[i].n.data.name); // print the node's properties
			}
		}
	});
	
	//Findiing Relationships
	var query = [
		'start r = relationship(*) return r'
	];
	graph.query(query.join('\n'), function (err, results) {
		if (err) {
			console.log(err);
			console.log(err.stack);
		}
		else {
			for (var i = 0; i < results.length; i++) {
				console.log(err ? err : results[i].r.type	); // print the node's properties
			}
		}
	});
	
	//Creating Node 
	var query = [
		'CREATE (user {entitytype:{inputentitytype}, name : {inputname}}) return user;'
	];
	graph.query(query.join('\n'), { inputentitytype: 'user',inputname:'newuser' },function (err, results) {
		if (err) {
			console.log(err);
			console.log(err.stack);
		}
		else {
				console.log(results); // print the node's properties
		}
	});
	
	//Creating Relationship 
	var query = [
		'START user=node:node_auto_index(name = {inputusername}), company=node:node_auto_index(name = {inputcompany}) CREATE relation = user-[:WORKS_AT]->company return relation;'
	];
	graph.query(query.join('\n'), { inputusername: 'newuser',inputcompany:'IBM' },function (err, results) {
		if (err) {
			console.log(err);
			console.log(err.stack);
		}
		else {
				console.log(results); // print the node's properties
		}
	});
	
	//Findiing Nodes with some outbound relationship
	var query = [
		'START n=node:node_auto_index(name={inputuser}) MATCH (n)-[:WORKS_AT]->(x) RETURN x;'
	];
	graph.query(query.join('\n'), {inputuser : 'andrew'} ,function (err, results) {
		if (err) {
			console.log(err);
			console.log(err.stack);
		}
		else {
			console.log(err ? err : results[0].x.data.name); // print the node's properties
			//for (var i = 0; i < results.length; i++) {
			//	console.log(err ? err : results[i].n.data.name); // print the node's properties
			//}
		}
	});
	
	*/