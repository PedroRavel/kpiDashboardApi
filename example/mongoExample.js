var got = require('got');
var random;


setInterval(function(){
    
    random = Math.floor((Math.random() * 100) + 1);

    var logins = { "number":random, "values":random, "kpi":"LOGINS", 
        "minForValues":30, "maxForValues": 90, "minForNumber": 40, "maxForNumber": 80
    }

    random = Math.floor((Math.random() * 100) + 1);

    var cpu_usage = { "number":random, "values":random, "kpi":"CPU_USAGE", 
        "minForValues":30, "maxForValues": 90, "minForNumber": 40, "maxForNumber": 80
    }

    random = Math.floor((Math.random() * 100) + 1);

    var ram_usage = { "number":random, "values":random, "kpi":"RAM_USAGE", 
        "minForValues":30, "maxForValues": 90, "minForNumber": 40, "maxForNumber": 80
    }

    random = Math.floor((Math.random() * 100) + 1);

    var server_load = { "number":random, "values":random, "kpi":"SERVER_LOAD", 
        "minForValues":30, "maxForValues": 90, "minForNumber": 40, "maxForNumber": 80
    }

    random = Math.floor((Math.random() * 100) + 1);

    var card_payments = { "number":random, "values":random, "kpi":"CARD_PAYMENTS", 
        "minForValues":30, "maxForValues": 90, "minForNumber": 40, "maxForNumber": 80
    }

    random = Math.floor((Math.random() * 100) + 1);

    var account_page_visited = { "number":random, "values":random, "kpi":"ACCOUNT_PAGE_VISITED", 
        "minForValues":30, "maxForValues": 90, "minForNumber": 40, "maxForNumber": 80
    }

    got.post('http://localhost:3000/metric/add',{body:logins})
    

    got.post('http://localhost:3000/metric/add',{body:cpu_usage})
    

    got.post('http://localhost:3000/metric/add',{body:ram_usage})
    

    got.post('http://localhost:3000/metric/add',{body:server_load})
    

    got.post('http://localhost:3000/metric/add',{body:card_payments})
    

    got.post('http://localhost:3000/metric/add',{body:account_page_visited})
    
},2000)
