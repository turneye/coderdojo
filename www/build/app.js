// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'App' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('App', ['ionic', 'ngCordova', 'ngAnimate'])

.run(['$ionicPlatform', 
			'$sqliteService',
      function($ionicPlatform, $sqliteService) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
		
    //Load the Pre-populated database, debug = true
    $sqliteService.preloadDataBase(true);
  });
}])
.config(['$stateProvider',
         '$urlRouterProvider',
         '$ionicConfigProvider',
         '$compileProvider',
         function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {

    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content|ms-appx|x-wmapp0):|data:image\/|img\//);
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);
    
    $ionicConfigProvider.scrolling.jsScrolling(ionic.Platform.isIOS());
    
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "templates/home.html",
            controller: 'HomeController'
        })
        .state('app', {
            url: '/app',
            abstract: true,
            controller: 'AppController',
            templateUrl: 'templates/menu.html'
        })
        .state('app.gallery', {
            url: "/gallery",
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/gallery.html",
                    controller: 'GalleryController'
                }
            }
        })
        .state('app.item', {
            url: "/item/{title}",
            params: {
                color: null,
                icon: null
            },
            cache: false,
            views: {
                viewContent: {
                    templateUrl: "templates/item.html",
                    controller: 'ItemController'
                }
            }
        });
        
    $urlRouterProvider.otherwise(function ($injector, $location) {
        var $state = $injector.get("$state");
        $state.go("home");
    });
}]);

/* global ionic */
(function (angular, ionic) {
	"use strict";

	ionic.Platform.isIE = function () {
		return ionic.Platform.ua.toLowerCase().indexOf('trident') > -1;
	}

	if (ionic.Platform.isIE()) {
		angular.module('ionic')
			.factory('$ionicNgClick', ['$parse', '$timeout', function ($parse, $timeout) {
				return function (scope, element, clickExpr) {
					var clickHandler = angular.isFunction(clickExpr) ? clickExpr : $parse(clickExpr);

					element.on('click', function (event) {
						scope.$apply(function () {
							if (scope.clicktimer) return; // Second call
							clickHandler(scope, { $event: (event) });
							scope.clicktimer = $timeout(function () { delete scope.clicktimer; }, 1, false);
						});
					});

					// Hack for iOS Safari's benefit. It goes searching for onclick handlers and is liable to click
					// something else nearby.
					element.onclick = function (event) { };
				};
			}]);
	}

	function SelectDirective() {
		'use strict';

		return {
			restrict: 'E',
			replace: false,
			link: function (scope, element) {
				if (ionic.Platform && (ionic.Platform.isWindowsPhone() || ionic.Platform.isIE() || ionic.Platform.platform() === "edge")) {
					element.attr('data-tap-disabled', 'true');
				}
			}
		};
	}

	angular.module('ionic')
    .directive('select', SelectDirective);

	/*angular.module('ionic-datepicker')
	.directive('select', SelectDirective);*/

})(angular, ionic);
window.queries = [
	//Drop tables
   "DROP TABLE IF EXISTS Users;",
	//Create tables
	"CREATE TABLE Users (IdUser integer primary key autoincrement, Name text not null);",
	//Insert Users
	"INSERT INTO 'Users' ('Name') VALUES ('Juan David Nicholls Cardona');",
	"INSERT INTO 'Users' ('Name') VALUES ('Khriztian Moreno Zuluaga');",
	"INSERT INTO 'Users' ('Name') VALUES ('Cristian Rivas Buitrago');",
	"INSERT INTO 'Users' ('Name') VALUES ('Juan David Sánchez');",
	"INSERT INTO 'Users' ('Name') VALUES ('Nicolas Molina');",
	"INSERT INTO 'Users' ('Name') VALUES ('Miyamoto Musashi FIlander');",
	"INSERT INTO 'Users' ('Name') VALUES ('Didier Hernandez');",
	"INSERT INTO 'Users' ('Name') VALUES ('Luis Eduardo Oquendo Pérez');",
	"INSERT INTO 'Users' ('Name') VALUES ('Carlos Rojas');",
	"INSERT INTO 'Users' ('Name') VALUES ('Levano Castilla Carlos Miguel');"
];
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
(function() {
'use strict';

    angular
        .module('App')
        .controller('GalleryController', GalleryController);

    GalleryController.$inject = ['$scope', '$state'];
    function GalleryController($scope, $state) {
        
        $scope.openItem = function(item){
            $state.go('app.item', { title: item.title, icon: item.icon, color: item.color });
        };
    }
})();
(function () {
	'use strict';

	angular
		.module('App')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$ionicPopup', 'Modals', 'Model'];
	function HomeController($scope, $ionicPopup, Modals, Model) {

		$scope.users = [];

		$scope.HelloWorld = function () {
			$ionicPopup.alert({
				title: 'Hello World',
				template: 'This is the best template to start with Ionic Framework!',
     		cssClass: 'animated bounceInDown'
			});
		};
		
		$scope.showUsers = function () {
			Model.Users.getAll().then(function (users) {
				$scope.users = angular.copy(users);
			});
			Modals.openModal($scope, 'templates/modals/users.html', 'animated rotateInDownLeft');
		};
		
		$scope.closeModal = function () {
			Modals.closeModal();
			$scope.users = [];
		};
		
		//Center content
		//1. http://codepen.io/mhartington/pen/gcHeL
		//2. http://codepen.io/anon/pen/meQJvp
	}
})();
(function() {
'use strict';

    angular
        .module('App')
        .controller('ItemController', ItemController);

    ItemController.$inject = ['$scope', '$stateParams', '$ionicViewSwitcher', '$state', '$ionicHistory'];
    function ItemController($scope, $stateParams, $ionicViewSwitcher, $state, $ionicHistory) {
        
        $scope.item = {
            title: $stateParams.title,
            icon: $stateParams.icon,
            color: $stateParams.color
        };
        
        if (!$scope.item.color) {
            $ionicViewSwitcher.nextDirection('back');
            $ionicHistory.nextViewOptions({
                disableBack: true,
                disableAnimate : true,
                historyRoot  : true
            });
            $state.go('app.gallery');
        }
    }
})();
(function () {
	'use strict';

	angular
		.module('App')
		.directive('holdList', holdList);

	holdList.$inject = ['$ionicGesture'];
	function holdList($ionicGesture) {

		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				$ionicGesture.on('hold', function (e) {

					var content = element[0].querySelector('.item-content');

					var buttons = element[0].querySelector('.item-options');
					var buttonsWidth = buttons.offsetWidth;

					ionic.requestAnimationFrame(function () {
						content.style[ionic.CSS.TRANSITION] = 'all ease-out .25s';

						if (!buttons.classList.contains('invisible')) {
							content.style[ionic.CSS.TRANSFORM] = '';
							setTimeout(function () {
								buttons.classList.add('invisible');
							}, 250);
						} else {
							buttons.classList.remove('invisible');
							content.style[ionic.CSS.TRANSFORM] = 'translate3d(-' + buttonsWidth + 'px, 0, 0)';
						}
					});


				}, element);
			}
		};
	}
})();
(function () {
	'use strict';

	angular
		.module('App')
		.directive('ionMultipleSelect', ionMultipleSelect);

	ionMultipleSelect.$inject = ['$ionicModal', '$ionicGesture'];
	function ionMultipleSelect($ionicModal, $ionicGesture) {

		return {
			restrict: 'E',
			scope: {
				options: "="
			},
			controller: function ($scope, $element, $attrs) {
				$scope.multipleSelect = {
					title: $attrs.title || "Select Options",
					tempOptions: [],
					keyProperty: $attrs.keyProperty || "id",
					valueProperty: $attrs.valueProperty || "value",
					selectedProperty: $attrs.selectedProperty || "selected",
					templateUrl: $attrs.templateUrl || 'templates/multipleSelect.html',
					renderCheckbox: $attrs.renderCheckbox ? $attrs.renderCheckbox == "true" : true,
					animation: $attrs.animation || 'slide-in-up'
				};

				$scope.OpenModalFromTemplate = function (templateUrl) {
					$ionicModal.fromTemplateUrl(templateUrl, {
						scope: $scope,
						animation: $scope.multipleSelect.animation
					}).then(function (modal) {
						$scope.modal = modal;
						$scope.modal.show();
					});
				};

				$ionicGesture.on('tap', function (e) {
					$scope.multipleSelect.tempOptions = $scope.options.map(function (option) {
						var tempOption = {};
						tempOption[$scope.multipleSelect.keyProperty] = option[$scope.multipleSelect.keyProperty];
						tempOption[$scope.multipleSelect.valueProperty] = option[$scope.multipleSelect.valueProperty];
						tempOption[$scope.multipleSelect.selectedProperty] = option[$scope.multipleSelect.selectedProperty];

						return tempOption;
					});
					$scope.OpenModalFromTemplate($scope.multipleSelect.templateUrl);
				}, $element);

				$scope.saveOptions = function () {
					for (var i = 0; i < $scope.multipleSelect.tempOptions.length; i++) {
						var tempOption = $scope.multipleSelect.tempOptions[i];
						for (var j = 0; j < $scope.options.length; j++) {
							var option = $scope.options[j];
							if (tempOption[$scope.multipleSelect.keyProperty] == option[$scope.multipleSelect.keyProperty]) {
								option[$scope.multipleSelect.selectedProperty] = tempOption[$scope.multipleSelect.selectedProperty];
								break;
							}
						}
					}
					$scope.closeModal();
				};

				$scope.closeModal = function () {
					$scope.modal.remove();
				};
				$scope.$on('$destroy', function () {
					if ($scope.modal) {
						$scope.modal.remove();
					}
				});
			}
		};
	}
})();
(function () {
	'use strict';

	angular
		.module('App')
		.directive('ionSearchSelect', ionSearchSelect);

	ionSearchSelect.$inject = ['$ionicModal', '$ionicGesture'];
	function ionSearchSelect($ionicModal, $ionicGesture) {

		return {
			restrict: 'E',
			scope: {
				options: "=",
				optionSelected: "="
			},
			controller: function ($scope, $element, $attrs) {
				$scope.searchSelect = {
					title: $attrs.title || "Search",
					keyProperty: $attrs.keyProperty,
					valueProperty: $attrs.valueProperty,
					templateUrl: $attrs.templateUrl || 'templates/searchSelect.html',
					animation: $attrs.animation || 'slide-in-up',
					option: null,
					searchvalue: "",
					enableSearch: $attrs.enableSearch ? $attrs.enableSearch == "true" : true
				};

				$ionicGesture.on('tap', function (e) {

					if (!!$scope.searchSelect.keyProperty && !!$scope.searchSelect.valueProperty) {
						if ($scope.optionSelected) {
							$scope.searchSelect.option = $scope.optionSelected[$scope.searchSelect.keyProperty];
						}
					}
					else {
						$scope.searchSelect.option = $scope.optionSelected;
					}
					$scope.OpenModalFromTemplate($scope.searchSelect.templateUrl);
				}, $element);

				$scope.saveOption = function () {
					if (!!$scope.searchSelect.keyProperty && !!$scope.searchSelect.valueProperty) {
						for (var i = 0; i < $scope.options.length; i++) {
							var currentOption = $scope.options[i];
							if (currentOption[$scope.searchSelect.keyProperty] == $scope.searchSelect.option) {
								$scope.optionSelected = currentOption;
								break;
							}
						}
					}
					else {
						$scope.optionSelected = $scope.searchSelect.option;
					}
					$scope.searchSelect.searchvalue = "";
					$scope.modal.remove();
				};

				$scope.clearSearch = function () {
					$scope.searchSelect.searchvalue = "";
				};

				$scope.closeModal = function () {
					$scope.modal.remove();
				};
				$scope.$on('$destroy', function () {
					if ($scope.modal) {
						$scope.modal.remove();
					}
				});

				$scope.OpenModalFromTemplate = function (templateUrl) {
					$ionicModal.fromTemplateUrl(templateUrl, {
						scope: $scope,
						animation: $scope.searchSelect.animation
					}).then(function (modal) {
						$scope.modal = modal;
						$scope.modal.show();
					});
				};
			}
		};
	}
})();
(function () {
	'use strict';

	angular
		.module('App')
		.factory('Modals', Modals);

	Modals.$inject = ['$ionicModal'];
	function Modals($ionicModal) {

		var modals = [];

		var _openModal = function ($scope, templateUrl, animation) {
			$ionicModal.fromTemplateUrl(templateUrl, {
				scope: $scope,
				animation: animation || 'slide-in-up',
				backdropClickToClose: false
			}).then(function (modal) {
				modals.push(modal);
				modal.show();
			});
		};

		var _closeModal = function () {
			var currentModal = modals.splice(-1, 1)[0];
			currentModal.remove();
		};

		var _closeAllModals = function () {
			modals.map(function (modal) {
				modal.remove();
			});
			modals = [];
		};

		return {
			openModal: _openModal,
			closeModal: _closeModal,
			closeAllModals: _closeAllModals
		};
	}
})();
(function () {
	'use strict';

	angular
		.module('App')
		.factory('Model', Model);

	Model.$inject = ['Users'];
	function Model(Users) {

		return {
			Users: Users
		};
	}
})();
(function () {
	'use strict';

	angular
		.module('App')
		.service('$sqliteService', $sqliteService);

	$sqliteService.$inject = ['$q', '$cordovaSQLite'];
	function $sqliteService($q, $cordovaSQLite) {

		var self = this;
		var _db;

		self.db = function () {
			if (!_db) {
				if (window.sqlitePlugin !== undefined) {
					_db = window.sqlitePlugin.openDatabase({ name: "pre.db", location: 2, createFromLocation: 1 });
				} else {
					// For debugging in the browser
					_db = window.openDatabase("pre.db", "1.0", "Database", 200000);
				}
			}
			return _db;
		};

		self.getFirstItem = function (query, parameters) {
			var deferred = $q.defer();
			self.executeSql(query, parameters).then(function (res) {

				if (res.rows.length > 0)
					return deferred.resolve(res.rows.item(0));
				else
					return deferred.reject("There aren't items matching");
			}, function (err) {
				return deferred.reject(err);
			});

			return deferred.promise;
		};

		self.getFirstOrDefaultItem = function (query, parameters) {
			var deferred = $q.defer();
			self.executeSql(query, parameters).then(function (res) {

				if (res.rows.length > 0)
					return deferred.resolve(res.rows.item(0));
				else
					return deferred.resolve(null);
			}, function (err) {
				return deferred.reject(err);
			});

			return deferred.promise;
		};

		self.getItems = function (query, parameters) {
			var deferred = $q.defer();
			self.executeSql(query, parameters).then(function (res) {
				var items = [];
				for (var i = 0; i < res.rows.length; i++) {
					items.push(res.rows.item(i));
				}
				return deferred.resolve(items);
			}, function (err) {
				return deferred.reject(err);
			});

			return deferred.promise;
		};

		self.preloadDataBase = function (enableLog) {
			var deferred = $q.defer();

			//window.open("data:text/plain;charset=utf-8," + JSON.stringify({ data: window.queries.join('').replace(/\\n/g, '\n') }));
			if (window.sqlitePlugin === undefined) {
				enableLog && console.log('%c ***************** Starting the creation of the database in the browser ***************** ', 'background: #222; color: #bada55');
				self.db().transaction(function (tx) {
					for (var i = 0; i < window.queries.length; i++) {
						var query = window.queries[i].replace(/\\n/g, '\n');

						enableLog && console.log(window.queries[i]);
						tx.executeSql(query);
					}
				}, function (error) {
					deferred.reject(error);
				}, function () {
					enableLog && console.log('%c ***************** Completing the creation of the database in the browser ***************** ', 'background: #222; color: #bada55');
					deferred.resolve("OK");
				});
			}
			else {
				deferred.resolve("OK");
			}

			return deferred.promise;
		};

		self.executeSql = function (query, parameters) {
			return $cordovaSQLite.execute(self.db(), query, parameters);
		};
	}
})();
(function () {
	'use strict';

	angular
		.module('App')
		.factory('Users', Users);

	Users.$inject = ['$q', '$sqliteService'];
	function Users($q, $sqliteService) {

		return {
			getAll: function () {
				var query = "Select * FROM Users";
				return $q.when($sqliteService.getItems(query));
			},
			add: function (user) {
				var query = "INSERT INTO Users (Name) VALUES (?)";
				return $q.when($sqliteService.executeSql(query, [user.Name]));
			}
		};
	}
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImlzc3Vlcy5qcyIsInF1ZXJpZXMuanMiLCJjb250cm9sbGVycy9hcHAuanMiLCJjb250cm9sbGVycy9nYWxsZXJ5LmpzIiwiY29udHJvbGxlcnMvaG9tZS5qcyIsImNvbnRyb2xsZXJzL2l0ZW0uanMiLCJkaXJlY3RpdmVzL2hvbGRMaXN0LmpzIiwiZGlyZWN0aXZlcy9tdWx0aXBsZVNlbGVjdC5qcyIsImRpcmVjdGl2ZXMvc2VhcmNoU2VsZWN0LmpzIiwic2VydmljZXMvbW9kYWxzLmpzIiwic2VydmljZXMvbW9kZWwuanMiLCJzZXJ2aWNlcy9zcWxpdGUuanMiLCJzZXJ2aWNlcy91c2Vycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcclxuXHJcbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXHJcbi8vICdBcHAnIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXHJcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcclxuYW5ndWxhci5tb2R1bGUoJ0FwcCcsIFsnaW9uaWMnLCAnbmdDb3Jkb3ZhJywgJ25nQW5pbWF0ZSddKVxyXG5cclxuLnJ1bihbJyRpb25pY1BsYXRmb3JtJywgXHJcblx0XHRcdCckc3FsaXRlU2VydmljZScsXHJcbiAgICAgIGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtLCAkc3FsaXRlU2VydmljZSkge1xyXG4gICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgaWYod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xyXG4gICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXHJcbiAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcclxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcclxuXHJcbiAgICAgIC8vIERvbid0IHJlbW92ZSB0aGlzIGxpbmUgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy4gSXQgc3RvcHMgdGhlIHZpZXdwb3J0XHJcbiAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXHJcbiAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxyXG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcclxuICAgIH1cclxuICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcclxuICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cdFx0XHJcbiAgICAvL0xvYWQgdGhlIFByZS1wb3B1bGF0ZWQgZGF0YWJhc2UsIGRlYnVnID0gdHJ1ZVxyXG4gICAgJHNxbGl0ZVNlcnZpY2UucHJlbG9hZERhdGFCYXNlKHRydWUpO1xyXG4gIH0pO1xyXG59XSlcclxuLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJyxcclxuICAgICAgICAgJyR1cmxSb3V0ZXJQcm92aWRlcicsXHJcbiAgICAgICAgICckaW9uaWNDb25maWdQcm92aWRlcicsXHJcbiAgICAgICAgICckY29tcGlsZVByb3ZpZGVyJyxcclxuICAgICAgICAgZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRpb25pY0NvbmZpZ1Byb3ZpZGVyLCAkY29tcGlsZVByb3ZpZGVyKSB7XHJcblxyXG4gICAgJGNvbXBpbGVQcm92aWRlci5pbWdTcmNTYW5pdGl6YXRpb25XaGl0ZWxpc3QoL15cXHMqKGh0dHBzP3xmdHB8ZmlsZXxibG9ifGNvbnRlbnR8bXMtYXBweHx4LXdtYXBwMCk6fGRhdGE6aW1hZ2VcXC98aW1nXFwvLyk7XHJcbiAgICAkY29tcGlsZVByb3ZpZGVyLmFIcmVmU2FuaXRpemF0aW9uV2hpdGVsaXN0KC9eXFxzKihodHRwcz98ZnRwfG1haWx0b3xmaWxlfGdodHRwcz98bXMtYXBweHx4LXdtYXBwMCk6Lyk7XHJcbiAgICBcclxuICAgICRpb25pY0NvbmZpZ1Byb3ZpZGVyLnNjcm9sbGluZy5qc1Njcm9sbGluZyhpb25pYy5QbGF0Zm9ybS5pc0lPUygpKTtcclxuICAgIFxyXG4gICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvaG9tZVwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZXMvaG9tZS5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ29udHJvbGxlcidcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnYXBwJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvYXBwJyxcclxuICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBcHBDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvbWVudS5odG1sJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdhcHAuZ2FsbGVyeScsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9nYWxsZXJ5XCIsXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgIHZpZXdDb250ZW50OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidGVtcGxhdGVzL2dhbGxlcnkuaHRtbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdHYWxsZXJ5Q29udHJvbGxlcidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdhcHAuaXRlbScsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9pdGVtL3t0aXRsZX1cIixcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogbnVsbCxcclxuICAgICAgICAgICAgICAgIGljb246IG51bGxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgdmlld0NvbnRlbnQ6IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZXMvaXRlbS5odG1sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0l0ZW1Db250cm9sbGVyJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKGZ1bmN0aW9uICgkaW5qZWN0b3IsICRsb2NhdGlvbikge1xyXG4gICAgICAgIHZhciAkc3RhdGUgPSAkaW5qZWN0b3IuZ2V0KFwiJHN0YXRlXCIpO1xyXG4gICAgICAgICRzdGF0ZS5nbyhcImhvbWVcIik7XHJcbiAgICB9KTtcclxufV0pO1xyXG4iLCIvKiBnbG9iYWwgaW9uaWMgKi9cclxuKGZ1bmN0aW9uIChhbmd1bGFyLCBpb25pYykge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRpb25pYy5QbGF0Zm9ybS5pc0lFID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGlvbmljLlBsYXRmb3JtLnVhLnRvTG93ZXJDYXNlKCkuaW5kZXhPZigndHJpZGVudCcpID4gLTE7XHJcblx0fVxyXG5cclxuXHRpZiAoaW9uaWMuUGxhdGZvcm0uaXNJRSgpKSB7XHJcblx0XHRhbmd1bGFyLm1vZHVsZSgnaW9uaWMnKVxyXG5cdFx0XHQuZmFjdG9yeSgnJGlvbmljTmdDbGljaycsIFsnJHBhcnNlJywgJyR0aW1lb3V0JywgZnVuY3Rpb24gKCRwYXJzZSwgJHRpbWVvdXQpIHtcclxuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBjbGlja0V4cHIpIHtcclxuXHRcdFx0XHRcdHZhciBjbGlja0hhbmRsZXIgPSBhbmd1bGFyLmlzRnVuY3Rpb24oY2xpY2tFeHByKSA/IGNsaWNrRXhwciA6ICRwYXJzZShjbGlja0V4cHIpO1xyXG5cclxuXHRcdFx0XHRcdGVsZW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdFx0XHRcdHNjb3BlLiRhcHBseShmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHNjb3BlLmNsaWNrdGltZXIpIHJldHVybjsgLy8gU2Vjb25kIGNhbGxcclxuXHRcdFx0XHRcdFx0XHRjbGlja0hhbmRsZXIoc2NvcGUsIHsgJGV2ZW50OiAoZXZlbnQpIH0pO1xyXG5cdFx0XHRcdFx0XHRcdHNjb3BlLmNsaWNrdGltZXIgPSAkdGltZW91dChmdW5jdGlvbiAoKSB7IGRlbGV0ZSBzY29wZS5jbGlja3RpbWVyOyB9LCAxLCBmYWxzZSk7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gSGFjayBmb3IgaU9TIFNhZmFyaSdzIGJlbmVmaXQuIEl0IGdvZXMgc2VhcmNoaW5nIGZvciBvbmNsaWNrIGhhbmRsZXJzIGFuZCBpcyBsaWFibGUgdG8gY2xpY2tcclxuXHRcdFx0XHRcdC8vIHNvbWV0aGluZyBlbHNlIG5lYXJieS5cclxuXHRcdFx0XHRcdGVsZW1lbnQub25jbGljayA9IGZ1bmN0aW9uIChldmVudCkgeyB9O1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1dKTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIFNlbGVjdERpcmVjdGl2ZSgpIHtcclxuXHRcdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRyZXN0cmljdDogJ0UnLFxyXG5cdFx0XHRyZXBsYWNlOiBmYWxzZSxcclxuXHRcdFx0bGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50KSB7XHJcblx0XHRcdFx0aWYgKGlvbmljLlBsYXRmb3JtICYmIChpb25pYy5QbGF0Zm9ybS5pc1dpbmRvd3NQaG9uZSgpIHx8IGlvbmljLlBsYXRmb3JtLmlzSUUoKSB8fCBpb25pYy5QbGF0Zm9ybS5wbGF0Zm9ybSgpID09PSBcImVkZ2VcIikpIHtcclxuXHRcdFx0XHRcdGVsZW1lbnQuYXR0cignZGF0YS10YXAtZGlzYWJsZWQnLCAndHJ1ZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdpb25pYycpXHJcbiAgICAuZGlyZWN0aXZlKCdzZWxlY3QnLCBTZWxlY3REaXJlY3RpdmUpO1xyXG5cclxuXHQvKmFuZ3VsYXIubW9kdWxlKCdpb25pYy1kYXRlcGlja2VyJylcclxuXHQuZGlyZWN0aXZlKCdzZWxlY3QnLCBTZWxlY3REaXJlY3RpdmUpOyovXHJcblxyXG59KShhbmd1bGFyLCBpb25pYyk7Iiwid2luZG93LnF1ZXJpZXMgPSBbXHJcblx0Ly9Ecm9wIHRhYmxlc1xyXG4gICBcIkRST1AgVEFCTEUgSUYgRVhJU1RTIFVzZXJzO1wiLFxyXG5cdC8vQ3JlYXRlIHRhYmxlc1xyXG5cdFwiQ1JFQVRFIFRBQkxFIFVzZXJzIChJZFVzZXIgaW50ZWdlciBwcmltYXJ5IGtleSBhdXRvaW5jcmVtZW50LCBOYW1lIHRleHQgbm90IG51bGwpO1wiLFxyXG5cdC8vSW5zZXJ0IFVzZXJzXHJcblx0XCJJTlNFUlQgSU5UTyAnVXNlcnMnICgnTmFtZScpIFZBTFVFUyAoJ0p1YW4gRGF2aWQgTmljaG9sbHMgQ2FyZG9uYScpO1wiLFxyXG5cdFwiSU5TRVJUIElOVE8gJ1VzZXJzJyAoJ05hbWUnKSBWQUxVRVMgKCdLaHJpenRpYW4gTW9yZW5vIFp1bHVhZ2EnKTtcIixcclxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnQ3Jpc3RpYW4gUml2YXMgQnVpdHJhZ28nKTtcIixcclxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnSnVhbiBEYXZpZCBTw6FuY2hleicpO1wiLFxyXG5cdFwiSU5TRVJUIElOVE8gJ1VzZXJzJyAoJ05hbWUnKSBWQUxVRVMgKCdOaWNvbGFzIE1vbGluYScpO1wiLFxyXG5cdFwiSU5TRVJUIElOVE8gJ1VzZXJzJyAoJ05hbWUnKSBWQUxVRVMgKCdNaXlhbW90byBNdXNhc2hpIEZJbGFuZGVyJyk7XCIsXHJcblx0XCJJTlNFUlQgSU5UTyAnVXNlcnMnICgnTmFtZScpIFZBTFVFUyAoJ0RpZGllciBIZXJuYW5kZXonKTtcIixcclxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnTHVpcyBFZHVhcmRvIE9xdWVuZG8gUMOpcmV6Jyk7XCIsXHJcblx0XCJJTlNFUlQgSU5UTyAnVXNlcnMnICgnTmFtZScpIFZBTFVFUyAoJ0NhcmxvcyBSb2phcycpO1wiLFxyXG5cdFwiSU5TRVJUIElOVE8gJ1VzZXJzJyAoJ05hbWUnKSBWQUxVRVMgKCdMZXZhbm8gQ2FzdGlsbGEgQ2FybG9zIE1pZ3VlbCcpO1wiXHJcbl07IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnQXBwJylcclxuICAgICAgICAuY29udHJvbGxlcignQXBwQ29udHJvbGxlcicsIEFwcENvbnRyb2xsZXIpO1xyXG5cclxuICAgIEFwcENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRpb25pY1BvcG92ZXInXTtcclxuICAgIGZ1bmN0aW9uIEFwcENvbnRyb2xsZXIoJHNjb3BlLCAkaW9uaWNQb3BvdmVyKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHNjb3BlLml0ZW1zID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjRTQ3NTAwXCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImlvbi1pb25pY1wiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiSGVsbG8gSW9uaWNcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjNUFEODYzXCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImlvbi1zb2NpYWwtaHRtbDVcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkhUTUw1XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IFwiI0Y4RTU0OFwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJpb24tc29jaWFsLWphdmFzY3JpcHRcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkpTXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IFwiI0FENUNFOVwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJpb24tc29jaWFsLXNhc3NcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlNhc3NcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjM0RCRUM5XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImlvbi1zb2NpYWwtY3NzM1wiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiQ1NTM1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNEODZCNjdcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiaW9uLXNvY2lhbC1hbmd1bGFyXCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJBbmd1bGFyXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgICRzY29wZS5leGl0QXBwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpb25pYy5QbGF0Zm9ybS5leGl0QXBwKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJGlvbmljUG9wb3Zlci5mcm9tVGVtcGxhdGVVcmwoJ3RlbXBsYXRlcy9tb2RhbHMvcG9wb3Zlci5odG1sJywge1xyXG4gICAgICAgICAgICBzY29wZTogJHNjb3BlXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocG9wb3Zlcikge1xyXG4gICAgICAgICAgICAkc2NvcGUucG9wb3ZlciA9IHBvcG92ZXI7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRzY29wZS5vcGVuUG9wb3ZlciA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnBvcG92ZXIuc2hvdygkZXZlbnQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnBvcG92ZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ0FwcCcpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0dhbGxlcnlDb250cm9sbGVyJywgR2FsbGVyeUNvbnRyb2xsZXIpO1xyXG5cclxuICAgIEdhbGxlcnlDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckc3RhdGUnXTtcclxuICAgIGZ1bmN0aW9uIEdhbGxlcnlDb250cm9sbGVyKCRzY29wZSwgJHN0YXRlKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHNjb3BlLm9wZW5JdGVtID0gZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnYXBwLml0ZW0nLCB7IHRpdGxlOiBpdGVtLnRpdGxlLCBpY29uOiBpdGVtLmljb24sIGNvbG9yOiBpdGVtLmNvbG9yIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGFuZ3VsYXJcclxuXHRcdC5tb2R1bGUoJ0FwcCcpXHJcblx0XHQuY29udHJvbGxlcignSG9tZUNvbnRyb2xsZXInLCBIb21lQ29udHJvbGxlcik7XHJcblxyXG5cdEhvbWVDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckaW9uaWNQb3B1cCcsICdNb2RhbHMnLCAnTW9kZWwnXTtcclxuXHRmdW5jdGlvbiBIb21lQ29udHJvbGxlcigkc2NvcGUsICRpb25pY1BvcHVwLCBNb2RhbHMsIE1vZGVsKSB7XHJcblxyXG5cdFx0JHNjb3BlLnVzZXJzID0gW107XHJcblxyXG5cdFx0JHNjb3BlLkhlbGxvV29ybGQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdCRpb25pY1BvcHVwLmFsZXJ0KHtcclxuXHRcdFx0XHR0aXRsZTogJ0hlbGxvIFdvcmxkJyxcclxuXHRcdFx0XHR0ZW1wbGF0ZTogJ1RoaXMgaXMgdGhlIGJlc3QgdGVtcGxhdGUgdG8gc3RhcnQgd2l0aCBJb25pYyBGcmFtZXdvcmshJyxcclxuICAgICBcdFx0Y3NzQ2xhc3M6ICdhbmltYXRlZCBib3VuY2VJbkRvd24nXHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHRcdFxyXG5cdFx0JHNjb3BlLnNob3dVc2VycyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0TW9kZWwuVXNlcnMuZ2V0QWxsKCkudGhlbihmdW5jdGlvbiAodXNlcnMpIHtcclxuXHRcdFx0XHQkc2NvcGUudXNlcnMgPSBhbmd1bGFyLmNvcHkodXNlcnMpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0TW9kYWxzLm9wZW5Nb2RhbCgkc2NvcGUsICd0ZW1wbGF0ZXMvbW9kYWxzL3VzZXJzLmh0bWwnLCAnYW5pbWF0ZWQgcm90YXRlSW5Eb3duTGVmdCcpO1xyXG5cdFx0fTtcclxuXHRcdFxyXG5cdFx0JHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdE1vZGFscy5jbG9zZU1vZGFsKCk7XHJcblx0XHRcdCRzY29wZS51c2VycyA9IFtdO1xyXG5cdFx0fTtcclxuXHRcdFxyXG5cdFx0Ly9DZW50ZXIgY29udGVudFxyXG5cdFx0Ly8xLiBodHRwOi8vY29kZXBlbi5pby9taGFydGluZ3Rvbi9wZW4vZ2NIZUxcclxuXHRcdC8vMi4gaHR0cDovL2NvZGVwZW4uaW8vYW5vbi9wZW4vbWVRSnZwXHJcblx0fVxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdBcHAnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdJdGVtQ29udHJvbGxlcicsIEl0ZW1Db250cm9sbGVyKTtcclxuXHJcbiAgICBJdGVtQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJHN0YXRlUGFyYW1zJywgJyRpb25pY1ZpZXdTd2l0Y2hlcicsICckc3RhdGUnLCAnJGlvbmljSGlzdG9yeSddO1xyXG4gICAgZnVuY3Rpb24gSXRlbUNvbnRyb2xsZXIoJHNjb3BlLCAkc3RhdGVQYXJhbXMsICRpb25pY1ZpZXdTd2l0Y2hlciwgJHN0YXRlLCAkaW9uaWNIaXN0b3J5KSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHNjb3BlLml0ZW0gPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAkc3RhdGVQYXJhbXMudGl0bGUsXHJcbiAgICAgICAgICAgIGljb246ICRzdGF0ZVBhcmFtcy5pY29uLFxyXG4gICAgICAgICAgICBjb2xvcjogJHN0YXRlUGFyYW1zLmNvbG9yXHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoISRzY29wZS5pdGVtLmNvbG9yKSB7XHJcbiAgICAgICAgICAgICRpb25pY1ZpZXdTd2l0Y2hlci5uZXh0RGlyZWN0aW9uKCdiYWNrJyk7XHJcbiAgICAgICAgICAgICRpb25pY0hpc3RvcnkubmV4dFZpZXdPcHRpb25zKHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVCYWNrOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZUFuaW1hdGUgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaGlzdG9yeVJvb3QgIDogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdhcHAuZ2FsbGVyeScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0YW5ndWxhclxyXG5cdFx0Lm1vZHVsZSgnQXBwJylcclxuXHRcdC5kaXJlY3RpdmUoJ2hvbGRMaXN0JywgaG9sZExpc3QpO1xyXG5cclxuXHRob2xkTGlzdC4kaW5qZWN0ID0gWyckaW9uaWNHZXN0dXJlJ107XHJcblx0ZnVuY3Rpb24gaG9sZExpc3QoJGlvbmljR2VzdHVyZSkge1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHJlc3RyaWN0OiAnQScsXHJcblx0XHRcdGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuXHRcdFx0XHQkaW9uaWNHZXN0dXJlLm9uKCdob2xkJywgZnVuY3Rpb24gKGUpIHtcclxuXHJcblx0XHRcdFx0XHR2YXIgY29udGVudCA9IGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLml0ZW0tY29udGVudCcpO1xyXG5cclxuXHRcdFx0XHRcdHZhciBidXR0b25zID0gZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcuaXRlbS1vcHRpb25zJyk7XHJcblx0XHRcdFx0XHR2YXIgYnV0dG9uc1dpZHRoID0gYnV0dG9ucy5vZmZzZXRXaWR0aDtcclxuXHJcblx0XHRcdFx0XHRpb25pYy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRjb250ZW50LnN0eWxlW2lvbmljLkNTUy5UUkFOU0lUSU9OXSA9ICdhbGwgZWFzZS1vdXQgLjI1cyc7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoIWJ1dHRvbnMuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnZpc2libGUnKSkge1xyXG5cdFx0XHRcdFx0XHRcdGNvbnRlbnQuc3R5bGVbaW9uaWMuQ1NTLlRSQU5TRk9STV0gPSAnJztcclxuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGJ1dHRvbnMuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJyk7XHJcblx0XHRcdFx0XHRcdFx0fSwgMjUwKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRidXR0b25zLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xyXG5cdFx0XHRcdFx0XHRcdGNvbnRlbnQuc3R5bGVbaW9uaWMuQ1NTLlRSQU5TRk9STV0gPSAndHJhbnNsYXRlM2QoLScgKyBidXR0b25zV2lkdGggKyAncHgsIDAsIDApJztcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cclxuXHRcdFx0XHR9LCBlbGVtZW50KTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGFuZ3VsYXJcclxuXHRcdC5tb2R1bGUoJ0FwcCcpXHJcblx0XHQuZGlyZWN0aXZlKCdpb25NdWx0aXBsZVNlbGVjdCcsIGlvbk11bHRpcGxlU2VsZWN0KTtcclxuXHJcblx0aW9uTXVsdGlwbGVTZWxlY3QuJGluamVjdCA9IFsnJGlvbmljTW9kYWwnLCAnJGlvbmljR2VzdHVyZSddO1xyXG5cdGZ1bmN0aW9uIGlvbk11bHRpcGxlU2VsZWN0KCRpb25pY01vZGFsLCAkaW9uaWNHZXN0dXJlKSB7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cmVzdHJpY3Q6ICdFJyxcclxuXHRcdFx0c2NvcGU6IHtcclxuXHRcdFx0XHRvcHRpb25zOiBcIj1cIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRjb250cm9sbGVyOiBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XHJcblx0XHRcdFx0JHNjb3BlLm11bHRpcGxlU2VsZWN0ID0ge1xyXG5cdFx0XHRcdFx0dGl0bGU6ICRhdHRycy50aXRsZSB8fCBcIlNlbGVjdCBPcHRpb25zXCIsXHJcblx0XHRcdFx0XHR0ZW1wT3B0aW9uczogW10sXHJcblx0XHRcdFx0XHRrZXlQcm9wZXJ0eTogJGF0dHJzLmtleVByb3BlcnR5IHx8IFwiaWRcIixcclxuXHRcdFx0XHRcdHZhbHVlUHJvcGVydHk6ICRhdHRycy52YWx1ZVByb3BlcnR5IHx8IFwidmFsdWVcIixcclxuXHRcdFx0XHRcdHNlbGVjdGVkUHJvcGVydHk6ICRhdHRycy5zZWxlY3RlZFByb3BlcnR5IHx8IFwic2VsZWN0ZWRcIixcclxuXHRcdFx0XHRcdHRlbXBsYXRlVXJsOiAkYXR0cnMudGVtcGxhdGVVcmwgfHwgJ3RlbXBsYXRlcy9tdWx0aXBsZVNlbGVjdC5odG1sJyxcclxuXHRcdFx0XHRcdHJlbmRlckNoZWNrYm94OiAkYXR0cnMucmVuZGVyQ2hlY2tib3ggPyAkYXR0cnMucmVuZGVyQ2hlY2tib3ggPT0gXCJ0cnVlXCIgOiB0cnVlLFxyXG5cdFx0XHRcdFx0YW5pbWF0aW9uOiAkYXR0cnMuYW5pbWF0aW9uIHx8ICdzbGlkZS1pbi11cCdcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHQkc2NvcGUuT3Blbk1vZGFsRnJvbVRlbXBsYXRlID0gZnVuY3Rpb24gKHRlbXBsYXRlVXJsKSB7XHJcblx0XHRcdFx0XHQkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwodGVtcGxhdGVVcmwsIHtcclxuXHRcdFx0XHRcdFx0c2NvcGU6ICRzY29wZSxcclxuXHRcdFx0XHRcdFx0YW5pbWF0aW9uOiAkc2NvcGUubXVsdGlwbGVTZWxlY3QuYW5pbWF0aW9uXHJcblx0XHRcdFx0XHR9KS50aGVuKGZ1bmN0aW9uIChtb2RhbCkge1xyXG5cdFx0XHRcdFx0XHQkc2NvcGUubW9kYWwgPSBtb2RhbDtcclxuXHRcdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnNob3coKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdCRpb25pY0dlc3R1cmUub24oJ3RhcCcsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0XHQkc2NvcGUubXVsdGlwbGVTZWxlY3QudGVtcE9wdGlvbnMgPSAkc2NvcGUub3B0aW9ucy5tYXAoZnVuY3Rpb24gKG9wdGlvbikge1xyXG5cdFx0XHRcdFx0XHR2YXIgdGVtcE9wdGlvbiA9IHt9O1xyXG5cdFx0XHRcdFx0XHR0ZW1wT3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC5rZXlQcm9wZXJ0eV0gPSBvcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LmtleVByb3BlcnR5XTtcclxuXHRcdFx0XHRcdFx0dGVtcE9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3QudmFsdWVQcm9wZXJ0eV0gPSBvcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LnZhbHVlUHJvcGVydHldO1xyXG5cdFx0XHRcdFx0XHR0ZW1wT3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC5zZWxlY3RlZFByb3BlcnR5XSA9IG9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3Quc2VsZWN0ZWRQcm9wZXJ0eV07XHJcblxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGVtcE9wdGlvbjtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0JHNjb3BlLk9wZW5Nb2RhbEZyb21UZW1wbGF0ZSgkc2NvcGUubXVsdGlwbGVTZWxlY3QudGVtcGxhdGVVcmwpO1xyXG5cdFx0XHRcdH0sICRlbGVtZW50KTtcclxuXHJcblx0XHRcdFx0JHNjb3BlLnNhdmVPcHRpb25zID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAkc2NvcGUubXVsdGlwbGVTZWxlY3QudGVtcE9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0dmFyIHRlbXBPcHRpb24gPSAkc2NvcGUubXVsdGlwbGVTZWxlY3QudGVtcE9wdGlvbnNbaV07XHJcblx0XHRcdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgJHNjb3BlLm9wdGlvbnMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgb3B0aW9uID0gJHNjb3BlLm9wdGlvbnNbal07XHJcblx0XHRcdFx0XHRcdFx0aWYgKHRlbXBPcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LmtleVByb3BlcnR5XSA9PSBvcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LmtleVByb3BlcnR5XSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC5zZWxlY3RlZFByb3BlcnR5XSA9IHRlbXBPcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LnNlbGVjdGVkUHJvcGVydHldO1xyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQkc2NvcGUuY2xvc2VNb2RhbCgpO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdCRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0JHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRpZiAoJHNjb3BlLm1vZGFsKSB7XHJcblx0XHRcdFx0XHRcdCRzY29wZS5tb2RhbC5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGFuZ3VsYXJcclxuXHRcdC5tb2R1bGUoJ0FwcCcpXHJcblx0XHQuZGlyZWN0aXZlKCdpb25TZWFyY2hTZWxlY3QnLCBpb25TZWFyY2hTZWxlY3QpO1xyXG5cclxuXHRpb25TZWFyY2hTZWxlY3QuJGluamVjdCA9IFsnJGlvbmljTW9kYWwnLCAnJGlvbmljR2VzdHVyZSddO1xyXG5cdGZ1bmN0aW9uIGlvblNlYXJjaFNlbGVjdCgkaW9uaWNNb2RhbCwgJGlvbmljR2VzdHVyZSkge1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHJlc3RyaWN0OiAnRScsXHJcblx0XHRcdHNjb3BlOiB7XHJcblx0XHRcdFx0b3B0aW9uczogXCI9XCIsXHJcblx0XHRcdFx0b3B0aW9uU2VsZWN0ZWQ6IFwiPVwiXHJcblx0XHRcdH0sXHJcblx0XHRcdGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcclxuXHRcdFx0XHQkc2NvcGUuc2VhcmNoU2VsZWN0ID0ge1xyXG5cdFx0XHRcdFx0dGl0bGU6ICRhdHRycy50aXRsZSB8fCBcIlNlYXJjaFwiLFxyXG5cdFx0XHRcdFx0a2V5UHJvcGVydHk6ICRhdHRycy5rZXlQcm9wZXJ0eSxcclxuXHRcdFx0XHRcdHZhbHVlUHJvcGVydHk6ICRhdHRycy52YWx1ZVByb3BlcnR5LFxyXG5cdFx0XHRcdFx0dGVtcGxhdGVVcmw6ICRhdHRycy50ZW1wbGF0ZVVybCB8fCAndGVtcGxhdGVzL3NlYXJjaFNlbGVjdC5odG1sJyxcclxuXHRcdFx0XHRcdGFuaW1hdGlvbjogJGF0dHJzLmFuaW1hdGlvbiB8fCAnc2xpZGUtaW4tdXAnLFxyXG5cdFx0XHRcdFx0b3B0aW9uOiBudWxsLFxyXG5cdFx0XHRcdFx0c2VhcmNodmFsdWU6IFwiXCIsXHJcblx0XHRcdFx0XHRlbmFibGVTZWFyY2g6ICRhdHRycy5lbmFibGVTZWFyY2ggPyAkYXR0cnMuZW5hYmxlU2VhcmNoID09IFwidHJ1ZVwiIDogdHJ1ZVxyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdCRpb25pY0dlc3R1cmUub24oJ3RhcCcsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCEhJHNjb3BlLnNlYXJjaFNlbGVjdC5rZXlQcm9wZXJ0eSAmJiAhISRzY29wZS5zZWFyY2hTZWxlY3QudmFsdWVQcm9wZXJ0eSkge1xyXG5cdFx0XHRcdFx0XHRpZiAoJHNjb3BlLm9wdGlvblNlbGVjdGVkKSB7XHJcblx0XHRcdFx0XHRcdFx0JHNjb3BlLnNlYXJjaFNlbGVjdC5vcHRpb24gPSAkc2NvcGUub3B0aW9uU2VsZWN0ZWRbJHNjb3BlLnNlYXJjaFNlbGVjdC5rZXlQcm9wZXJ0eV07XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQkc2NvcGUuc2VhcmNoU2VsZWN0Lm9wdGlvbiA9ICRzY29wZS5vcHRpb25TZWxlY3RlZDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdCRzY29wZS5PcGVuTW9kYWxGcm9tVGVtcGxhdGUoJHNjb3BlLnNlYXJjaFNlbGVjdC50ZW1wbGF0ZVVybCk7XHJcblx0XHRcdFx0fSwgJGVsZW1lbnQpO1xyXG5cclxuXHRcdFx0XHQkc2NvcGUuc2F2ZU9wdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGlmICghISRzY29wZS5zZWFyY2hTZWxlY3Qua2V5UHJvcGVydHkgJiYgISEkc2NvcGUuc2VhcmNoU2VsZWN0LnZhbHVlUHJvcGVydHkpIHtcclxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAkc2NvcGUub3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBjdXJyZW50T3B0aW9uID0gJHNjb3BlLm9wdGlvbnNbaV07XHJcblx0XHRcdFx0XHRcdFx0aWYgKGN1cnJlbnRPcHRpb25bJHNjb3BlLnNlYXJjaFNlbGVjdC5rZXlQcm9wZXJ0eV0gPT0gJHNjb3BlLnNlYXJjaFNlbGVjdC5vcHRpb24pIHtcclxuXHRcdFx0XHRcdFx0XHRcdCRzY29wZS5vcHRpb25TZWxlY3RlZCA9IGN1cnJlbnRPcHRpb247XHJcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQkc2NvcGUub3B0aW9uU2VsZWN0ZWQgPSAkc2NvcGUuc2VhcmNoU2VsZWN0Lm9wdGlvbjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdCRzY29wZS5zZWFyY2hTZWxlY3Quc2VhcmNodmFsdWUgPSBcIlwiO1xyXG5cdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdCRzY29wZS5jbGVhclNlYXJjaCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdCRzY29wZS5zZWFyY2hTZWxlY3Quc2VhcmNodmFsdWUgPSBcIlwiO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdCRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0JHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRpZiAoJHNjb3BlLm1vZGFsKSB7XHJcblx0XHRcdFx0XHRcdCRzY29wZS5tb2RhbC5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0JHNjb3BlLk9wZW5Nb2RhbEZyb21UZW1wbGF0ZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZVVybCkge1xyXG5cdFx0XHRcdFx0JGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKHRlbXBsYXRlVXJsLCB7XHJcblx0XHRcdFx0XHRcdHNjb3BlOiAkc2NvcGUsXHJcblx0XHRcdFx0XHRcdGFuaW1hdGlvbjogJHNjb3BlLnNlYXJjaFNlbGVjdC5hbmltYXRpb25cclxuXHRcdFx0XHRcdH0pLnRoZW4oZnVuY3Rpb24gKG1vZGFsKSB7XHJcblx0XHRcdFx0XHRcdCRzY29wZS5tb2RhbCA9IG1vZGFsO1xyXG5cdFx0XHRcdFx0XHQkc2NvcGUubW9kYWwuc2hvdygpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGFuZ3VsYXJcclxuXHRcdC5tb2R1bGUoJ0FwcCcpXHJcblx0XHQuZmFjdG9yeSgnTW9kYWxzJywgTW9kYWxzKTtcclxuXHJcblx0TW9kYWxzLiRpbmplY3QgPSBbJyRpb25pY01vZGFsJ107XHJcblx0ZnVuY3Rpb24gTW9kYWxzKCRpb25pY01vZGFsKSB7XHJcblxyXG5cdFx0dmFyIG1vZGFscyA9IFtdO1xyXG5cclxuXHRcdHZhciBfb3Blbk1vZGFsID0gZnVuY3Rpb24gKCRzY29wZSwgdGVtcGxhdGVVcmwsIGFuaW1hdGlvbikge1xyXG5cdFx0XHQkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwodGVtcGxhdGVVcmwsIHtcclxuXHRcdFx0XHRzY29wZTogJHNjb3BlLFxyXG5cdFx0XHRcdGFuaW1hdGlvbjogYW5pbWF0aW9uIHx8ICdzbGlkZS1pbi11cCcsXHJcblx0XHRcdFx0YmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlXHJcblx0XHRcdH0pLnRoZW4oZnVuY3Rpb24gKG1vZGFsKSB7XHJcblx0XHRcdFx0bW9kYWxzLnB1c2gobW9kYWwpO1xyXG5cdFx0XHRcdG1vZGFsLnNob3coKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHZhciBfY2xvc2VNb2RhbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGN1cnJlbnRNb2RhbCA9IG1vZGFscy5zcGxpY2UoLTEsIDEpWzBdO1xyXG5cdFx0XHRjdXJyZW50TW9kYWwucmVtb3ZlKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHZhciBfY2xvc2VBbGxNb2RhbHMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdG1vZGFscy5tYXAoZnVuY3Rpb24gKG1vZGFsKSB7XHJcblx0XHRcdFx0bW9kYWwucmVtb3ZlKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRtb2RhbHMgPSBbXTtcclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0b3Blbk1vZGFsOiBfb3Blbk1vZGFsLFxyXG5cdFx0XHRjbG9zZU1vZGFsOiBfY2xvc2VNb2RhbCxcclxuXHRcdFx0Y2xvc2VBbGxNb2RhbHM6IF9jbG9zZUFsbE1vZGFsc1xyXG5cdFx0fTtcclxuXHR9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGFuZ3VsYXJcclxuXHRcdC5tb2R1bGUoJ0FwcCcpXHJcblx0XHQuZmFjdG9yeSgnTW9kZWwnLCBNb2RlbCk7XHJcblxyXG5cdE1vZGVsLiRpbmplY3QgPSBbJ1VzZXJzJ107XHJcblx0ZnVuY3Rpb24gTW9kZWwoVXNlcnMpIHtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRVc2VyczogVXNlcnNcclxuXHRcdH07XHJcblx0fVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRhbmd1bGFyXHJcblx0XHQubW9kdWxlKCdBcHAnKVxyXG5cdFx0LnNlcnZpY2UoJyRzcWxpdGVTZXJ2aWNlJywgJHNxbGl0ZVNlcnZpY2UpO1xyXG5cclxuXHQkc3FsaXRlU2VydmljZS4kaW5qZWN0ID0gWyckcScsICckY29yZG92YVNRTGl0ZSddO1xyXG5cdGZ1bmN0aW9uICRzcWxpdGVTZXJ2aWNlKCRxLCAkY29yZG92YVNRTGl0ZSkge1xyXG5cclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHZhciBfZGI7XHJcblxyXG5cdFx0c2VsZi5kYiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKCFfZGIpIHtcclxuXHRcdFx0XHRpZiAod2luZG93LnNxbGl0ZVBsdWdpbiAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRfZGIgPSB3aW5kb3cuc3FsaXRlUGx1Z2luLm9wZW5EYXRhYmFzZSh7IG5hbWU6IFwicHJlLmRiXCIsIGxvY2F0aW9uOiAyLCBjcmVhdGVGcm9tTG9jYXRpb246IDEgfSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIEZvciBkZWJ1Z2dpbmcgaW4gdGhlIGJyb3dzZXJcclxuXHRcdFx0XHRcdF9kYiA9IHdpbmRvdy5vcGVuRGF0YWJhc2UoXCJwcmUuZGJcIiwgXCIxLjBcIiwgXCJEYXRhYmFzZVwiLCAyMDAwMDApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gX2RiO1xyXG5cdFx0fTtcclxuXHJcblx0XHRzZWxmLmdldEZpcnN0SXRlbSA9IGZ1bmN0aW9uIChxdWVyeSwgcGFyYW1ldGVycykge1xyXG5cdFx0XHR2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG5cdFx0XHRzZWxmLmV4ZWN1dGVTcWwocXVlcnksIHBhcmFtZXRlcnMpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG5cclxuXHRcdFx0XHRpZiAocmVzLnJvd3MubGVuZ3RoID4gMClcclxuXHRcdFx0XHRcdHJldHVybiBkZWZlcnJlZC5yZXNvbHZlKHJlcy5yb3dzLml0ZW0oMCkpO1xyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdHJldHVybiBkZWZlcnJlZC5yZWplY3QoXCJUaGVyZSBhcmVuJ3QgaXRlbXMgbWF0Y2hpbmdcIik7XHJcblx0XHRcdH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuXHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVqZWN0KGVycik7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcblx0XHR9O1xyXG5cclxuXHRcdHNlbGYuZ2V0Rmlyc3RPckRlZmF1bHRJdGVtID0gZnVuY3Rpb24gKHF1ZXJ5LCBwYXJhbWV0ZXJzKSB7XHJcblx0XHRcdHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcblx0XHRcdHNlbGYuZXhlY3V0ZVNxbChxdWVyeSwgcGFyYW1ldGVycykudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcblxyXG5cdFx0XHRcdGlmIChyZXMucm93cy5sZW5ndGggPiAwKVxyXG5cdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlc29sdmUocmVzLnJvd3MuaXRlbSgwKSk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlc29sdmUobnVsbCk7XHJcblx0XHRcdH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuXHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVqZWN0KGVycik7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcblx0XHR9O1xyXG5cclxuXHRcdHNlbGYuZ2V0SXRlbXMgPSBmdW5jdGlvbiAocXVlcnksIHBhcmFtZXRlcnMpIHtcclxuXHRcdFx0dmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHRcdFx0c2VsZi5leGVjdXRlU3FsKHF1ZXJ5LCBwYXJhbWV0ZXJzKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuXHRcdFx0XHR2YXIgaXRlbXMgPSBbXTtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHJlcy5yb3dzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRpdGVtcy5wdXNoKHJlcy5yb3dzLml0ZW0oaSkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVzb2x2ZShpdGVtcyk7XHJcblx0XHRcdH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuXHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVqZWN0KGVycik7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcblx0XHR9O1xyXG5cclxuXHRcdHNlbGYucHJlbG9hZERhdGFCYXNlID0gZnVuY3Rpb24gKGVuYWJsZUxvZykge1xyXG5cdFx0XHR2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG5cclxuXHRcdFx0Ly93aW5kb3cub3BlbihcImRhdGE6dGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04LFwiICsgSlNPTi5zdHJpbmdpZnkoeyBkYXRhOiB3aW5kb3cucXVlcmllcy5qb2luKCcnKS5yZXBsYWNlKC9cXFxcbi9nLCAnXFxuJykgfSkpO1xyXG5cdFx0XHRpZiAod2luZG93LnNxbGl0ZVBsdWdpbiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0ZW5hYmxlTG9nICYmIGNvbnNvbGUubG9nKCclYyAqKioqKioqKioqKioqKioqKiBTdGFydGluZyB0aGUgY3JlYXRpb24gb2YgdGhlIGRhdGFiYXNlIGluIHRoZSBicm93c2VyICoqKioqKioqKioqKioqKioqICcsICdiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NScpO1xyXG5cdFx0XHRcdHNlbGYuZGIoKS50cmFuc2FjdGlvbihmdW5jdGlvbiAodHgpIHtcclxuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgd2luZG93LnF1ZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0dmFyIHF1ZXJ5ID0gd2luZG93LnF1ZXJpZXNbaV0ucmVwbGFjZSgvXFxcXG4vZywgJ1xcbicpO1xyXG5cclxuXHRcdFx0XHRcdFx0ZW5hYmxlTG9nICYmIGNvbnNvbGUubG9nKHdpbmRvdy5xdWVyaWVzW2ldKTtcclxuXHRcdFx0XHRcdFx0dHguZXhlY3V0ZVNxbChxdWVyeSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcblx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyb3IpO1xyXG5cdFx0XHRcdH0sIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGVuYWJsZUxvZyAmJiBjb25zb2xlLmxvZygnJWMgKioqKioqKioqKioqKioqKiogQ29tcGxldGluZyB0aGUgY3JlYXRpb24gb2YgdGhlIGRhdGFiYXNlIGluIHRoZSBicm93c2VyICoqKioqKioqKioqKioqKioqICcsICdiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NScpO1xyXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShcIk9LXCIpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGRlZmVycmVkLnJlc29sdmUoXCJPS1wiKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcblx0XHR9O1xyXG5cclxuXHRcdHNlbGYuZXhlY3V0ZVNxbCA9IGZ1bmN0aW9uIChxdWVyeSwgcGFyYW1ldGVycykge1xyXG5cdFx0XHRyZXR1cm4gJGNvcmRvdmFTUUxpdGUuZXhlY3V0ZShzZWxmLmRiKCksIHF1ZXJ5LCBwYXJhbWV0ZXJzKTtcclxuXHRcdH07XHJcblx0fVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRhbmd1bGFyXHJcblx0XHQubW9kdWxlKCdBcHAnKVxyXG5cdFx0LmZhY3RvcnkoJ1VzZXJzJywgVXNlcnMpO1xyXG5cclxuXHRVc2Vycy4kaW5qZWN0ID0gWyckcScsICckc3FsaXRlU2VydmljZSddO1xyXG5cdGZ1bmN0aW9uIFVzZXJzKCRxLCAkc3FsaXRlU2VydmljZSkge1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGdldEFsbDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHZhciBxdWVyeSA9IFwiU2VsZWN0ICogRlJPTSBVc2Vyc1wiO1xyXG5cdFx0XHRcdHJldHVybiAkcS53aGVuKCRzcWxpdGVTZXJ2aWNlLmdldEl0ZW1zKHF1ZXJ5KSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGFkZDogZnVuY3Rpb24gKHVzZXIpIHtcclxuXHRcdFx0XHR2YXIgcXVlcnkgPSBcIklOU0VSVCBJTlRPIFVzZXJzIChOYW1lKSBWQUxVRVMgKD8pXCI7XHJcblx0XHRcdFx0cmV0dXJuICRxLndoZW4oJHNxbGl0ZVNlcnZpY2UuZXhlY3V0ZVNxbChxdWVyeSwgW3VzZXIuTmFtZV0pKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
