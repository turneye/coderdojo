(function () {
    'use strict';

    angular
        .module('App')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '$ionicPopover'];
    function AppController($scope, $ionicPopover) {
        
        $scope.items = [
            {
                color: "#E47500",
                icon: "ion-android-contact",
                title: "ME!",
                view: "templates/me.html"
            },
            {
                color: "#5AD863",
                icon: "ion-home",
                title: "My Home",
                view: "templates/myhome.html"
            },
            {
                color: "#F8E548",
                icon: "ion-ios-paw",
                title: "My Pets",
                view: "templates/pets.html"
            },
            {
                color: "#AD5CE9",
                icon: "ion-ios-people",
                title: "My Friends",
                view: "templates/friends.html"
            },
            {
                color: "#3DBEC9",
                icon: "ion-heart",
                title: "What I Love",
                view: "templates/love.html"
            },
            {
                color: "#D86B67",
                icon: "ion-planet",
                title: "Coder Dojo",
                view: "templates/dojo.html"
            }
        ];

        $scope.exitApp = function () {
            ionic.Platform.exitApp();
        };

        $ionicPopover.fromTemplateUrl('templates/modals/popover.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.popover = popover;
        });

        $scope.openPopover = function ($event) {
            $scope.popover.show($event);
        };
        
        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
    }
})();