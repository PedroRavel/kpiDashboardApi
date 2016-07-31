var express = require('express');
var bodyParser = require('body-parser');
var metrics = require('./controller/influxController')
var app = express();
var http = require('http').Server(app);


var PORT = process.env.PORT || 8000;

//set two directories for ease of use
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.post('/metric/add', function(req, res) {
  metrics.addMetrics(req,res);
});

app.get('/metric/list', function(req,res){
  metrics.getMetrics(req,res);
  
});

app.get('/metric/find/:kpi',function(req,res){
  metrics.getOneMetric(req,res);
});

app.listen(PORT, function() {
	console.log('App listening on port ' + PORT);
});

