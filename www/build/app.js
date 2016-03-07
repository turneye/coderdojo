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
    
    if (ionic.Platform.isIOS()) {
        $ionicConfigProvider.scrolling.jsScrolling(true);
    }
    
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "templates/home.html",
            controller: 'HomeController'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImlzc3Vlcy5qcyIsInF1ZXJpZXMuanMiLCJjb250cm9sbGVycy9ob21lLmpzIiwiZGlyZWN0aXZlcy9ob2xkTGlzdC5qcyIsImRpcmVjdGl2ZXMvbXVsdGlwbGVTZWxlY3QuanMiLCJkaXJlY3RpdmVzL3NlYXJjaFNlbGVjdC5qcyIsInNlcnZpY2VzL21vZGFscy5qcyIsInNlcnZpY2VzL21vZGVsLmpzIiwic2VydmljZXMvc3FsaXRlLmpzIiwic2VydmljZXMvdXNlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdBcHAnIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG5hbmd1bGFyLm1vZHVsZSgnQXBwJywgWydpb25pYycsICduZ0NvcmRvdmEnLCAnbmdBbmltYXRlJ10pXG5cbi5ydW4oWyckaW9uaWNQbGF0Zm9ybScsIFxuXHRcdFx0JyRzcWxpdGVTZXJ2aWNlJyxcbiAgICAgIGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtLCAkc3FsaXRlU2VydmljZSkge1xuICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBpZih3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgfVxuICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICB9XG5cdFx0XG5cdFx0Ly9Mb2FkIHRoZSBQcmUtcG9wdWxhdGVkIGRhdGFiYXNlLCBkZWJ1ZyA9IHRydWVcblx0XHQkc3FsaXRlU2VydmljZS5wcmVsb2FkRGF0YUJhc2UodHJ1ZSk7XG4gIH0pO1xufV0pXG4uY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLFxuICAgICAgICAgJyR1cmxSb3V0ZXJQcm92aWRlcicsXG4gICAgICAgICAnJGlvbmljQ29uZmlnUHJvdmlkZXInLFxuICAgICAgICAgJyRjb21waWxlUHJvdmlkZXInLFxuICAgICAgICAgZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRpb25pY0NvbmZpZ1Byb3ZpZGVyLCAkY29tcGlsZVByb3ZpZGVyKSB7XG5cbiAgICAkY29tcGlsZVByb3ZpZGVyLmltZ1NyY1Nhbml0aXphdGlvbldoaXRlbGlzdCgvXlxccyooaHR0cHM/fGZ0cHxmaWxlfGJsb2J8Y29udGVudHxtcy1hcHB4fHgtd21hcHAwKTp8ZGF0YTppbWFnZVxcL3xpbWdcXC8vKTtcbiAgICAkY29tcGlsZVByb3ZpZGVyLmFIcmVmU2FuaXRpemF0aW9uV2hpdGVsaXN0KC9eXFxzKihodHRwcz98ZnRwfG1haWx0b3xmaWxlfGdodHRwcz98bXMtYXBweHx4LXdtYXBwMCk6Lyk7XG4gICAgXG4gICAgaWYgKGlvbmljLlBsYXRmb3JtLmlzSU9TKCkpIHtcbiAgICAgICAgJGlvbmljQ29uZmlnUHJvdmlkZXIuc2Nyb2xsaW5nLmpzU2Nyb2xsaW5nKHRydWUpO1xuICAgIH1cbiAgICBcbiAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgICAgICB1cmw6IFwiL2hvbWVcIixcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy9ob21lLmh0bWxcIixcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ29udHJvbGxlcidcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoZnVuY3Rpb24gKCRpbmplY3RvciwgJGxvY2F0aW9uKSB7XG4gICAgICAgIHZhciAkc3RhdGUgPSAkaW5qZWN0b3IuZ2V0KFwiJHN0YXRlXCIpO1xuICAgICAgICAkc3RhdGUuZ28oXCJob21lXCIpO1xuICAgIH0pO1xufV0pO1xuIiwiLyogZ2xvYmFsIGlvbmljICovXG4oZnVuY3Rpb24gKGFuZ3VsYXIsIGlvbmljKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGlvbmljLlBsYXRmb3JtLmlzSUUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIGlvbmljLlBsYXRmb3JtLnVhLnRvTG93ZXJDYXNlKCkuaW5kZXhPZigndHJpZGVudCcpID4gLTE7XG5cdH1cblxuXHRpZiAoaW9uaWMuUGxhdGZvcm0uaXNJRSgpKSB7XG5cdFx0YW5ndWxhci5tb2R1bGUoJ2lvbmljJylcblx0XHRcdC5mYWN0b3J5KCckaW9uaWNOZ0NsaWNrJywgWyckcGFyc2UnLCAnJHRpbWVvdXQnLCBmdW5jdGlvbiAoJHBhcnNlLCAkdGltZW91dCkge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBjbGlja0V4cHIpIHtcblx0XHRcdFx0XHR2YXIgY2xpY2tIYW5kbGVyID0gYW5ndWxhci5pc0Z1bmN0aW9uKGNsaWNrRXhwcikgPyBjbGlja0V4cHIgOiAkcGFyc2UoY2xpY2tFeHByKTtcblxuXHRcdFx0XHRcdGVsZW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRpZiAoc2NvcGUuY2xpY2t0aW1lcikgcmV0dXJuOyAvLyBTZWNvbmQgY2FsbFxuXHRcdFx0XHRcdFx0XHRjbGlja0hhbmRsZXIoc2NvcGUsIHsgJGV2ZW50OiAoZXZlbnQpIH0pO1xuXHRcdFx0XHRcdFx0XHRzY29wZS5jbGlja3RpbWVyID0gJHRpbWVvdXQoZnVuY3Rpb24gKCkgeyBkZWxldGUgc2NvcGUuY2xpY2t0aW1lcjsgfSwgMSwgZmFsc2UpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvLyBIYWNrIGZvciBpT1MgU2FmYXJpJ3MgYmVuZWZpdC4gSXQgZ29lcyBzZWFyY2hpbmcgZm9yIG9uY2xpY2sgaGFuZGxlcnMgYW5kIGlzIGxpYWJsZSB0byBjbGlja1xuXHRcdFx0XHRcdC8vIHNvbWV0aGluZyBlbHNlIG5lYXJieS5cblx0XHRcdFx0XHRlbGVtZW50Lm9uY2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHsgfTtcblx0XHRcdFx0fTtcblx0XHRcdH1dKTtcblx0fVxuXG5cdGZ1bmN0aW9uIFNlbGVjdERpcmVjdGl2ZSgpIHtcblx0XHQndXNlIHN0cmljdCc7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdFJyxcblx0XHRcdHJlcGxhY2U6IGZhbHNlLFxuXHRcdFx0bGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50KSB7XG5cdFx0XHRcdGlmIChpb25pYy5QbGF0Zm9ybSAmJiAoaW9uaWMuUGxhdGZvcm0uaXNXaW5kb3dzUGhvbmUoKSB8fCBpb25pYy5QbGF0Zm9ybS5pc0lFKCkgfHwgaW9uaWMuUGxhdGZvcm0ucGxhdGZvcm0oKSA9PT0gXCJlZGdlXCIpKSB7XG5cdFx0XHRcdFx0ZWxlbWVudC5hdHRyKCdkYXRhLXRhcC1kaXNhYmxlZCcsICd0cnVlJyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHR9XG5cblx0YW5ndWxhci5tb2R1bGUoJ2lvbmljJylcbiAgICAuZGlyZWN0aXZlKCdzZWxlY3QnLCBTZWxlY3REaXJlY3RpdmUpO1xuXG5cdC8qYW5ndWxhci5tb2R1bGUoJ2lvbmljLWRhdGVwaWNrZXInKVxuXHQuZGlyZWN0aXZlKCdzZWxlY3QnLCBTZWxlY3REaXJlY3RpdmUpOyovXG5cbn0pKGFuZ3VsYXIsIGlvbmljKTsiLCJ3aW5kb3cucXVlcmllcyA9IFtcblx0Ly9Ecm9wIHRhYmxlc1xuICAgXCJEUk9QIFRBQkxFIElGIEVYSVNUUyBVc2VycztcIixcblx0Ly9DcmVhdGUgdGFibGVzXG5cdFwiQ1JFQVRFIFRBQkxFIFVzZXJzIChJZFVzZXIgaW50ZWdlciBwcmltYXJ5IGtleSBhdXRvaW5jcmVtZW50LCBOYW1lIHRleHQgbm90IG51bGwpO1wiLFxuXHQvL0luc2VydCBVc2Vyc1xuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnSnVhbiBEYXZpZCBOaWNob2xscyBDYXJkb25hJyk7XCIsXG5cdFwiSU5TRVJUIElOVE8gJ1VzZXJzJyAoJ05hbWUnKSBWQUxVRVMgKCdLaHJpenRpYW4gTW9yZW5vIFp1bHVhZ2EnKTtcIixcblx0XCJJTlNFUlQgSU5UTyAnVXNlcnMnICgnTmFtZScpIFZBTFVFUyAoJ0NyaXN0aWFuIFJpdmFzIEJ1aXRyYWdvJyk7XCIsXG5cdFwiSU5TRVJUIElOVE8gJ1VzZXJzJyAoJ05hbWUnKSBWQUxVRVMgKCdKdWFuIERhdmlkIFPDoW5jaGV6Jyk7XCIsXG5cdFwiSU5TRVJUIElOVE8gJ1VzZXJzJyAoJ05hbWUnKSBWQUxVRVMgKCdOaWNvbGFzIE1vbGluYScpO1wiLFxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnTWl5YW1vdG8gTXVzYXNoaSBGSWxhbmRlcicpO1wiLFxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnRGlkaWVyIEhlcm5hbmRleicpO1wiLFxuICAgIFwiSU5TRVJUIElOVE8gJ1VzZXJzJyAoJ05hbWUnKSBWQUxVRVMgKCdMdWlzIEVkdWFyZG8gT3F1ZW5kbyBQw6lyZXonKTtcIixcbiAgICBcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnQ2FybG9zIFJvamFzJyk7XCIsXG4gICAgXCJJTlNFUlQgSU5UTyAnVXNlcnMnICgnTmFtZScpIFZBTFVFUyAoJ0xldmFubyBDYXN0aWxsYSBDYXJsb3MgTWlndWVsJyk7XCJcbl07IiwiKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXJcblx0XHQubW9kdWxlKCdBcHAnKVxuXHRcdC5jb250cm9sbGVyKCdIb21lQ29udHJvbGxlcicsIEhvbWVDb250cm9sbGVyKTtcblxuXHRIb21lQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGlvbmljUG9wdXAnLCAnTW9kYWxzJywgJ01vZGVsJ107XG5cdGZ1bmN0aW9uIEhvbWVDb250cm9sbGVyKCRzY29wZSwgJGlvbmljUG9wdXAsIE1vZGFscywgTW9kZWwpIHtcblxuXHRcdCRzY29wZS51c2VycyA9IFtdO1xuXG5cdFx0JHNjb3BlLkhlbGxvV29ybGQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHQkaW9uaWNQb3B1cC5hbGVydCh7XG5cdFx0XHRcdHRpdGxlOiAnSGVsbG8gV29ybGQnLFxuXHRcdFx0XHR0ZW1wbGF0ZTogJ1RoaXMgaXMgdGhlIGJlc3QgdGVtcGxhdGUgdG8gc3RhcnQgd2l0aCBJb25pYyBGcmFtZXdvcmshJyxcbiAgICAgXHRcdGNzc0NsYXNzOiAnYW5pbWF0ZWQgYm91bmNlSW5Eb3duJ1xuXHRcdFx0fSk7XG5cdFx0fTtcblx0XHRcblx0XHQkc2NvcGUuc2hvd1VzZXJzID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0TW9kZWwuVXNlcnMuZ2V0QWxsKCkudGhlbihmdW5jdGlvbiAodXNlcnMpIHtcblx0XHRcdFx0JHNjb3BlLnVzZXJzID0gYW5ndWxhci5jb3B5KHVzZXJzKTtcblx0XHRcdH0pO1xuXHRcdFx0TW9kYWxzLm9wZW5Nb2RhbCgkc2NvcGUsICd0ZW1wbGF0ZXMvbW9kYWxzL3VzZXJzLmh0bWwnLCAnYW5pbWF0ZWQgcm90YXRlSW5Eb3duTGVmdCcpO1xuXHRcdH07XG5cdFx0XG5cdFx0JHNjb3BlLmNsb3NlTW9kYWwgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRNb2RhbHMuY2xvc2VNb2RhbCgpO1xuXHRcdFx0JHNjb3BlLnVzZXJzID0gW107XG5cdFx0fTtcblx0fVxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhclxuXHRcdC5tb2R1bGUoJ0FwcCcpXG5cdFx0LmRpcmVjdGl2ZSgnaG9sZExpc3QnLCBob2xkTGlzdCk7XG5cblx0aG9sZExpc3QuJGluamVjdCA9IFsnJGlvbmljR2VzdHVyZSddO1xuXHRmdW5jdGlvbiBob2xkTGlzdCgkaW9uaWNHZXN0dXJlKSB7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdBJyxcblx0XHRcdGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblx0XHRcdFx0JGlvbmljR2VzdHVyZS5vbignaG9sZCcsIGZ1bmN0aW9uIChlKSB7XG5cblx0XHRcdFx0XHR2YXIgY29udGVudCA9IGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLml0ZW0tY29udGVudCcpO1xuXG5cdFx0XHRcdFx0dmFyIGJ1dHRvbnMgPSBlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5pdGVtLW9wdGlvbnMnKTtcblx0XHRcdFx0XHR2YXIgYnV0dG9uc1dpZHRoID0gYnV0dG9ucy5vZmZzZXRXaWR0aDtcblxuXHRcdFx0XHRcdGlvbmljLnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRjb250ZW50LnN0eWxlW2lvbmljLkNTUy5UUkFOU0lUSU9OXSA9ICdhbGwgZWFzZS1vdXQgLjI1cyc7XG5cblx0XHRcdFx0XHRcdGlmICghYnV0dG9ucy5jbGFzc0xpc3QuY29udGFpbnMoJ2ludmlzaWJsZScpKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRlbnQuc3R5bGVbaW9uaWMuQ1NTLlRSQU5TRk9STV0gPSAnJztcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0YnV0dG9ucy5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKTtcblx0XHRcdFx0XHRcdFx0fSwgMjUwKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGJ1dHRvbnMuY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJyk7XG5cdFx0XHRcdFx0XHRcdGNvbnRlbnQuc3R5bGVbaW9uaWMuQ1NTLlRSQU5TRk9STV0gPSAndHJhbnNsYXRlM2QoLScgKyBidXR0b25zV2lkdGggKyAncHgsIDAsIDApJztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblxuXG5cdFx0XHRcdH0sIGVsZW1lbnQpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXJcblx0XHQubW9kdWxlKCdBcHAnKVxuXHRcdC5kaXJlY3RpdmUoJ2lvbk11bHRpcGxlU2VsZWN0JywgaW9uTXVsdGlwbGVTZWxlY3QpO1xuXG5cdGlvbk11bHRpcGxlU2VsZWN0LiRpbmplY3QgPSBbJyRpb25pY01vZGFsJywgJyRpb25pY0dlc3R1cmUnXTtcblx0ZnVuY3Rpb24gaW9uTXVsdGlwbGVTZWxlY3QoJGlvbmljTW9kYWwsICRpb25pY0dlc3R1cmUpIHtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0b3B0aW9uczogXCI9XCJcblx0XHRcdH0sXG5cdFx0XHRjb250cm9sbGVyOiBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XG5cdFx0XHRcdCRzY29wZS5tdWx0aXBsZVNlbGVjdCA9IHtcblx0XHRcdFx0XHR0aXRsZTogJGF0dHJzLnRpdGxlIHx8IFwiU2VsZWN0IE9wdGlvbnNcIixcblx0XHRcdFx0XHR0ZW1wT3B0aW9uczogW10sXG5cdFx0XHRcdFx0a2V5UHJvcGVydHk6ICRhdHRycy5rZXlQcm9wZXJ0eSB8fCBcImlkXCIsXG5cdFx0XHRcdFx0dmFsdWVQcm9wZXJ0eTogJGF0dHJzLnZhbHVlUHJvcGVydHkgfHwgXCJ2YWx1ZVwiLFxuXHRcdFx0XHRcdHNlbGVjdGVkUHJvcGVydHk6ICRhdHRycy5zZWxlY3RlZFByb3BlcnR5IHx8IFwic2VsZWN0ZWRcIixcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogJGF0dHJzLnRlbXBsYXRlVXJsIHx8ICd0ZW1wbGF0ZXMvbXVsdGlwbGVTZWxlY3QuaHRtbCcsXG5cdFx0XHRcdFx0cmVuZGVyQ2hlY2tib3g6ICRhdHRycy5yZW5kZXJDaGVja2JveCA/ICRhdHRycy5yZW5kZXJDaGVja2JveCA9PSBcInRydWVcIiA6IHRydWUsXG5cdFx0XHRcdFx0YW5pbWF0aW9uOiAkYXR0cnMuYW5pbWF0aW9uIHx8ICdzbGlkZS1pbi11cCdcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQkc2NvcGUuT3Blbk1vZGFsRnJvbVRlbXBsYXRlID0gZnVuY3Rpb24gKHRlbXBsYXRlVXJsKSB7XG5cdFx0XHRcdFx0JGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKHRlbXBsYXRlVXJsLCB7XG5cdFx0XHRcdFx0XHRzY29wZTogJHNjb3BlLFxuXHRcdFx0XHRcdFx0YW5pbWF0aW9uOiAkc2NvcGUubXVsdGlwbGVTZWxlY3QuYW5pbWF0aW9uXG5cdFx0XHRcdFx0fSkudGhlbihmdW5jdGlvbiAobW9kYWwpIHtcblx0XHRcdFx0XHRcdCRzY29wZS5tb2RhbCA9IG1vZGFsO1xuXHRcdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnNob3coKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQkaW9uaWNHZXN0dXJlLm9uKCd0YXAnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdCRzY29wZS5tdWx0aXBsZVNlbGVjdC50ZW1wT3B0aW9ucyA9ICRzY29wZS5vcHRpb25zLm1hcChmdW5jdGlvbiAob3B0aW9uKSB7XG5cdFx0XHRcdFx0XHR2YXIgdGVtcE9wdGlvbiA9IHt9O1xuXHRcdFx0XHRcdFx0dGVtcE9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3Qua2V5UHJvcGVydHldID0gb3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC5rZXlQcm9wZXJ0eV07XG5cdFx0XHRcdFx0XHR0ZW1wT3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC52YWx1ZVByb3BlcnR5XSA9IG9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3QudmFsdWVQcm9wZXJ0eV07XG5cdFx0XHRcdFx0XHR0ZW1wT3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC5zZWxlY3RlZFByb3BlcnR5XSA9IG9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3Quc2VsZWN0ZWRQcm9wZXJ0eV07XG5cblx0XHRcdFx0XHRcdHJldHVybiB0ZW1wT3B0aW9uO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdCRzY29wZS5PcGVuTW9kYWxGcm9tVGVtcGxhdGUoJHNjb3BlLm11bHRpcGxlU2VsZWN0LnRlbXBsYXRlVXJsKTtcblx0XHRcdFx0fSwgJGVsZW1lbnQpO1xuXG5cdFx0XHRcdCRzY29wZS5zYXZlT3B0aW9ucyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8ICRzY29wZS5tdWx0aXBsZVNlbGVjdC50ZW1wT3B0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0dmFyIHRlbXBPcHRpb24gPSAkc2NvcGUubXVsdGlwbGVTZWxlY3QudGVtcE9wdGlvbnNbaV07XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8ICRzY29wZS5vcHRpb25zLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBvcHRpb24gPSAkc2NvcGUub3B0aW9uc1tqXTtcblx0XHRcdFx0XHRcdFx0aWYgKHRlbXBPcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LmtleVByb3BlcnR5XSA9PSBvcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LmtleVByb3BlcnR5XSkge1xuXHRcdFx0XHRcdFx0XHRcdG9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3Quc2VsZWN0ZWRQcm9wZXJ0eV0gPSB0ZW1wT3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC5zZWxlY3RlZFByb3BlcnR5XTtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQkc2NvcGUuY2xvc2VNb2RhbCgpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdCRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCRzY29wZS5tb2RhbC5yZW1vdmUoKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0JHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aWYgKCRzY29wZS5tb2RhbCkge1xuXHRcdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhclxuXHRcdC5tb2R1bGUoJ0FwcCcpXG5cdFx0LmRpcmVjdGl2ZSgnaW9uU2VhcmNoU2VsZWN0JywgaW9uU2VhcmNoU2VsZWN0KTtcblxuXHRpb25TZWFyY2hTZWxlY3QuJGluamVjdCA9IFsnJGlvbmljTW9kYWwnLCAnJGlvbmljR2VzdHVyZSddO1xuXHRmdW5jdGlvbiBpb25TZWFyY2hTZWxlY3QoJGlvbmljTW9kYWwsICRpb25pY0dlc3R1cmUpIHtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0b3B0aW9uczogXCI9XCIsXG5cdFx0XHRcdG9wdGlvblNlbGVjdGVkOiBcIj1cIlxuXHRcdFx0fSxcblx0XHRcdGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcblx0XHRcdFx0JHNjb3BlLnNlYXJjaFNlbGVjdCA9IHtcblx0XHRcdFx0XHR0aXRsZTogJGF0dHJzLnRpdGxlIHx8IFwiU2VhcmNoXCIsXG5cdFx0XHRcdFx0a2V5UHJvcGVydHk6ICRhdHRycy5rZXlQcm9wZXJ0eSxcblx0XHRcdFx0XHR2YWx1ZVByb3BlcnR5OiAkYXR0cnMudmFsdWVQcm9wZXJ0eSxcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogJGF0dHJzLnRlbXBsYXRlVXJsIHx8ICd0ZW1wbGF0ZXMvc2VhcmNoU2VsZWN0Lmh0bWwnLFxuXHRcdFx0XHRcdGFuaW1hdGlvbjogJGF0dHJzLmFuaW1hdGlvbiB8fCAnc2xpZGUtaW4tdXAnLFxuXHRcdFx0XHRcdG9wdGlvbjogbnVsbCxcblx0XHRcdFx0XHRzZWFyY2h2YWx1ZTogXCJcIixcblx0XHRcdFx0XHRlbmFibGVTZWFyY2g6ICRhdHRycy5lbmFibGVTZWFyY2ggPyAkYXR0cnMuZW5hYmxlU2VhcmNoID09IFwidHJ1ZVwiIDogdHJ1ZVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdCRpb25pY0dlc3R1cmUub24oJ3RhcCcsIGZ1bmN0aW9uIChlKSB7XG5cblx0XHRcdFx0XHRpZiAoISEkc2NvcGUuc2VhcmNoU2VsZWN0LmtleVByb3BlcnR5ICYmICEhJHNjb3BlLnNlYXJjaFNlbGVjdC52YWx1ZVByb3BlcnR5KSB7XG5cdFx0XHRcdFx0XHRpZiAoJHNjb3BlLm9wdGlvblNlbGVjdGVkKSB7XG5cdFx0XHRcdFx0XHRcdCRzY29wZS5zZWFyY2hTZWxlY3Qub3B0aW9uID0gJHNjb3BlLm9wdGlvblNlbGVjdGVkWyRzY29wZS5zZWFyY2hTZWxlY3Qua2V5UHJvcGVydHldO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdCRzY29wZS5zZWFyY2hTZWxlY3Qub3B0aW9uID0gJHNjb3BlLm9wdGlvblNlbGVjdGVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQkc2NvcGUuT3Blbk1vZGFsRnJvbVRlbXBsYXRlKCRzY29wZS5zZWFyY2hTZWxlY3QudGVtcGxhdGVVcmwpO1xuXHRcdFx0XHR9LCAkZWxlbWVudCk7XG5cblx0XHRcdFx0JHNjb3BlLnNhdmVPcHRpb24gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aWYgKCEhJHNjb3BlLnNlYXJjaFNlbGVjdC5rZXlQcm9wZXJ0eSAmJiAhISRzY29wZS5zZWFyY2hTZWxlY3QudmFsdWVQcm9wZXJ0eSkge1xuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAkc2NvcGUub3B0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHR2YXIgY3VycmVudE9wdGlvbiA9ICRzY29wZS5vcHRpb25zW2ldO1xuXHRcdFx0XHRcdFx0XHRpZiAoY3VycmVudE9wdGlvblskc2NvcGUuc2VhcmNoU2VsZWN0LmtleVByb3BlcnR5XSA9PSAkc2NvcGUuc2VhcmNoU2VsZWN0Lm9wdGlvbikge1xuXHRcdFx0XHRcdFx0XHRcdCRzY29wZS5vcHRpb25TZWxlY3RlZCA9IGN1cnJlbnRPcHRpb247XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHQkc2NvcGUub3B0aW9uU2VsZWN0ZWQgPSAkc2NvcGUuc2VhcmNoU2VsZWN0Lm9wdGlvbjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0JHNjb3BlLnNlYXJjaFNlbGVjdC5zZWFyY2h2YWx1ZSA9IFwiXCI7XG5cdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdCRzY29wZS5jbGVhclNlYXJjaCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkc2NvcGUuc2VhcmNoU2VsZWN0LnNlYXJjaHZhbHVlID0gXCJcIjtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkc2NvcGUubW9kYWwucmVtb3ZlKCk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdCRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlmICgkc2NvcGUubW9kYWwpIHtcblx0XHRcdFx0XHRcdCRzY29wZS5tb2RhbC5yZW1vdmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdCRzY29wZS5PcGVuTW9kYWxGcm9tVGVtcGxhdGUgPSBmdW5jdGlvbiAodGVtcGxhdGVVcmwpIHtcblx0XHRcdFx0XHQkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwodGVtcGxhdGVVcmwsIHtcblx0XHRcdFx0XHRcdHNjb3BlOiAkc2NvcGUsXG5cdFx0XHRcdFx0XHRhbmltYXRpb246ICRzY29wZS5zZWFyY2hTZWxlY3QuYW5pbWF0aW9uXG5cdFx0XHRcdFx0fSkudGhlbihmdW5jdGlvbiAobW9kYWwpIHtcblx0XHRcdFx0XHRcdCRzY29wZS5tb2RhbCA9IG1vZGFsO1xuXHRcdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnNob3coKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyXG5cdFx0Lm1vZHVsZSgnQXBwJylcblx0XHQuZmFjdG9yeSgnTW9kYWxzJywgTW9kYWxzKTtcblxuXHRNb2RhbHMuJGluamVjdCA9IFsnJGlvbmljTW9kYWwnXTtcblx0ZnVuY3Rpb24gTW9kYWxzKCRpb25pY01vZGFsKSB7XG5cblx0XHR2YXIgbW9kYWxzID0gW107XG5cblx0XHR2YXIgX29wZW5Nb2RhbCA9IGZ1bmN0aW9uICgkc2NvcGUsIHRlbXBsYXRlVXJsLCBhbmltYXRpb24pIHtcblx0XHRcdCRpb25pY01vZGFsLmZyb21UZW1wbGF0ZVVybCh0ZW1wbGF0ZVVybCwge1xuXHRcdFx0XHRzY29wZTogJHNjb3BlLFxuXHRcdFx0XHRhbmltYXRpb246IGFuaW1hdGlvbiB8fCAnc2xpZGUtaW4tdXAnLFxuXHRcdFx0XHRiYWNrZHJvcENsaWNrVG9DbG9zZTogZmFsc2Vcblx0XHRcdH0pLnRoZW4oZnVuY3Rpb24gKG1vZGFsKSB7XG5cdFx0XHRcdG1vZGFscy5wdXNoKG1vZGFsKTtcblx0XHRcdFx0bW9kYWwuc2hvdygpO1xuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdHZhciBfY2xvc2VNb2RhbCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBjdXJyZW50TW9kYWwgPSBtb2RhbHMuc3BsaWNlKC0xLCAxKVswXTtcblx0XHRcdGN1cnJlbnRNb2RhbC5yZW1vdmUoKTtcblx0XHR9O1xuXG5cdFx0dmFyIF9jbG9zZUFsbE1vZGFscyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdG1vZGFscy5tYXAoZnVuY3Rpb24gKG1vZGFsKSB7XG5cdFx0XHRcdG1vZGFsLnJlbW92ZSgpO1xuXHRcdFx0fSk7XG5cdFx0XHRtb2RhbHMgPSBbXTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdG9wZW5Nb2RhbDogX29wZW5Nb2RhbCxcblx0XHRcdGNsb3NlTW9kYWw6IF9jbG9zZU1vZGFsLFxuXHRcdFx0Y2xvc2VBbGxNb2RhbHM6IF9jbG9zZUFsbE1vZGFsc1xuXHRcdH07XG5cdH1cbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXJcblx0XHQubW9kdWxlKCdBcHAnKVxuXHRcdC5mYWN0b3J5KCdNb2RlbCcsIE1vZGVsKTtcblxuXHRNb2RlbC4kaW5qZWN0ID0gWydVc2VycyddO1xuXHRmdW5jdGlvbiBNb2RlbChVc2Vycykge1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdFVzZXJzOiBVc2Vyc1xuXHRcdH07XG5cdH1cbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXJcblx0XHQubW9kdWxlKCdBcHAnKVxuXHRcdC5zZXJ2aWNlKCckc3FsaXRlU2VydmljZScsICRzcWxpdGVTZXJ2aWNlKTtcblxuXHQkc3FsaXRlU2VydmljZS4kaW5qZWN0ID0gWyckcScsICckY29yZG92YVNRTGl0ZSddO1xuXHRmdW5jdGlvbiAkc3FsaXRlU2VydmljZSgkcSwgJGNvcmRvdmFTUUxpdGUpIHtcblxuXHRcdHZhciBzZWxmID0gdGhpcztcblx0XHR2YXIgX2RiO1xuXG5cdFx0c2VsZi5kYiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICghX2RiKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuc3FsaXRlUGx1Z2luICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRfZGIgPSB3aW5kb3cuc3FsaXRlUGx1Z2luLm9wZW5EYXRhYmFzZSh7IG5hbWU6IFwicHJlLmRiXCIsIGxvY2F0aW9uOiAyLCBjcmVhdGVGcm9tTG9jYXRpb246IDEgfSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gRm9yIGRlYnVnZ2luZyBpbiB0aGUgYnJvd3NlclxuXHRcdFx0XHRcdF9kYiA9IHdpbmRvdy5vcGVuRGF0YWJhc2UoXCJwcmUuZGJcIiwgXCIxLjBcIiwgXCJEYXRhYmFzZVwiLCAyMDAwMDApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gX2RiO1xuXHRcdH07XG5cblx0XHRzZWxmLmdldEZpcnN0SXRlbSA9IGZ1bmN0aW9uIChxdWVyeSwgcGFyYW1ldGVycykge1xuXHRcdFx0dmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblx0XHRcdHNlbGYuZXhlY3V0ZVNxbChxdWVyeSwgcGFyYW1ldGVycykudGhlbihmdW5jdGlvbiAocmVzKSB7XG5cblx0XHRcdFx0aWYgKHJlcy5yb3dzLmxlbmd0aCA+IDApXG5cdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlc29sdmUocmVzLnJvd3MuaXRlbSgwKSk7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVqZWN0KFwiVGhlcmUgYXJlbid0IGl0ZW1zIG1hdGNoaW5nXCIpO1xuXHRcdFx0fSwgZnVuY3Rpb24gKGVycikge1xuXHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVqZWN0KGVycik7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG5cdFx0fTtcblxuXHRcdHNlbGYuZ2V0Rmlyc3RPckRlZmF1bHRJdGVtID0gZnVuY3Rpb24gKHF1ZXJ5LCBwYXJhbWV0ZXJzKSB7XG5cdFx0XHR2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXHRcdFx0c2VsZi5leGVjdXRlU3FsKHF1ZXJ5LCBwYXJhbWV0ZXJzKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcblxuXHRcdFx0XHRpZiAocmVzLnJvd3MubGVuZ3RoID4gMClcblx0XHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVzb2x2ZShyZXMucm93cy5pdGVtKDApKTtcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHJldHVybiBkZWZlcnJlZC5yZXNvbHZlKG51bGwpO1xuXHRcdFx0fSwgZnVuY3Rpb24gKGVycikge1xuXHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVqZWN0KGVycik7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG5cdFx0fTtcblxuXHRcdHNlbGYuZ2V0SXRlbXMgPSBmdW5jdGlvbiAocXVlcnksIHBhcmFtZXRlcnMpIHtcblx0XHRcdHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cdFx0XHRzZWxmLmV4ZWN1dGVTcWwocXVlcnksIHBhcmFtZXRlcnMpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuXHRcdFx0XHR2YXIgaXRlbXMgPSBbXTtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCByZXMucm93cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGl0ZW1zLnB1c2gocmVzLnJvd3MuaXRlbShpKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlc29sdmUoaXRlbXMpO1xuXHRcdFx0fSwgZnVuY3Rpb24gKGVycikge1xuXHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVqZWN0KGVycik7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG5cdFx0fTtcblxuXHRcdHNlbGYucHJlbG9hZERhdGFCYXNlID0gZnVuY3Rpb24gKGVuYWJsZUxvZykge1xuXHRcdFx0dmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuXHRcdFx0Ly93aW5kb3cub3BlbihcImRhdGE6dGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04LFwiICsgSlNPTi5zdHJpbmdpZnkoeyBkYXRhOiB3aW5kb3cucXVlcmllcy5qb2luKCcnKS5yZXBsYWNlKC9cXFxcbi9nLCAnXFxuJykgfSkpO1xuXHRcdFx0aWYgKHdpbmRvdy5zcWxpdGVQbHVnaW4gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRlbmFibGVMb2cgJiYgY29uc29sZS5sb2coJyVjICoqKioqKioqKioqKioqKioqIFN0YXJ0aW5nIHRoZSBjcmVhdGlvbiBvZiB0aGUgZGF0YWJhc2UgaW4gdGhlIGJyb3dzZXIgKioqKioqKioqKioqKioqKiogJywgJ2JhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1Jyk7XG5cdFx0XHRcdHNlbGYuZGIoKS50cmFuc2FjdGlvbihmdW5jdGlvbiAodHgpIHtcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHdpbmRvdy5xdWVyaWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHR2YXIgcXVlcnkgPSB3aW5kb3cucXVlcmllc1tpXS5yZXBsYWNlKC9cXFxcbi9nLCAnXFxuJyk7XG5cblx0XHRcdFx0XHRcdGVuYWJsZUxvZyAmJiBjb25zb2xlLmxvZyh3aW5kb3cucXVlcmllc1tpXSk7XG5cdFx0XHRcdFx0XHR0eC5leGVjdXRlU3FsKHF1ZXJ5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sIGZ1bmN0aW9uIChlcnJvcikge1xuXHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnJvcik7XG5cdFx0XHRcdH0sIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRlbmFibGVMb2cgJiYgY29uc29sZS5sb2coJyVjICoqKioqKioqKioqKioqKioqIENvbXBsZXRpbmcgdGhlIGNyZWF0aW9uIG9mIHRoZSBkYXRhYmFzZSBpbiB0aGUgYnJvd3NlciAqKioqKioqKioqKioqKioqKiAnLCAnYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNiYWRhNTUnKTtcblx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKFwiT0tcIik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGRlZmVycmVkLnJlc29sdmUoXCJPS1wiKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG5cdFx0fTtcblxuXHRcdHNlbGYuZXhlY3V0ZVNxbCA9IGZ1bmN0aW9uIChxdWVyeSwgcGFyYW1ldGVycykge1xuXHRcdFx0cmV0dXJuICRjb3Jkb3ZhU1FMaXRlLmV4ZWN1dGUoc2VsZi5kYigpLCBxdWVyeSwgcGFyYW1ldGVycyk7XG5cdFx0fTtcblx0fVxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhclxuXHRcdC5tb2R1bGUoJ0FwcCcpXG5cdFx0LmZhY3RvcnkoJ1VzZXJzJywgVXNlcnMpO1xuXG5cdFVzZXJzLiRpbmplY3QgPSBbJyRxJywgJyRzcWxpdGVTZXJ2aWNlJ107XG5cdGZ1bmN0aW9uIFVzZXJzKCRxLCAkc3FsaXRlU2VydmljZSkge1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGdldEFsbDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR2YXIgcXVlcnkgPSBcIlNlbGVjdCAqIEZST00gVXNlcnNcIjtcblx0XHRcdFx0cmV0dXJuICRxLndoZW4oJHNxbGl0ZVNlcnZpY2UuZ2V0SXRlbXMocXVlcnkpKTtcblx0XHRcdH0sXG5cdFx0XHRhZGQ6IGZ1bmN0aW9uICh1c2VyKSB7XG5cdFx0XHRcdHZhciBxdWVyeSA9IFwiSU5TRVJUIElOVE8gVXNlcnMgKE5hbWUpIFZBTFVFUyAoPylcIjtcblx0XHRcdFx0cmV0dXJuICRxLndoZW4oJHNxbGl0ZVNlcnZpY2UuZXhlY3V0ZVNxbChxdWVyeSwgW3VzZXIuTmFtZV0pKTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
