var waitstaffApp = angular.module('waitstaffApp', ['ngRoute','ngAnimate']);
waitstaffApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/home.html',
        controller: 'waitCtrl',
    })
    .when('/new-meal', {
        templateUrl: 'templates/new-meal.html',
        controller: 'waitCtrl'
    })
    .when('/my-earnings', {
        templateUrl: 'templates/my-earnings.html',
        controller: 'waitCtrl'
    })
    .otherwise('/');
})
.run(function($rootScope, $location, $timeout) {
    $rootScope.$on('$routeChangeEror', function() {
        $locatio.path('/error');
    });
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        $timeout(function () {
            $rootScope.isLoading = false;
        }, 1000);
    });
});
waitstaffApp.controller('waitCtrl', [function (){
    var $scope = this;
    //Make an empty object to enable cancel().
    $scope.cancelValue = {};

    //set the meal counter to 0 && tipTotal to 0.
    $scope.numOfMeal = 0;
    $scope.tipTotal = 0;

    $scope.submit = function () {
        // Declare of basic functionality variables.
        var tip = $scope.input.tip;
        var base = $scope.input.mealPrice;
        var tax = $scope.input.tax;

        //Calculate sub Total
        $scope.subTotal = base + (base * (tax/100));
        // Calculate totalAll dvs (subTotal & tip).
        $scope.totalAll = $scope.subTotal + ($scope.subTotal * (tip/100));
        // Calculate Tip
        $scope.tipping = $scope.subTotal * (tip/100);
        // When form is submitted meal counter increments by 1.
        $scope.numOfMeal ++;
        // Calculate the tipTotal.
        $scope.tipTotal = $scope.tipTotal + $scope.tipping;
        // Calculate the average between tipTotal & numOfMeal.
        $scope.averageTip = $scope.numOfMeal / $scope.tipTotal;
    };
    $scope.cancel = function () {
        $scope.input = angular.copy($scope.cancelValue);
    };
    $scope.reset = function () {
        $scope.input = angular.copy($scope.cancelValue);
        $scope.subTotal = angular.copy($scope.cancelValue);
        $scope.totalAll = angular.copy($scope.cancelValue);
        $scope.tipping = angular.copy($scope.cancelValue);
        $scope.numOfMeal = 0;
        $scope.tipTotal = 0;
        $scope.averageTip = angular.copy($scope.cancelValue);
    };
}]);
