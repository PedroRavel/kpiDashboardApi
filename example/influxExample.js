var got = require('got');


setInterval(function(){
	var ran0 = Math.floor((Math.random() * 100) + 1);
	var ran1 = Math.floor((Math.random() * 100) + 1);
	var ran2 = Math.floor((Math.random() * 100) + 1);
	var ran3 = Math.floor((Math.random() * 100) + 1);
	var ran4 = Math.floor((Math.random() * 100) + 1);
	var ran5 = Math.floor((Math.random() * 100) + 1);
	var ran6 = Math.floor((Math.random() * 100) + 1);
	var ran7 = Math.floor((Math.random() * 100) + 1);
	var ran8 = Math.floor((Math.random() * 100) + 1);


var json0 = {

    "number":ran0,
    "values":ran0,
    "kpi":"LOGINS_PER_CENTURY",
    "minForValues":30,
    "maxForValues": 90,
    "minForNumber": 40,
    "maxForNumber": 80,
    "tag": ""
  
}
var json1 = {

    "number":ran1,
    "values":ran1,
    "kpi":"LOGINS_PER_YEAR",
    "minForValues":30,
    "maxForValues": 90,
    "minForNumber": 40,
    "maxForNumber": 80,
    "tag": ""
  
}
var json2 = {

    "number":ran2,
    "values":ran2,
    "kpi":"LOGINS_PER_MINUTE",
    "minForValues":30,
    "maxForValues": 90,
    "minForNumber": 40,
    "maxForNumber": 80,
    "tag": ""
  
}
var json3 = {

    "number":ran3,
    "values":ran3,
    "kpi":"LOGINS_PER_HOUR",
    "minForValues":30,
    "maxForValues": 90,
    "minForNumber": 40,
    "maxForNumber": 80,
    "tag": ""
  
}
var json4 = {

    "number":ran4,
    "values":ran4,
    "kpi":"LOGINS_PER_DAY",
    "minForValues":30,
    "maxForValues": 90,
    "minForNumber": 40,
    "maxForNumber": 80,
    "tag": ""
  
}
var json5 = {

    "number":ran5,
    "values":ran5,
    "kpi":"LOGINS_PER_SECOND",
    "minForValues":30,
    "maxForValues": 90,
    "minForNumber": 40,
    "maxForNumber": 80,
    "tag": ""
  
}
var json6 = {

    "number":ran6,
    "values":ran6,
    "kpi":"LOGINS_PER_DECADE",
    "minForValues":30,
    "maxForValues": 90,
    "minForNumber": 40,
    "maxForNumber": 80,
    "tag": ""
  
}
var json7 = {

    "number":ran7,
    "values":ran7,
    "kpi":"LOGINS",
    "minForValues":30,
    "maxForValues": 90,
    "minForNumber": 40,
    "maxForNumber": 80,
    "tag": ""
  
}
var json8 = {

    "number":ran8,
    "values":ran8,
    "kpi":"LOGINS_PER_MONTH",
    "minForValues":30,
    "maxForValues": 90,
    "minForNumber": 40,
    "maxForNumber": 100,
    "tag": ""
  
}
got.post('http://localhost:8000/metric/add',{body:json0})
  .then(function(response){
    console.log(response.body)
})
got.post('http://localhost:8000/metric/add',{body:json1})
  .then(function(response){
    console.log(response.body)
})
got.post('http://localhost:8000/metric/add',{body:json2})
  .then(function(response){
    console.log(response.body)
})
got.post('http://localhost:8000/metric/add',{body:json3})
  .then(function(response){
    console.log(response.body)
})
got.post('http://localhost:8000/metric/add',{body:json4})
  .then(function(response){
    console.log(response.body)
})
got.post('http://localhost:8000/metric/add',{body:json5})
  .then(function(response){
    console.log(response.body)
})
got.post('http://localhost:8000/metric/add',{body:json6})
  .then(function(response){
    console.log(response.body)
})
got.post('http://localhost:8000/metric/add',{body:json7})
  .then(function(response){
    console.log(response.body)
})
got.post('http://localhost:8000/metric/add',{body:json8})
  .then(function(response){
    console.log(response.body)
})

},2000)
