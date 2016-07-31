//influx package for node
var influx = require('influx');
var DATABASE_NAME = 'Kpi_Metrics';

//variables to index into array return from querying influx database
const indexIntoQueryArray = 0;
const indexIntoSeriesOfQueryArray = 0;
const indexForDateInQuery = 0;
const indexForMaxNumberInQueryArray = 1;
const indexForMaxValueInQueryArray = 2;
const indexForMinNumberInQueryArray = 3;
const indexForMinValueInQueryArray = 4;
const indexForNumberInQueryArray = 5;
const indexForValuesInQueryArray = 6;
const beginningIndexForTime = 11;
const endingIndexForTime = 19;
const notAvailable = -1;


//stucture to store influx data and pass to front end in format it can interprit 
function KPI(kpiName){
  this.kpi = kpiName;
  this.date = [];
  this.values = [];
  this.number = [];
  this.data = [];
  this.criticalValues = [];
  this.minForValues;
  this.maxForValues;
  this.minForNumber;
  this.maxForNumber;
};

//create influx instance and set options. sets the database
var client = influx({
  host : 'localhost',
  username : '',
  password : '',
  database : DATABASE_NAME
});    

//creates database if database with specified name does not exist 
client.createDatabase(DATABASE_NAME,function(err){
  if(err){
    throw err;
  }
})

/* function to compare values and metrics to thresholds specified and 
  adds to seperate array if value passes threshold. ignores logic if thresholds
  are below 0 */
function addCriticalValues(array, val, max, min, timeStamp){
  if(max >= 0){
    if(val >= max){
      return array.push({value: val, date: timeStamp, warn:"above"})
    }
  }
  if(min >= 0){
    if(val <= min){
      return array.push({value: val, date: timeStamp, warn:"below"})
    }
  }
}

exports.addMetrics = function(req,res){
  //values to store thresholds
  var minNumber;
  var maxNumber;
  var minValue;
  var maxValue;

  //checks for thresholds. if not exist sets them to -1 to be ignored
  if(req.body.minForNumber){
    minNumber = req.body.minForNumber;
  } else {
    minNumber = notAvailable;
  }

  if(req.body.maxForNumber){
    maxNumber = req.body.maxForNumber;
  } else {
    maxNumber = notAvailable;
  }

  if(req.body.minForValues){
    minValue = req.body.minForValues;
  } else {
    minValue = notAvailable;
  }

  if(req.body.maxForValues){
    maxValue = req.body.maxForValues;
  } else {
    maxValue = notAvailable;
  }
  //set object for point 
  var json = {
    maxForNumber: maxNumber,
    maxForValues: maxValue,
    minForNumber: minNumber,
    minForValues: minValue,
    number: req.body.number,
    values: req.body.values
  };
 	var tag = req.body.tag;

  //writes point into influx database
  client.writePoint(req.body.kpi, json,tag, function(err,data)  { 
    if(err){
      throw err;
    } else {
      res.json({message:"metrics saved/updated"})
    };
  })
};

//gets query from influx database and parses through array and objects and sets fields for KPI objects
exports.getMetrics = function(req,res){

  //data array holding list of KPI objects
  var data = [];
  //used parsedouble to ensure values being set to kpi objects were numbers for comparisons later.
  client.queryRaw('SELECT * FROM /.*/',function(err,measurements){
    if(err) {
      throw err;
    } else if(measurements[indexIntoSeriesOfQueryArray].series) {
      for(var i = 0;i < measurements[indexIntoQueryArray].series.length; i++){
        var kpi = new KPI(measurements[indexIntoQueryArray].series[i].name)
        for(var j = 0;j < measurements[indexIntoQueryArray].series[i].values.length; j++){
          kpi.date.push(
            measurements[indexIntoQueryArray].series[i].values[j][indexForDateInQuery]
            .substring(beginningIndexForTime,endingIndexForTime)
          )
          
          kpi.number.push(parseFloat(measurements[indexIntoQueryArray].series[i].values[j][indexForNumberInQueryArray]))
          kpi.values.push(parseFloat(measurements[indexIntoQueryArray].series[i].values[j][indexForValuesInQueryArray]))
          
          kpi.data.push({
            values:parseFloat(measurements[indexIntoQueryArray].series[i].values[j][indexForValuesInQueryArray]),
            date:measurements[indexIntoQueryArray].series[i].values[j][indexForDateInQuery].substring(beginningIndexForTime,endingIndexForTime)
          })
          
          kpi.minForValues = parseFloat(measurements[indexIntoQueryArray].series[i].values[j][indexForMinValueInQueryArray])
          kpi.maxForValues = parseFloat(measurements[indexIntoQueryArray].series[i].values[j][indexForMaxValueInQueryArray])
          kpi.minForNumber = parseFloat(measurements[indexIntoQueryArray].series[i].values[j][indexForMinNumberInQueryArray])
          kpi.maxForNumber = parseFloat(measurements[indexIntoQueryArray].series[i].values[j][indexForMaxNumberInQueryArray])
          addCriticalValues(
            kpi.criticalValues, 
            parseFloat(measurements[indexIntoQueryArray].series[i].values[j][indexForValuesInQueryArray]), 
            parseFloat(measurements[indexIntoQueryArray].series[i].values[j][indexForMaxValueInQueryArray]),
            parseFloat(measurements[indexIntoQueryArray].series[i].values[j][indexForMinValueInQueryArray]),
            measurements[indexIntoQueryArray].series[i].values[j][indexForDateInQuery]
              .substring(beginningIndexForTime,endingIndexForTime)
          )
       
        }
        data.push(kpi);
      }
      res.json(data)
      } else {
        res.json({message: "NO DATA"})
    }
  })
};

//gets individual metric, parses through the values and sets fields in kpi 
exports.getOneMetric = function(req,res){
  client.queryRaw('SELECT * FROM ' + req.params.kpi,function(err,measurements){
    if(err){
      throw err
    } else {
      var kpi = new KPI(measurements[indexIntoQueryArray].series[indexIntoSeriesOfQueryArray].name);
      for(var j = 0;j < measurements[indexIntoQueryArray].series[indexIntoSeriesOfQueryArray].values.length; j++){
        kpi.name = measurements[indexIntoQueryArray].series.name;
        kpi.date.push(
          measurements[indexIntoQueryArray].series[indexIntoSeriesOfQueryArray].values[j][indexForDateInQuery]
          .substring(beginningIndexForTime,endingIndexForTime)
        )
          kpi.number.push(parseFloat(measurements[indexIntoQueryArray].series[indexIntoSeriesOfQueryArray].values[j][indexForNumberInQueryArray]))
          kpi.values.push(parseFloat(measurements[indexIntoQueryArray].series[indexIntoSeriesOfQueryArray].values[j][indexForValuesInQueryArray]))
          kpi.data.push({
            values:parseFloat(measurements[indexIntoQueryArray].series[indexIntoSeriesOfQueryArray].values[j][indexForValuesInQueryArray]),
            date:measurements[indexIntoQueryArray].series[indexIntoSeriesOfQueryArray].values[j][indexForDateInQuery].substring(beginningIndexForTime,endingIndexForTime)
          })
          
          kpi.minForValues = parseFloat(measurements[indexIntoQueryArray].series[indexIntoSeriesOfQueryArray].values[j][indexForMinValueInQueryArray])
          kpi.maxForValues = parseFloat(measurements[indexIntoQueryArray].series[indexIntoSeriesOfQueryArray].values[j][indexForMaxValueInQueryArray])
          kpi.minForNumber = parseFloat(measurements[indexIntoQueryArray].series[indexIntoSeriesOfQueryArray].values[j][indexForMinNumberInQueryArray])
          kpi.maxForNumber = parseFloat(measurements[indexIntoQueryArray].series[indexIntoSeriesOfQueryArray].values[j][indexForMaxNumberInQueryArray])
          addCriticalValues(
            kpi.criticalValues, 
            parseFloat(measurements[indexIntoQueryArray].series[indexIntoSeriesOfQueryArray].values[j][indexForValuesInQueryArray]), 
            parseFloat(measurements[indexIntoQueryArray].series[indexIntoSeriesOfQueryArray].values[j][indexForMaxValueInQueryArray]),
            parseFloat(measurements[indexIntoQueryArray].series[indexIntoSeriesOfQueryArray].values[j][indexForMinValueInQueryArray]),
            measurements[indexIntoQueryArray].series[indexIntoSeriesOfQueryArray].values[j][indexForDateInQuery]
              .substring(beginningIndexForTime,endingIndexForTime)
          )
      }
      res.json(kpi)
    }
  })
};

