var got = require('got');
var random;

console.log("=====================================================================")
console.log("Running influx database test. To end press ctrl + c.")
console.log("Values will be stored in database specified.")
console.log("To empty database, run influx and run command drop database <dbname>.") 
console.log("Kpi_Metrics is default database name.")
console.log("=====================================================================")

setInterval(function(){
    
    random = Math.floor((Math.random() * 100) + 1);

    var logins = { "number":random, "values":random, "kpi":"LOGINS", 
        "minForValues":30, "maxForValues": 90, "minForNumber": 40, "maxForNumber": 80,
        "tag": ""
    }

    random = Math.floor((Math.random() * 100) + 1);

    var cpu_usage = { "number":random, "values":random, "kpi":"CPU_USAGE", 
        "minForValues":30, "maxForValues": 90, "minForNumber": 40, "maxForNumber": 80,
        "tag": ""
    }

    random = Math.floor((Math.random() * 100) + 1);

    var ram_usage = { "number":random, "values":random, "kpi":"RAM_USAGE", 
        "minForValues":30, "maxForValues": 90, "minForNumber": 40, "maxForNumber": 80,
        "tag": ""
    }

    random = Math.floor((Math.random() * 100) + 1);

    var server_load = { "number":random, "values":random, "kpi":"SERVER_LOAD", 
        "minForValues":30, "maxForValues": 90, "minForNumber": 40, "maxForNumber": 80,
        "tag": ""
    }

    random = Math.floor((Math.random() * 100) + 1);

    var card_payments = { "number":random, "values":random, "kpi":"CARD_PAYMENTS", 
        "minForValues":30, "maxForValues": 90, "minForNumber": 40, "maxForNumber": 80,
        "tag": ""
    }

    random = Math.floor((Math.random() * 100) + 1);

    var account_page_visited = { "number":random, "values":random, "kpi":"ACCOUNT_PAGE_VISITED", 
        "minForValues":30, "maxForValues": 90, "minForNumber": 40, "maxForNumber": 80,
        "tag": ""
    }

    got.post('http://localhost:8000/metric/add',{body:logins})
    

    got.post('http://localhost:8000/metric/add',{body:cpu_usage})
    

    got.post('http://localhost:8000/metric/add',{body:ram_usage})
    

    got.post('http://localhost:8000/metric/add',{body:server_load})
    

    got.post('http://localhost:8000/metric/add',{body:card_payments})
    

    got.post('http://localhost:8000/metric/add',{body:account_page_visited})
    
},2000)
