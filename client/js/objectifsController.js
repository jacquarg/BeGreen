begreen.controller('objectifs', ['$scope', '$location', 'Emission', function($scope, $location, Emission) {
	$scope.objectif = [];
	$scope.objs = [];

	loadResource('objectifs/findLatest', function(data){
		$scope.$apply(function(){
	        $scope.objectif = data[0];
	    });
	});

	loadResource('/objectifs', function(data){
		$.each(data, function(i, d){
			d.status = getStatus(d.status);
		});
		$scope.$apply(function(){
	        $scope.objs = data;
	    });
	});

	$('.btnAjoutObjectif').on('click', function(e){
		e.preventDefault();
		loadResource('/objectifs/update', function(data){

		}, datas, 'get')
	});

}]);

function loadResource(askedUrl, callback, data, method){
	$.ajax({
		url: askedUrl
	}).done(function objectifsGrabbed(data){
		callback(data);
	});
}

function getStatus(status){
	switch(status){
		case 1: return 'Très bien'; break;
		case 2: return 'Bonne estimation'; break;
		case 3: return 'Vraiment pas mal'; break;
		case 4: return 'Estimation médiocre'; break;
		case 5: return 'Mauvaise estimation'; break;
		default: return 'Pas mal'; break;
	}
}