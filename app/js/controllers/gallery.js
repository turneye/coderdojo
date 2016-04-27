(function() {
'use strict';

    angular
        .module('App')
        .controller('GalleryController', GalleryController);

    GalleryController.$inject = ['$scope'];
    function GalleryController($scope) {
        
       var list = [
            {
                color: "#E47500",
                icon: "ion-ionic",
                title: "Hello Ionic"
            },
            {
                color: "#5AD863",
                icon: "ion-social-html5",
                title: "HTML5"
            },
            {
                color: "#F8E548",
                icon: "ion-social-javascript",
                title: "JS"
            },
            {
                color: "#AD5CE9",
                icon: "ion-social-sass",
                title: "Sass"
            },
            {
                color: "#3DBEC9",
                icon: "ion-social-css3",
                title: "CSS3"
            },
            {
                color: "#D86B67",
                icon: "ion-social-angular",
                title: "Angular"
            }
        ];
        
        $scope.$on('$ionicView.afterEnter', function(){
            $scope.gallery = {
                list : list
            };
        });
    }
})();