begreen.controller('menu', ['$scope', '$location', 'Emission', function($scope, $location, Emission) {
    $scope.navLinks = [{
        Title: 'mes-emissions',
        LinkText: 'Mes émissions',
    }, {
        Title: 'analyse/evolution-temps',
        LinkText: 'Analyse'
    }, {
        Title: 'analyse/objectifs',
        LinkText: 'Objectifs'
    }, {
        Title: 'conseils',
        LinkText: 'Conseils'
    }];
    $scope.navClass = function (page) {
        var currentRoute = $location.path().substring(1) || 'home';
        return page === currentRoute ? 'active' : '';
    };

}]);