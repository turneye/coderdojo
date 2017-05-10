(function() {
'use strict';

    angular
        .module('App')
        .controller('MyHomeController', MyHomeController);

    MyHomeController.$inject = ['NgMap'];
    function MyHomeController(NgMap) {
        var vm = this;
        NgMap.getMap().then(function(map) {
          vm.showCustomMarker= function(evt) {
            map.customMarkers.foo.setVisible(true);
            map.customMarkers.foo.setPosition(this.getPosition());
          };
          vm.closeCustomMarker= function(evt) {
            this.style.display = 'none';
          };
        });
    }
})();