var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var metrics = require('./controller/mongoController');
var PORT = process.env.PORT || 3000;

//set two directories for ease of use
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('/metric/add', function(req, res) {
  metrics.addMetrics(req,res);
});

app.get('/metric/delete', function(req, res) {
  metrics.deleteAll(req,res);
});

app.get('/metric/list',function(req,res){
 metrics.getMetrics(req,res);
});
app.get('/metric/delete/:id',function(req,res){
  metrics.deleteMetrics(req,res);
});

app.get('/metric/find/:kpi',function(req,res){
  metrics.getOneMetric(req,res);
});

app.post('/metric/updateInfo/:kpi',function(req,res){
  metrics.updateInfo(req,res);
});

app.post('/metric/update/:id',function(req,res){
  metrics.updateMetrics(req,res);
});

http.listen(PORT, function() {
	console.log('App listening on port ' + PORT);
});
