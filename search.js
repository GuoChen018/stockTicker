const MongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://guoc0818:GUOmongodb21@cluster0.pjoxp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: true })); 

var iName, iStock = "";

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port${port}`);
});

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
	if (err) return console.error(err)
  	console.log('Connected to Database')
  
    var dbo = db.db("assignment14");
	var coll = dbo.collection('companies');
	console.log("before find");	

	app.post('/process', (req, res) => {
		iName = req.body.the_name; 
		iStock = req.body.stockTicker; 

		theQuery1 = {name: iName}; 
		theQuery2 = {code: iStock};	

		var total;
		if (iName != "") {
			coll.find(theQuery1).toArray(function(err, items) {
				if (err) { 
					console.log("Error: " + err); 
				} 
				else 
				{ 
					for (i=0; i<items.length; i++) {
						console.log("Company: " + items[i].name + " (" + items[i].code + ") ");	
					}
				} 
				db.close(); 
				console.log("after close"); 
			});  //end find	
		}

		else{
			coll.find(theQuery2).toArray(function(err, items) {
				if (err) {
					console.log("Error: " + err);
				} 
				else 
				{ 
					for (i=0; i<items.length; i++)
						console.log("Company: " + items[i].name + " (" + items[i].code + ") ");	
				} 
				db.close(); 
				console.log("after close"); 
			});  //end find	
		}
		

	  console.log("after close");
	}); 	
});  //end connect





