var app = angular.module('myModule', [])
app.controller('myCtrl', function ($scope, $http, $location) {
    var baseUrl = $location.protocol() + '://' + $location.host() + ':' + $location.port() + "/script/";
    $scope.scripts = [];

    $scope.registerTougle = function (index) {
        if ($scope.scripts[index].isRegister == true) {
            $scope.scripts[index].btnTextRegister = 'Register';
            $scope.scripts[index].isRegister = false;
        } else {
            $scope.scripts[index].btnTextRegister = 'Unregister';
            $scope.scripts[index].isRegister = true;
        }
    }

    $scope.execScript = function (index) {
        $http.get(baseUrl + $scope.scripts[index].key)
            .then(function (response) {
                $scope.scripts[index].result = response.data;
            });

    }

    //build data for UI
    $http.get(baseUrl)
        .then(function (response) {
            $scope.scripts = response.data;
            $scope.scripts.forEach(function (script) {
                script.isRegister = false;
                script.btnTextRegister = 'Register';
                script.result = '';
                script.btnTextExec = 'Execute';
                console.log(JSON.stringify($scope.scripts))
            })
        });
});