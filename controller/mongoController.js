var Metrics = require('../models/metrics');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017");

//functions to modify date returned from date function 
function addLeadingZero(num) {
	return (num <= 9) ? ("0" + num) : num;
}

function createDate(){
	currDate = new Date();
	date = addLeadingZero(currDate.getHours()) + ":" +
  addLeadingZero(currDate.getMinutes()) + ":" +
  addLeadingZero(currDate.getSeconds());
  return date;
}

/* function to compare values and metrics to thresholds specified and 
  adds to seperate array if value passes threshold. ignores logic if thresholds
  are below 0 */
function addCriticalValues(array, val, max, min){
	if(max >= 0){
		if(val >= max){
			return array.push({value: val, date: createDate(), warn:"above"})
		}
	}
	if(min >= 0){
		if(val <= min){
			return array.push({value: val, date: createDate(), warn:"below"})
		}
	}
}

/*function to add metrics to database. if metric doesnt exist,
 create and adds it to database with values. 
 if metrics already exist updates them*/

exports.addMetrics = function(req,res){
	Metrics.findOne({'kpi':req.body.kpi}, function(error,metrics){
		if(error) {
		 res.send(error);
		} else if(!metrics) {
			var newMetrics = new Metrics();
			newMetrics.kpi = req.body.kpi;
			newMetrics.number.push(req.body.number);
			newMetrics.minForValues = req.body.minForValues;
			newMetrics.maxForValues = req.body.maxForValues;
			newMetrics.minForNumber = req.body.minForNumber;
			newMetrics.maxForNumber = req.body.maxForNumber;
			//checks if values passed in are array of values
			if(Array.isArray(req.body.values)){
				for(var i = 0; i < req.body.values.length; i++){
					newMetrics.values.push(req.body.values[i]);
					newMetrics.date.push(createDate());
					newMetrics.data.push({values:req.body.values[i],date:createDate()})
					addCriticalValues(newMetrics.criticaValues, req.body.values[i], req.body.maxForValues, req.body.minForValues)
					
				}
			} else {
					newMetrics.date.push(createDate());
					newMetrics.values.push(req.body.values);
					newMetrics.data.push({values:req.body.values,date:createDate()})
					addCriticalValues(newMetrics.criticalValues, req.body.values, req.body.maxForValues, req.body.minForValues)

			}

	 		newMetrics.save(function(err,resp){
	 			if(error){
	 				res.send(err);
	 			} else {
	 				res.send({message: "Metrics saved successfully"});
	 			}
			});
		} else {
			metrics.number.push(req.body.number);
			metrics.minForValues = req.body.minForValues;
			metrics.maxForValues = req.body.maxForValues;
			metrics.minForNumber = req.body.minForNumber;
			metrics.maxForNumber = req.body.maxForNumber;
			if(Array.isArray(req.body.values)){
				for(var i = 0; i < req.body.values.length; i++){
					metrics.values.push(req.body.values[i]);
					metrics.date.push(createDate());
					metrics.data.push({values:req.body.values[i],date:createDate()})
					addCriticalValues(metrics.criticalValues, req.body.values[i], req.body.maxForValues, req.body.minForValues)
					
				}
			} else {
					metrics.date.push(createDate());
					metrics.values.push(req.body.values);
					metrics.data.push({values:req.body.values,date:createDate()})
					addCriticalValues(metrics.criticalValues, req.body.values, req.body.maxForValues, req.body.minForValues)

			}
	 		metrics.save(function(err,resp){
	 		if(error) {
	 				res.send(err);
	 			} else {
	 				res.send({message: "Metrics updated successfully"});
	 			}
			});	
		}
	})
};


//returns all metrics
exports.getMetrics = function(req,res){
	Metrics.find({},function(err,data){
		if(err){
			res.send(err);
		} else {
			return res.json(data);
		}
	})
}

//returns metric based on kpi name
exports.getOneMetric = function(req,res){
	Metrics.findOne({'kpi':req.params.kpi},function(err,data){
		if(err){
			res.send(err);
		} else {
			return res.json(data);
		}
	})
}

//deletes individual metric
exports.deleteMetrics = function(req,res){
	Metrics.remove({_id:req.params.id}, function(err){
		if(err){	
			res.send();
		} else {
			res.json({message: "Metrics successfully deleted"});
		}
	})
}

//deletes all metrics
exports.deleteAll = function(req,res){
	Metrics.remove({},function(err){
		if(err){
			res.send();
		}else{
			res.json({message:"All Deleted"})
		}
	})
}
