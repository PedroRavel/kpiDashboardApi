# kpidashboard-api
API for visualizing metrics via dashboard. Works on desktop and mobile. 

##Store data using mongodb or influxdb

##Set Up 
Must have node.js and npm installed
https://nodejs.org/en/
Once node is installed, in terminal enter:
```
cd kpidashboard-api
npm install
```
##Influx setup
Download influx db
https://influxdata.com/downloads/#influxdb
After installation run influx db in terminal with:
```
influxd
```
Open seperate terminal and navigate to kpidashboard-api and enter:
```
node influxServer.js
```
###Note
Database named `Kpi_Metrics` will be created to store metric values after running `influxServer.js.` The name and configuration can be changed in `influxServer.js`

On brower navigate to http://localhost:8000
##Storing metrics for visualization.
Using the API `http://localhost:8000/metric/add` you can post json with necessary values:
```
{
	"kpi":kpi_name,
	"values": values_for_graph,
	"number": number_to_display,
	"tag": tag_name,
	"minForValues" : min_limit_for_values, //optional
	"maxForValues" : max_limit_for_values, //optional
	"minForNumber" : min_limit_for_number, //optional
	"maxForNumber" : max_limit_for_number  //optional
}
```
####Note
minForValues, maxForValues, minForNumber, maxForNumber are optional. Used to show alert if values or numbers exceeds or dips below specified threshold. Any combination of the four can be used or none at all. If any or all are omitted they will simply be ignored.
#####Example use of api:
```
curl -H "Content-Type: application/json" -X POST -d '{"kpi":"LOGINS_PER_HOUR",
"values":"1000","number":63,"tag":""}' http://localhost:8000/metric/add
```
An example is also provided in the example folder.
cd into example folder and in the terminal enter:
```
node influxExample.js
```

##Mongo setup
Download mongo db
https://www.mongodb.com/download-center#community
After installation run mongo db in terminal with:
```
mongod
```
Open seperate terminal and navigate to kpidashboard-api and enter:
```
node mongoServer.js
```
On brower navigate to http://localhost:3000
##Storing metrics for visualization.
Using the API `http://localhost:3000/metric/add` you can post json with necessary values:
```
{
	"kpi":kpi_name,
	"values": values_for_graph,
	"number": number_to_display,
	"minForValues" : min_limit_for_values, //optional
	"maxForValues" : max_limit_for_values, //optional
	"minForNumber" : min_limit_for_number, //optional
	"maxForNumber" : max_limit_for_number  //optional
}
```
####Note
minForValues, maxForValues, minForNumber, maxForNumber are optional. Used to show alert if values or numbers exceeds or dips below specified threshold. Any combination of the four can be used or none at all. If any or all are omitted they will simply be ignored.
#####Example use of api:
```
curl -H "Content-Type: application/json" -X POST -d '{"kpi":"LOGINS_PER_HOUR",
"values":"1000","number":63,"tag":""}' http://localhost:3000/metric/add
```
An example is also provided in the example folder.
cd into example folder and in the terminal enter:
```
node mongoExample.js
```