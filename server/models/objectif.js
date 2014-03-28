americano = require('americano');

module.exports = Objectif = americano.getModel('objectif', {
    'month': Date,
    'kg': String,
    'status': Number
});

Objectif.all = function(callback) {
    Objectif.request(
        "all",
        {
            'orderby': 'month',
            'limit': 7,
            'descending': false
        },
        function allObjectifsFound(err, instances) {
            if(!err){
                console.log('[OK] Objectifs found');
                if(instances.length>1){
                    instances.sort(function(a, b){
                        var dateA=new Date(a.month), dateB=new Date(b.month)
                        return dateA-dateB; //sort by date ascending
                    });
                    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                    var diffDays = Math.round(Math.abs((new Date().getTime() - new Date(instances[instances.length-1].month).getTime())/(oneDay)));
                    if(diffDays<30){
                        instances.splice((instances.length-1),1);   
                    }
                    callback(null, instances);
                }else{
                    callback(null, null);
                }
            }else{
                console.log('[ERR] No objectif found');
                callback(err);
            }
        }
    );
};

Objectif.getAll = function(callback) {
    Objectif.request(
        "all",
        {
            'descending': false
        },
        function allObjectifsFound(err, instances) {
            if(!err){
                console.log('[OK] Objectifs found');
                instances.sort(function(a, b){
                    var dateA=new Date(a.month), dateB=new Date(b.month)
                    return dateA-dateB; //sort by date ascending
                });
                callback(null, instances);
            }else{
                console.log('[ERR] No objectif found');
                callback(err);
            }
        }
    );
};

Objectif.findOneObjectif = function(idGiven, callback) {
    Objectif.request(
        "all",
        {
            'limit': 1,
            'key': {id:idGiven}
        },
        function objectifFound(err, instance) {
            if(!err){
                console.log('[OK] Found one objectif');
                callback(null, instance);
            }else{
                console.log('[ERR] Finding one objectif');
                callback(err);
            }
        }
    );
};

Objectif.findLatest = function(callback) {
    Objectif.request(
        "all",
        {
            'descending': true,
            'limit': 1
        },
        function objectifFound(err, instance) {
            if(!err){
                if(instance.length > 0){
                    console.log('[OK] Last objectif found');
                    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                    var diffDays = Math.round(Math.abs((new Date().getTime() - new Date(instance[0].month).getTime())/(oneDay)));
                    if(diffDays<30){
                        callback(null, instance);
                    }else{
                        callback(null, null);
                    }
                }else{
                    callback(null, null);
                }
            }else{
                console.log('[ERR] Finding one objectif');
                callback(err);
            }
        }
    );
};

Objectif.add = function(data, callback){
    Objectif.create({
        month: data.month,
        kg: data.kg,
        status: 1
    }, function objAdded(err, created){
        if(!err){
            console.log('[OK] Objectif saved');
            callback(null, created);
        }else{
            console.log('[ERR] Failed saving objectif');
            callback(err);
        }
    });
}

Objectif.updateObj = function(params, callback){
    if(params.id!=null){
        Objectif.find(params.id, function objFound(err, objectif) {
            if(!err){
                objectif.kg = params.kg;
                objectif.save(function(err) {
                    console.log('[OK] Objectif updated');
                    callback(null, objectif);
                });
            }else{
                console.log('[ERR] Failed updating objectif');
                callback(err);
            }
        });
    }else{
        Objectif.create({
            month: new Date().getTime(),
            kg: params.kg,
            status: 1
        }, function objCreated(err, objectif){
            if(!err){
                console.log('[OK] New objectif added');
                callback(null, objectif);
            }else{
                console.log('[ERR] Failed saving objectif');
                callback(err);
            }
        });
    }
}

Objectif.deleteAll = function(callback){
    Objectif.request(
        "all",
        {},
        function allObjectifsFound(err, instances) {
            for(var i=0; i<instances.length; i++){
                instances[i].destroy(function deleted(err){
                    if(!err) console.log('[OK] Objectif deleted');
                    else console.log('[ERR] Objectif failed deleting');
                })
            }
            callback(null, 'DONE');
        }
    );
}