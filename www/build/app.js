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
	"INSERT INTO 'Users' ('Name') VALUES ('Juan David Nicholls Cardona');",
	"INSERT INTO 'Users' ('Name') VALUES ('Juan David Nicholls Cardona');",
	"INSERT INTO 'Users' ('Name') VALUES ('Juan David Nicholls Cardona');",
	"INSERT INTO 'Users' ('Name') VALUES ('Juan David Nicholls Cardona');",
	"INSERT INTO 'Users' ('Name') VALUES ('Juan David Nicholls Cardona');",
	"INSERT INTO 'Users' ('Name') VALUES ('Juan David Nicholls Cardona');"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImlzc3Vlcy5qcyIsInF1ZXJpZXMuanMiLCJjb250cm9sbGVycy9ob21lLmpzIiwiZGlyZWN0aXZlcy9ob2xkTGlzdC5qcyIsImRpcmVjdGl2ZXMvbXVsdGlwbGVTZWxlY3QuanMiLCJkaXJlY3RpdmVzL3NlYXJjaFNlbGVjdC5qcyIsInNlcnZpY2VzL21vZGFscy5qcyIsInNlcnZpY2VzL21vZGVsLmpzIiwic2VydmljZXMvc3FsaXRlLmpzIiwic2VydmljZXMvdXNlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnQXBwJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xuYW5ndWxhci5tb2R1bGUoJ0FwcCcsIFsnaW9uaWMnLCAnbmdDb3Jkb3ZhJywgJ25nQW5pbWF0ZSddKVxuXG4ucnVuKFsnJGlvbmljUGxhdGZvcm0nLCBcblx0XHRcdCckc3FsaXRlU2VydmljZScsXG4gICAgICBmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSwgJHNxbGl0ZVNlcnZpY2UpIHtcbiAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgaWYod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcblxuICAgICAgLy8gRG9uJ3QgcmVtb3ZlIHRoaXMgbGluZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLiBJdCBzdG9wcyB0aGUgdmlld3BvcnRcbiAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXG4gICAgICAvLyBhIG11Y2ggbmljZXIga2V5Ym9hcmQgZXhwZXJpZW5jZS5cbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgIH1cbiAgICBpZih3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgfVxuXHRcdFxuXHRcdC8vTG9hZCB0aGUgUHJlLXBvcHVsYXRlZCBkYXRhYmFzZSwgZGVidWcgPSB0cnVlXG5cdFx0JHNxbGl0ZVNlcnZpY2UucHJlbG9hZERhdGFCYXNlKHRydWUpO1xuICB9KTtcbn1dKVxuLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJyxcbiAgICAgICAgICckdXJsUm91dGVyUHJvdmlkZXInLFxuICAgICAgICAgJyRpb25pY0NvbmZpZ1Byb3ZpZGVyJyxcbiAgICAgICAgICckY29tcGlsZVByb3ZpZGVyJyxcbiAgICAgICAgIGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkaW9uaWNDb25maWdQcm92aWRlciwgJGNvbXBpbGVQcm92aWRlcikge1xuXG4gICAgJGNvbXBpbGVQcm92aWRlci5pbWdTcmNTYW5pdGl6YXRpb25XaGl0ZWxpc3QoL15cXHMqKGh0dHBzP3xmdHB8ZmlsZXxibG9ifGNvbnRlbnR8bXMtYXBweHx4LXdtYXBwMCk6fGRhdGE6aW1hZ2VcXC98aW1nXFwvLyk7XG4gICAgJGNvbXBpbGVQcm92aWRlci5hSHJlZlNhbml0aXphdGlvbldoaXRlbGlzdCgvXlxccyooaHR0cHM/fGZ0cHxtYWlsdG98ZmlsZXxnaHR0cHM/fG1zLWFwcHh8eC13bWFwcDApOi8pO1xuICAgIFxuICAgIGlmIChpb25pYy5QbGF0Zm9ybS5pc0lPUygpKSB7XG4gICAgICAgICRpb25pY0NvbmZpZ1Byb3ZpZGVyLnNjcm9sbGluZy5qc1Njcm9sbGluZyh0cnVlKTtcbiAgICB9XG4gICAgXG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgLnN0YXRlKCdob21lJywge1xuICAgICAgICAgICAgdXJsOiBcIi9ob21lXCIsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZXMvaG9tZS5odG1sXCIsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnSG9tZUNvbnRyb2xsZXInXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKGZ1bmN0aW9uICgkaW5qZWN0b3IsICRsb2NhdGlvbikge1xuICAgICAgICB2YXIgJHN0YXRlID0gJGluamVjdG9yLmdldChcIiRzdGF0ZVwiKTtcbiAgICAgICAgJHN0YXRlLmdvKFwiaG9tZVwiKTtcbiAgICB9KTtcbn1dKTtcbiIsIi8qIGdsb2JhbCBpb25pYyAqL1xyXG4oZnVuY3Rpb24gKGFuZ3VsYXIsIGlvbmljKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGlvbmljLlBsYXRmb3JtLmlzSUUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gaW9uaWMuUGxhdGZvcm0udWEudG9Mb3dlckNhc2UoKS5pbmRleE9mKCd0cmlkZW50JykgPiAtMTtcclxuXHR9XHJcblxyXG5cdGlmIChpb25pYy5QbGF0Zm9ybS5pc0lFKCkpIHtcclxuXHRcdGFuZ3VsYXIubW9kdWxlKCdpb25pYycpXHJcblx0XHRcdC5mYWN0b3J5KCckaW9uaWNOZ0NsaWNrJywgWyckcGFyc2UnLCAnJHRpbWVvdXQnLCBmdW5jdGlvbiAoJHBhcnNlLCAkdGltZW91dCkge1xyXG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGNsaWNrRXhwcikge1xyXG5cdFx0XHRcdFx0dmFyIGNsaWNrSGFuZGxlciA9IGFuZ3VsYXIuaXNGdW5jdGlvbihjbGlja0V4cHIpID8gY2xpY2tFeHByIDogJHBhcnNlKGNsaWNrRXhwcik7XHJcblxyXG5cdFx0XHRcdFx0ZWxlbWVudC5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0XHRcdFx0c2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoc2NvcGUuY2xpY2t0aW1lcikgcmV0dXJuOyAvLyBTZWNvbmQgY2FsbFxyXG5cdFx0XHRcdFx0XHRcdGNsaWNrSGFuZGxlcihzY29wZSwgeyAkZXZlbnQ6IChldmVudCkgfSk7XHJcblx0XHRcdFx0XHRcdFx0c2NvcGUuY2xpY2t0aW1lciA9ICR0aW1lb3V0KGZ1bmN0aW9uICgpIHsgZGVsZXRlIHNjb3BlLmNsaWNrdGltZXI7IH0sIDEsIGZhbHNlKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHQvLyBIYWNrIGZvciBpT1MgU2FmYXJpJ3MgYmVuZWZpdC4gSXQgZ29lcyBzZWFyY2hpbmcgZm9yIG9uY2xpY2sgaGFuZGxlcnMgYW5kIGlzIGxpYWJsZSB0byBjbGlja1xyXG5cdFx0XHRcdFx0Ly8gc29tZXRoaW5nIGVsc2UgbmVhcmJ5LlxyXG5cdFx0XHRcdFx0ZWxlbWVudC5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7IH07XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fV0pO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gU2VsZWN0RGlyZWN0aXZlKCkge1xyXG5cdFx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHJlc3RyaWN0OiAnRScsXHJcblx0XHRcdHJlcGxhY2U6IGZhbHNlLFxyXG5cdFx0XHRsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQpIHtcclxuXHRcdFx0XHRpZiAoaW9uaWMuUGxhdGZvcm0gJiYgKGlvbmljLlBsYXRmb3JtLmlzV2luZG93c1Bob25lKCkgfHwgaW9uaWMuUGxhdGZvcm0uaXNJRSgpIHx8IGlvbmljLlBsYXRmb3JtLnBsYXRmb3JtKCkgPT09IFwiZWRnZVwiKSkge1xyXG5cdFx0XHRcdFx0ZWxlbWVudC5hdHRyKCdkYXRhLXRhcC1kaXNhYmxlZCcsICd0cnVlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ2lvbmljJylcclxuICAgIC5kaXJlY3RpdmUoJ3NlbGVjdCcsIFNlbGVjdERpcmVjdGl2ZSk7XHJcblxyXG5cdC8qYW5ndWxhci5tb2R1bGUoJ2lvbmljLWRhdGVwaWNrZXInKVxyXG5cdC5kaXJlY3RpdmUoJ3NlbGVjdCcsIFNlbGVjdERpcmVjdGl2ZSk7Ki9cclxuXHJcbn0pKGFuZ3VsYXIsIGlvbmljKTsiLCJ3aW5kb3cucXVlcmllcyA9IFtcclxuXHQvL0Ryb3AgdGFibGVzXHJcbiAgIFwiRFJPUCBUQUJMRSBJRiBFWElTVFMgVXNlcnM7XCIsXHJcblx0Ly9DcmVhdGUgdGFibGVzXHJcblx0XCJDUkVBVEUgVEFCTEUgVXNlcnMgKElkVXNlciBpbnRlZ2VyIHByaW1hcnkga2V5IGF1dG9pbmNyZW1lbnQsIE5hbWUgdGV4dCBub3QgbnVsbCk7XCIsXHJcblx0XHJcblx0Ly9JbnNlcnQgVXNlcnNcclxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnSnVhbiBEYXZpZCBOaWNob2xscyBDYXJkb25hJyk7XCIsXHJcblx0XCJJTlNFUlQgSU5UTyAnVXNlcnMnICgnTmFtZScpIFZBTFVFUyAoJ0p1YW4gRGF2aWQgTmljaG9sbHMgQ2FyZG9uYScpO1wiLFxyXG5cdFwiSU5TRVJUIElOVE8gJ1VzZXJzJyAoJ05hbWUnKSBWQUxVRVMgKCdKdWFuIERhdmlkIE5pY2hvbGxzIENhcmRvbmEnKTtcIixcclxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnSnVhbiBEYXZpZCBOaWNob2xscyBDYXJkb25hJyk7XCIsXHJcblx0XCJJTlNFUlQgSU5UTyAnVXNlcnMnICgnTmFtZScpIFZBTFVFUyAoJ0p1YW4gRGF2aWQgTmljaG9sbHMgQ2FyZG9uYScpO1wiLFxyXG5cdFwiSU5TRVJUIElOVE8gJ1VzZXJzJyAoJ05hbWUnKSBWQUxVRVMgKCdKdWFuIERhdmlkIE5pY2hvbGxzIENhcmRvbmEnKTtcIixcclxuXHRcIklOU0VSVCBJTlRPICdVc2VycycgKCdOYW1lJykgVkFMVUVTICgnSnVhbiBEYXZpZCBOaWNob2xscyBDYXJkb25hJyk7XCJcclxuXTsiLCIoZnVuY3Rpb24gKCkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0YW5ndWxhclxyXG5cdFx0Lm1vZHVsZSgnQXBwJylcclxuXHRcdC5jb250cm9sbGVyKCdIb21lQ29udHJvbGxlcicsIEhvbWVDb250cm9sbGVyKTtcclxuXHJcblx0SG9tZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRpb25pY1BvcHVwJywgJ01vZGFscycsICdNb2RlbCddO1xyXG5cdGZ1bmN0aW9uIEhvbWVDb250cm9sbGVyKCRzY29wZSwgJGlvbmljUG9wdXAsIE1vZGFscywgTW9kZWwpIHtcclxuXHJcblx0XHQkc2NvcGUudXNlcnMgPSBbXTtcclxuXHJcblx0XHQkc2NvcGUuSGVsbG9Xb3JsZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0JGlvbmljUG9wdXAuYWxlcnQoe1xyXG5cdFx0XHRcdHRpdGxlOiAnSGVsbG8gV29ybGQnLFxyXG5cdFx0XHRcdHRlbXBsYXRlOiAnVGhpcyBpcyB0aGUgYmVzdCB0ZW1wbGF0ZSB0byBzdGFydCB3aXRoIElvbmljIEZyYW1ld29yayEnLFxyXG4gICAgIFx0XHRjc3NDbGFzczogJ2FuaW1hdGVkIGJvdW5jZUluRG93bidcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cdFx0XHJcblx0XHQkc2NvcGUuc2hvd1VzZXJzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRNb2RlbC5Vc2Vycy5nZXRBbGwoKS50aGVuKGZ1bmN0aW9uICh1c2Vycykge1xyXG5cdFx0XHRcdCRzY29wZS51c2VycyA9IGFuZ3VsYXIuY29weSh1c2Vycyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRNb2RhbHMub3Blbk1vZGFsKCRzY29wZSwgJ3RlbXBsYXRlcy9tb2RhbHMvdXNlcnMuaHRtbCcsICdhbmltYXRlZCByb3RhdGVJbkRvd25MZWZ0Jyk7XHJcblx0XHR9O1xyXG5cdFx0XHJcblx0XHQkc2NvcGUuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0TW9kYWxzLmNsb3NlTW9kYWwoKTtcclxuXHRcdFx0JHNjb3BlLnVzZXJzID0gW107XHJcblx0XHR9O1xyXG5cdH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0YW5ndWxhclxyXG5cdFx0Lm1vZHVsZSgnQXBwJylcclxuXHRcdC5kaXJlY3RpdmUoJ2hvbGRMaXN0JywgaG9sZExpc3QpO1xyXG5cclxuXHRob2xkTGlzdC4kaW5qZWN0ID0gWyckaW9uaWNHZXN0dXJlJ107XHJcblx0ZnVuY3Rpb24gaG9sZExpc3QoJGlvbmljR2VzdHVyZSkge1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHJlc3RyaWN0OiAnQScsXHJcblx0XHRcdGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuXHRcdFx0XHQkaW9uaWNHZXN0dXJlLm9uKCdob2xkJywgZnVuY3Rpb24gKGUpIHtcclxuXHJcblx0XHRcdFx0XHR2YXIgY29udGVudCA9IGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLml0ZW0tY29udGVudCcpO1xyXG5cclxuXHRcdFx0XHRcdHZhciBidXR0b25zID0gZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcuaXRlbS1vcHRpb25zJyk7XHJcblx0XHRcdFx0XHR2YXIgYnV0dG9uc1dpZHRoID0gYnV0dG9ucy5vZmZzZXRXaWR0aDtcclxuXHJcblx0XHRcdFx0XHRpb25pYy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRjb250ZW50LnN0eWxlW2lvbmljLkNTUy5UUkFOU0lUSU9OXSA9ICdhbGwgZWFzZS1vdXQgLjI1cyc7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoIWJ1dHRvbnMuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnZpc2libGUnKSkge1xyXG5cdFx0XHRcdFx0XHRcdGNvbnRlbnQuc3R5bGVbaW9uaWMuQ1NTLlRSQU5TRk9STV0gPSAnJztcclxuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGJ1dHRvbnMuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJyk7XHJcblx0XHRcdFx0XHRcdFx0fSwgMjUwKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRidXR0b25zLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xyXG5cdFx0XHRcdFx0XHRcdGNvbnRlbnQuc3R5bGVbaW9uaWMuQ1NTLlRSQU5TRk9STV0gPSAndHJhbnNsYXRlM2QoLScgKyBidXR0b25zV2lkdGggKyAncHgsIDAsIDApJztcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cclxuXHRcdFx0XHR9LCBlbGVtZW50KTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGFuZ3VsYXJcclxuXHRcdC5tb2R1bGUoJ0FwcCcpXHJcblx0XHQuZGlyZWN0aXZlKCdpb25NdWx0aXBsZVNlbGVjdCcsIGlvbk11bHRpcGxlU2VsZWN0KTtcclxuXHJcblx0aW9uTXVsdGlwbGVTZWxlY3QuJGluamVjdCA9IFsnJGlvbmljTW9kYWwnLCAnJGlvbmljR2VzdHVyZSddO1xyXG5cdGZ1bmN0aW9uIGlvbk11bHRpcGxlU2VsZWN0KCRpb25pY01vZGFsLCAkaW9uaWNHZXN0dXJlKSB7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cmVzdHJpY3Q6ICdFJyxcclxuXHRcdFx0c2NvcGU6IHtcclxuXHRcdFx0XHRvcHRpb25zOiBcIj1cIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRjb250cm9sbGVyOiBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XHJcblx0XHRcdFx0JHNjb3BlLm11bHRpcGxlU2VsZWN0ID0ge1xyXG5cdFx0XHRcdFx0dGl0bGU6ICRhdHRycy50aXRsZSB8fCBcIlNlbGVjdCBPcHRpb25zXCIsXHJcblx0XHRcdFx0XHR0ZW1wT3B0aW9uczogW10sXHJcblx0XHRcdFx0XHRrZXlQcm9wZXJ0eTogJGF0dHJzLmtleVByb3BlcnR5IHx8IFwiaWRcIixcclxuXHRcdFx0XHRcdHZhbHVlUHJvcGVydHk6ICRhdHRycy52YWx1ZVByb3BlcnR5IHx8IFwidmFsdWVcIixcclxuXHRcdFx0XHRcdHNlbGVjdGVkUHJvcGVydHk6ICRhdHRycy5zZWxlY3RlZFByb3BlcnR5IHx8IFwic2VsZWN0ZWRcIixcclxuXHRcdFx0XHRcdHRlbXBsYXRlVXJsOiAkYXR0cnMudGVtcGxhdGVVcmwgfHwgJ3RlbXBsYXRlcy9tdWx0aXBsZVNlbGVjdC5odG1sJyxcclxuXHRcdFx0XHRcdHJlbmRlckNoZWNrYm94OiAkYXR0cnMucmVuZGVyQ2hlY2tib3ggPyAkYXR0cnMucmVuZGVyQ2hlY2tib3ggPT0gXCJ0cnVlXCIgOiB0cnVlLFxyXG5cdFx0XHRcdFx0YW5pbWF0aW9uOiAkYXR0cnMuYW5pbWF0aW9uIHx8ICdzbGlkZS1pbi11cCdcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHQkc2NvcGUuT3Blbk1vZGFsRnJvbVRlbXBsYXRlID0gZnVuY3Rpb24gKHRlbXBsYXRlVXJsKSB7XHJcblx0XHRcdFx0XHQkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwodGVtcGxhdGVVcmwsIHtcclxuXHRcdFx0XHRcdFx0c2NvcGU6ICRzY29wZSxcclxuXHRcdFx0XHRcdFx0YW5pbWF0aW9uOiAkc2NvcGUubXVsdGlwbGVTZWxlY3QuYW5pbWF0aW9uXHJcblx0XHRcdFx0XHR9KS50aGVuKGZ1bmN0aW9uIChtb2RhbCkge1xyXG5cdFx0XHRcdFx0XHQkc2NvcGUubW9kYWwgPSBtb2RhbDtcclxuXHRcdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnNob3coKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdCRpb25pY0dlc3R1cmUub24oJ3RhcCcsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0XHQkc2NvcGUubXVsdGlwbGVTZWxlY3QudGVtcE9wdGlvbnMgPSAkc2NvcGUub3B0aW9ucy5tYXAoZnVuY3Rpb24gKG9wdGlvbikge1xyXG5cdFx0XHRcdFx0XHR2YXIgdGVtcE9wdGlvbiA9IHt9O1xyXG5cdFx0XHRcdFx0XHR0ZW1wT3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC5rZXlQcm9wZXJ0eV0gPSBvcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LmtleVByb3BlcnR5XTtcclxuXHRcdFx0XHRcdFx0dGVtcE9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3QudmFsdWVQcm9wZXJ0eV0gPSBvcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LnZhbHVlUHJvcGVydHldO1xyXG5cdFx0XHRcdFx0XHR0ZW1wT3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC5zZWxlY3RlZFByb3BlcnR5XSA9IG9wdGlvblskc2NvcGUubXVsdGlwbGVTZWxlY3Quc2VsZWN0ZWRQcm9wZXJ0eV07XHJcblxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGVtcE9wdGlvbjtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0JHNjb3BlLk9wZW5Nb2RhbEZyb21UZW1wbGF0ZSgkc2NvcGUubXVsdGlwbGVTZWxlY3QudGVtcGxhdGVVcmwpO1xyXG5cdFx0XHRcdH0sICRlbGVtZW50KTtcclxuXHJcblx0XHRcdFx0JHNjb3BlLnNhdmVPcHRpb25zID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAkc2NvcGUubXVsdGlwbGVTZWxlY3QudGVtcE9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0dmFyIHRlbXBPcHRpb24gPSAkc2NvcGUubXVsdGlwbGVTZWxlY3QudGVtcE9wdGlvbnNbaV07XHJcblx0XHRcdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgJHNjb3BlLm9wdGlvbnMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgb3B0aW9uID0gJHNjb3BlLm9wdGlvbnNbal07XHJcblx0XHRcdFx0XHRcdFx0aWYgKHRlbXBPcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LmtleVByb3BlcnR5XSA9PSBvcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LmtleVByb3BlcnR5XSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9uWyRzY29wZS5tdWx0aXBsZVNlbGVjdC5zZWxlY3RlZFByb3BlcnR5XSA9IHRlbXBPcHRpb25bJHNjb3BlLm11bHRpcGxlU2VsZWN0LnNlbGVjdGVkUHJvcGVydHldO1xyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQkc2NvcGUuY2xvc2VNb2RhbCgpO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdCRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0JHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRpZiAoJHNjb3BlLm1vZGFsKSB7XHJcblx0XHRcdFx0XHRcdCRzY29wZS5tb2RhbC5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGFuZ3VsYXJcclxuXHRcdC5tb2R1bGUoJ0FwcCcpXHJcblx0XHQuZGlyZWN0aXZlKCdpb25TZWFyY2hTZWxlY3QnLCBpb25TZWFyY2hTZWxlY3QpO1xyXG5cclxuXHRpb25TZWFyY2hTZWxlY3QuJGluamVjdCA9IFsnJGlvbmljTW9kYWwnLCAnJGlvbmljR2VzdHVyZSddO1xyXG5cdGZ1bmN0aW9uIGlvblNlYXJjaFNlbGVjdCgkaW9uaWNNb2RhbCwgJGlvbmljR2VzdHVyZSkge1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHJlc3RyaWN0OiAnRScsXHJcblx0XHRcdHNjb3BlOiB7XHJcblx0XHRcdFx0b3B0aW9uczogXCI9XCIsXHJcblx0XHRcdFx0b3B0aW9uU2VsZWN0ZWQ6IFwiPVwiXHJcblx0XHRcdH0sXHJcblx0XHRcdGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcclxuXHRcdFx0XHQkc2NvcGUuc2VhcmNoU2VsZWN0ID0ge1xyXG5cdFx0XHRcdFx0dGl0bGU6ICRhdHRycy50aXRsZSB8fCBcIlNlYXJjaFwiLFxyXG5cdFx0XHRcdFx0a2V5UHJvcGVydHk6ICRhdHRycy5rZXlQcm9wZXJ0eSxcclxuXHRcdFx0XHRcdHZhbHVlUHJvcGVydHk6ICRhdHRycy52YWx1ZVByb3BlcnR5LFxyXG5cdFx0XHRcdFx0dGVtcGxhdGVVcmw6ICRhdHRycy50ZW1wbGF0ZVVybCB8fCAndGVtcGxhdGVzL3NlYXJjaFNlbGVjdC5odG1sJyxcclxuXHRcdFx0XHRcdGFuaW1hdGlvbjogJGF0dHJzLmFuaW1hdGlvbiB8fCAnc2xpZGUtaW4tdXAnLFxyXG5cdFx0XHRcdFx0b3B0aW9uOiBudWxsLFxyXG5cdFx0XHRcdFx0c2VhcmNodmFsdWU6IFwiXCIsXHJcblx0XHRcdFx0XHRlbmFibGVTZWFyY2g6ICRhdHRycy5lbmFibGVTZWFyY2ggPyAkYXR0cnMuZW5hYmxlU2VhcmNoID09IFwidHJ1ZVwiIDogdHJ1ZVxyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdCRpb25pY0dlc3R1cmUub24oJ3RhcCcsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCEhJHNjb3BlLnNlYXJjaFNlbGVjdC5rZXlQcm9wZXJ0eSAmJiAhISRzY29wZS5zZWFyY2hTZWxlY3QudmFsdWVQcm9wZXJ0eSkge1xyXG5cdFx0XHRcdFx0XHRpZiAoJHNjb3BlLm9wdGlvblNlbGVjdGVkKSB7XHJcblx0XHRcdFx0XHRcdFx0JHNjb3BlLnNlYXJjaFNlbGVjdC5vcHRpb24gPSAkc2NvcGUub3B0aW9uU2VsZWN0ZWRbJHNjb3BlLnNlYXJjaFNlbGVjdC5rZXlQcm9wZXJ0eV07XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQkc2NvcGUuc2VhcmNoU2VsZWN0Lm9wdGlvbiA9ICRzY29wZS5vcHRpb25TZWxlY3RlZDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdCRzY29wZS5PcGVuTW9kYWxGcm9tVGVtcGxhdGUoJHNjb3BlLnNlYXJjaFNlbGVjdC50ZW1wbGF0ZVVybCk7XHJcblx0XHRcdFx0fSwgJGVsZW1lbnQpO1xyXG5cclxuXHRcdFx0XHQkc2NvcGUuc2F2ZU9wdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGlmICghISRzY29wZS5zZWFyY2hTZWxlY3Qua2V5UHJvcGVydHkgJiYgISEkc2NvcGUuc2VhcmNoU2VsZWN0LnZhbHVlUHJvcGVydHkpIHtcclxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAkc2NvcGUub3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBjdXJyZW50T3B0aW9uID0gJHNjb3BlLm9wdGlvbnNbaV07XHJcblx0XHRcdFx0XHRcdFx0aWYgKGN1cnJlbnRPcHRpb25bJHNjb3BlLnNlYXJjaFNlbGVjdC5rZXlQcm9wZXJ0eV0gPT0gJHNjb3BlLnNlYXJjaFNlbGVjdC5vcHRpb24pIHtcclxuXHRcdFx0XHRcdFx0XHRcdCRzY29wZS5vcHRpb25TZWxlY3RlZCA9IGN1cnJlbnRPcHRpb247XHJcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQkc2NvcGUub3B0aW9uU2VsZWN0ZWQgPSAkc2NvcGUuc2VhcmNoU2VsZWN0Lm9wdGlvbjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdCRzY29wZS5zZWFyY2hTZWxlY3Quc2VhcmNodmFsdWUgPSBcIlwiO1xyXG5cdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdCRzY29wZS5jbGVhclNlYXJjaCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdCRzY29wZS5zZWFyY2hTZWxlY3Quc2VhcmNodmFsdWUgPSBcIlwiO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdCRzY29wZS5jbG9zZU1vZGFsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0JHNjb3BlLm1vZGFsLnJlbW92ZSgpO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0JHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRpZiAoJHNjb3BlLm1vZGFsKSB7XHJcblx0XHRcdFx0XHRcdCRzY29wZS5tb2RhbC5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0JHNjb3BlLk9wZW5Nb2RhbEZyb21UZW1wbGF0ZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZVVybCkge1xyXG5cdFx0XHRcdFx0JGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKHRlbXBsYXRlVXJsLCB7XHJcblx0XHRcdFx0XHRcdHNjb3BlOiAkc2NvcGUsXHJcblx0XHRcdFx0XHRcdGFuaW1hdGlvbjogJHNjb3BlLnNlYXJjaFNlbGVjdC5hbmltYXRpb25cclxuXHRcdFx0XHRcdH0pLnRoZW4oZnVuY3Rpb24gKG1vZGFsKSB7XHJcblx0XHRcdFx0XHRcdCRzY29wZS5tb2RhbCA9IG1vZGFsO1xyXG5cdFx0XHRcdFx0XHQkc2NvcGUubW9kYWwuc2hvdygpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGFuZ3VsYXJcclxuXHRcdC5tb2R1bGUoJ0FwcCcpXHJcblx0XHQuZmFjdG9yeSgnTW9kYWxzJywgTW9kYWxzKTtcclxuXHJcblx0TW9kYWxzLiRpbmplY3QgPSBbJyRpb25pY01vZGFsJ107XHJcblx0ZnVuY3Rpb24gTW9kYWxzKCRpb25pY01vZGFsKSB7XHJcblxyXG5cdFx0dmFyIG1vZGFscyA9IFtdO1xyXG5cclxuXHRcdHZhciBfb3Blbk1vZGFsID0gZnVuY3Rpb24gKCRzY29wZSwgdGVtcGxhdGVVcmwsIGFuaW1hdGlvbikge1xyXG5cdFx0XHQkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwodGVtcGxhdGVVcmwsIHtcclxuXHRcdFx0XHRzY29wZTogJHNjb3BlLFxyXG5cdFx0XHRcdGFuaW1hdGlvbjogYW5pbWF0aW9uIHx8ICdzbGlkZS1pbi11cCcsXHJcblx0XHRcdFx0YmFja2Ryb3BDbGlja1RvQ2xvc2U6IGZhbHNlXHJcblx0XHRcdH0pLnRoZW4oZnVuY3Rpb24gKG1vZGFsKSB7XHJcblx0XHRcdFx0bW9kYWxzLnB1c2gobW9kYWwpO1xyXG5cdFx0XHRcdG1vZGFsLnNob3coKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHZhciBfY2xvc2VNb2RhbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGN1cnJlbnRNb2RhbCA9IG1vZGFscy5zcGxpY2UoLTEsIDEpWzBdO1xyXG5cdFx0XHRjdXJyZW50TW9kYWwucmVtb3ZlKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHZhciBfY2xvc2VBbGxNb2RhbHMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdG1vZGFscy5tYXAoZnVuY3Rpb24gKG1vZGFsKSB7XHJcblx0XHRcdFx0bW9kYWwucmVtb3ZlKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRtb2RhbHMgPSBbXTtcclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0b3Blbk1vZGFsOiBfb3Blbk1vZGFsLFxyXG5cdFx0XHRjbG9zZU1vZGFsOiBfY2xvc2VNb2RhbCxcclxuXHRcdFx0Y2xvc2VBbGxNb2RhbHM6IF9jbG9zZUFsbE1vZGFsc1xyXG5cdFx0fTtcclxuXHR9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdGFuZ3VsYXJcclxuXHRcdC5tb2R1bGUoJ0FwcCcpXHJcblx0XHQuZmFjdG9yeSgnTW9kZWwnLCBNb2RlbCk7XHJcblxyXG5cdE1vZGVsLiRpbmplY3QgPSBbJ1VzZXJzJ107XHJcblx0ZnVuY3Rpb24gTW9kZWwoVXNlcnMpIHtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRVc2VyczogVXNlcnNcclxuXHRcdH07XHJcblx0fVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRhbmd1bGFyXHJcblx0XHQubW9kdWxlKCdBcHAnKVxyXG5cdFx0LnNlcnZpY2UoJyRzcWxpdGVTZXJ2aWNlJywgJHNxbGl0ZVNlcnZpY2UpO1xyXG5cclxuXHQkc3FsaXRlU2VydmljZS4kaW5qZWN0ID0gWyckcScsICckY29yZG92YVNRTGl0ZSddO1xyXG5cdGZ1bmN0aW9uICRzcWxpdGVTZXJ2aWNlKCRxLCAkY29yZG92YVNRTGl0ZSkge1xyXG5cclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHZhciBfZGI7XHJcblxyXG5cdFx0c2VsZi5kYiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKCFfZGIpIHtcclxuXHRcdFx0XHRpZiAod2luZG93LnNxbGl0ZVBsdWdpbiAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRfZGIgPSB3aW5kb3cuc3FsaXRlUGx1Z2luLm9wZW5EYXRhYmFzZSh7IG5hbWU6IFwicHJlLmRiXCIsIGxvY2F0aW9uOiAyLCBjcmVhdGVGcm9tTG9jYXRpb246IDEgfSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIEZvciBkZWJ1Z2dpbmcgaW4gdGhlIGJyb3dzZXJcclxuXHRcdFx0XHRcdF9kYiA9IHdpbmRvdy5vcGVuRGF0YWJhc2UoXCJwcmUuZGJcIiwgXCIxLjBcIiwgXCJEYXRhYmFzZVwiLCAyMDAwMDApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gX2RiO1xyXG5cdFx0fTtcclxuXHJcblx0XHRzZWxmLmdldEZpcnN0SXRlbSA9IGZ1bmN0aW9uIChxdWVyeSwgcGFyYW1ldGVycykge1xyXG5cdFx0XHR2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG5cdFx0XHRzZWxmLmV4ZWN1dGVTcWwocXVlcnksIHBhcmFtZXRlcnMpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG5cclxuXHRcdFx0XHRpZiAocmVzLnJvd3MubGVuZ3RoID4gMClcclxuXHRcdFx0XHRcdHJldHVybiBkZWZlcnJlZC5yZXNvbHZlKHJlcy5yb3dzLml0ZW0oMCkpO1xyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdHJldHVybiBkZWZlcnJlZC5yZWplY3QoXCJUaGVyZSBhcmVuJ3QgaXRlbXMgbWF0Y2hpbmdcIik7XHJcblx0XHRcdH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuXHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVqZWN0KGVycik7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcblx0XHR9O1xyXG5cclxuXHRcdHNlbGYuZ2V0Rmlyc3RPckRlZmF1bHRJdGVtID0gZnVuY3Rpb24gKHF1ZXJ5LCBwYXJhbWV0ZXJzKSB7XHJcblx0XHRcdHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcblx0XHRcdHNlbGYuZXhlY3V0ZVNxbChxdWVyeSwgcGFyYW1ldGVycykudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcblxyXG5cdFx0XHRcdGlmIChyZXMucm93cy5sZW5ndGggPiAwKVxyXG5cdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlc29sdmUocmVzLnJvd3MuaXRlbSgwKSk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnJlc29sdmUobnVsbCk7XHJcblx0XHRcdH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuXHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVqZWN0KGVycik7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcblx0XHR9O1xyXG5cclxuXHRcdHNlbGYuZ2V0SXRlbXMgPSBmdW5jdGlvbiAocXVlcnksIHBhcmFtZXRlcnMpIHtcclxuXHRcdFx0dmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHRcdFx0c2VsZi5leGVjdXRlU3FsKHF1ZXJ5LCBwYXJhbWV0ZXJzKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuXHRcdFx0XHR2YXIgaXRlbXMgPSBbXTtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHJlcy5yb3dzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRpdGVtcy5wdXNoKHJlcy5yb3dzLml0ZW0oaSkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVzb2x2ZShpdGVtcyk7XHJcblx0XHRcdH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuXHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucmVqZWN0KGVycik7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcblx0XHR9O1xyXG5cclxuXHRcdHNlbGYucHJlbG9hZERhdGFCYXNlID0gZnVuY3Rpb24gKGVuYWJsZUxvZykge1xyXG5cdFx0XHR2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG5cclxuXHRcdFx0Ly93aW5kb3cub3BlbihcImRhdGE6dGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04LFwiICsgSlNPTi5zdHJpbmdpZnkoeyBkYXRhOiB3aW5kb3cucXVlcmllcy5qb2luKCcnKS5yZXBsYWNlKC9cXFxcbi9nLCAnXFxuJykgfSkpO1xyXG5cdFx0XHRpZiAod2luZG93LnNxbGl0ZVBsdWdpbiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0ZW5hYmxlTG9nICYmIGNvbnNvbGUubG9nKCclYyAqKioqKioqKioqKioqKioqKiBTdGFydGluZyB0aGUgY3JlYXRpb24gb2YgdGhlIGRhdGFiYXNlIGluIHRoZSBicm93c2VyICoqKioqKioqKioqKioqKioqICcsICdiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NScpO1xyXG5cdFx0XHRcdHNlbGYuZGIoKS50cmFuc2FjdGlvbihmdW5jdGlvbiAodHgpIHtcclxuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgd2luZG93LnF1ZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0dmFyIHF1ZXJ5ID0gd2luZG93LnF1ZXJpZXNbaV0ucmVwbGFjZSgvXFxcXG4vZywgJ1xcbicpO1xyXG5cclxuXHRcdFx0XHRcdFx0ZW5hYmxlTG9nICYmIGNvbnNvbGUubG9nKHdpbmRvdy5xdWVyaWVzW2ldKTtcclxuXHRcdFx0XHRcdFx0dHguZXhlY3V0ZVNxbChxdWVyeSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcblx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyb3IpO1xyXG5cdFx0XHRcdH0sIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGVuYWJsZUxvZyAmJiBjb25zb2xlLmxvZygnJWMgKioqKioqKioqKioqKioqKiogQ29tcGxldGluZyB0aGUgY3JlYXRpb24gb2YgdGhlIGRhdGFiYXNlIGluIHRoZSBicm93c2VyICoqKioqKioqKioqKioqKioqICcsICdiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NScpO1xyXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShcIk9LXCIpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGRlZmVycmVkLnJlc29sdmUoXCJPS1wiKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcblx0XHR9O1xyXG5cclxuXHRcdHNlbGYuZXhlY3V0ZVNxbCA9IGZ1bmN0aW9uIChxdWVyeSwgcGFyYW1ldGVycykge1xyXG5cdFx0XHRyZXR1cm4gJGNvcmRvdmFTUUxpdGUuZXhlY3V0ZShzZWxmLmRiKCksIHF1ZXJ5LCBwYXJhbWV0ZXJzKTtcclxuXHRcdH07XHJcblx0fVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRhbmd1bGFyXHJcblx0XHQubW9kdWxlKCdBcHAnKVxyXG5cdFx0LmZhY3RvcnkoJ1VzZXJzJywgVXNlcnMpO1xyXG5cclxuXHRVc2Vycy4kaW5qZWN0ID0gWyckcScsICckc3FsaXRlU2VydmljZSddO1xyXG5cdGZ1bmN0aW9uIFVzZXJzKCRxLCAkc3FsaXRlU2VydmljZSkge1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGdldEFsbDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHZhciBxdWVyeSA9IFwiU2VsZWN0ICogRlJPTSBVc2Vyc1wiO1xyXG5cdFx0XHRcdHJldHVybiAkcS53aGVuKCRzcWxpdGVTZXJ2aWNlLmdldEl0ZW1zKHF1ZXJ5KSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGFkZDogZnVuY3Rpb24gKHVzZXIpIHtcclxuXHRcdFx0XHR2YXIgcXVlcnkgPSBcIklOU0VSVCBJTlRPIFVzZXJzIChOYW1lKSBWQUxVRVMgKD8pXCI7XHJcblx0XHRcdFx0cmV0dXJuICRxLndoZW4oJHNxbGl0ZVNlcnZpY2UuZXhlY3V0ZVNxbChxdWVyeSwgW3VzZXIuTmFtZV0pKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
