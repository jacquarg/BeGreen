begreen.controller('objectifs', ['$scope', '$location', '$q', 'Emission', function($scope, $location, $q, Emission) {
	$scope.objectif = [];
	$scope.objs = [];

	//Go grab the latest objectif, if it exists
	loadResource('objectifs/findLatest', function(data){
		setTimeout(function(){
			$scope.$apply(function(){
		        $scope.objectif = data[0];
		        $scope.currentConsumption = $scope.$parent.totalEmission;
		        $scope.percent = getPercent(parseFloat($scope.currentConsumption), parseFloat($scope.objectif.kg));
		      	$scope.percent = !isNaN($scope.percent) ? '('+$scope.percent+'%)' : '';
		      	$scope.libelle = $scope.objectif.kg!=null ? ' Kg de CO2' : ' - ';
		    });
	    }, 500);
	});

	//Go grab all the objectifs
	loadResource('objectifs', function(data){
		$.each(data, function(i, d){
			var promise = getStatus(d);
			promise.then(function(status){
				d.status = status;
			});
		});
		$scope.$apply(function(){
			if(data.length>0) $scope.objs = data;
	        else $('.noObjs').removeClass('noObjsHidden');
	    });
	});

	//Submit button (update current month)
	$('.addObj').unbind('click').on('click', function(){
		if(!isNaN($scope.objectif.kg)){
			var datas = {
				id: $scope.objectif.id,
				kg: $scope.objectif.kg
			}
			//Updates all the previous objectifs
			loadResource('objectifs/update', function(data){
				$scope.objectif = data;
				$('.ok').removeClass('okInvisible');
				$scope.$apply(function(){
			        var percent = getPercent(parseFloat($scope.currentConsumption), parseFloat($scope.objectif.kg));
			        $scope.percent = !isNaN(percent) ? '('+percent+'%)' : '';
			        $scope.libelle = $scope.objectif.kg!=null ? ' Kg de CO2' : ' - ';
			    });
			}, datas, 'get');
		}
	});

	//Live update objectif percent, only in front
	$scope.updatePercent = function(){
		var percent = getPercent(parseFloat($scope.currentConsumption), parseFloat($scope.objectif.kg));
		$scope.percent = !isNaN(percent) ? '('+percent+'%)' : '';
	}

	//Return a percent according to 2 values
	function getPercent(val1, val2){
		return Math.floor(100*parseFloat(val1)/parseFloat(val2), 2);
	}

	// Sends an ajax request according to the parameters,
	// then executes the given callback
	function loadResource(askedUrl, callback, data, method){
		data = typeof data !== 'undefined' ? data : null;
		method = typeof method !== 'undefined' ? method : 'get';
		$.ajax({
			url: askedUrl,
			data: data,
			method: method
		}).done(function objectifsGrabbed(data){
			callback(data);
		});
	}

	// Checks the status of the CO2 consumption
	function getStatus(objectif){
		var deferred = $q.defer();
		var month = new Date(objectif.month).getMonth();
		var year = new Date(objectif.month).getFullYear();
		var formatedDate = year+'-'+month;
		loadResource('totalForThisMonth/'+formatedDate, function(conso){
			objectif.effectif = Math.floor(conso[0], 3);
			deferred.resolve(compare(objectif.kg, Math.floor(conso[0])));
		});
		return deferred.promise;
	}

	// Compares the gap between the estimation & reality amount of CO2
	function compare(estimation, reality){
		var deferred = $q.defer();
		var eMinR = parseFloat(estimation) - parseFloat(reality);
		var percent;
		if(eMinR > 0){			// Better than expected
			percent = 100*estimation/reality;
			if(percent < 5) deferred.resolve('Pas mal');
			else if(percent < 100) deferred.resolve('Vraiment Bien !');
			else if(percent < 120) deferred.resolve('Excellent !');
			else if(percent < 140) deferred.resolve('Quelle exemplarité !');
			else deferred.resolve('Quelle légende, bravo !');
		}else if(eMinR < 0){	// Worst tha expected
			percent = Math.abs(100*estimation/reality);
			if(percent < 20) deferred.resolve('Lamentable...');
			else if(percent < 40) deferred.resolve('Catastrophique');
			else if(percent < 60) deferred.resolve('A changer rapidement !');
			else if(percent < 80) deferred.resolve('Peux mieux faire');
			else deferred.resolve('Dommage');
		}else{
			return 'Quelle précision !';
		}
		return deferred.promise;
	}

}]);