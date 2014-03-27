Objectif = require('../models/objectif');

//	http://localhost:9250/objectifs/update?id=c83d13598c295d93355e90d0440071e8&kg=17
//	http://localhost:9250/objectifs
//	http://localhost:9250/objectifs/add?month=1383318355&kg=19

//	http://www.timestampgenerator.com/
//	http://cozy.io/hack/cookbooks/data-system-odm.html
//	http://mesinfos.fing.org/espace-developpeurs/aller-plus-loin/cookbook#ajouter_doctype

module.exports.list = function(req, res) {
  Objectif.all(function(err, objectifs) {
    if(err != null) {
      res.send(500, "An error has occurred -- " + err);
    }
    else {
      data = objectifs;
      res.send(200, data);
    }
  });
};

module.exports.add = function(req, res) {
	var data = {
		month: new Date(req.param('month')*1000),
		kg: req.param('kg')
	};
	Objectif.add(data, function(err, objectif) {
		if(err != null) {
			res.send(500, "An error has occurred -- " + err);
		}
		else {
			res.send(200, objectif);
		}
	});
};

module.exports.updateObj = function(req, res) {
	var data = {
		id: req.param('id')!='' ? req.param('id') : null,
		kg: req.param('kg')
	};
	Objectif.updateObj(data, function(err, objectif) {
		if(err != null) {
			res.send(500, "An error has occurred -- " + err);
		}
		else {
			res.send(200, 'Objectif updated');
		}
	});
};

module.exports.deleteAll = function(req, res) {
	Objectif.deleteAll(function(err, objectif) {
		if(err != null) {
			res.send(500, "An error has occurred -- " + err);
		}
		else {
			res.send(200, 'All objectifs deleted');
		}
	});
};

module.exports.findOneObjectif = function(req, res) {
  Objectif.findOneObjectif(function(err, objectif) {
    if(err != null) {
      res.send(500, "An error has occurred -- " + err);
    }
    else {
      res.send(200, objectif);
    }
  });
};

module.exports.findLatest = function(req, res) {
  Objectif.findLatest(function(err, objectif) {
    if(err != null) {
      res.send(500, "An error has occurred -- " + err);
    }
    else {
    	if(objectif!=null){
      		res.send(200, objectif);
    	}
      	else{
      		res.send(200, [{id:'',kg:null}]);
      	}
    }
  });
};