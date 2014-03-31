Objectif = require('../models/objectif');

module.exports.list = function(req, res) {
  Objectif.all(function(err, objectifs) {
    if(err != null) {
      res.send(500, "An error has occurred -- " + err);
    }
    else {
    	if(objectifs!=null){
			res.send(200, objectifs);
		}else{
			res.send(200, {});
		}
    }
  });
};

module.exports.getAll = function(req, res) {
  Objectif.getAll(function(err, objectifs) {
    if(err != null) {
      res.send(500, "An error has occurred -- " + err);
    }
    else {
		res.send(200, objectifs);
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
			res.send(200, objectif);
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
