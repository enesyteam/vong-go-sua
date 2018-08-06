var goSua = angular.module('goSua', [
    'mFirebase',
    'toastr'
	])
    .constant('appVersion', '4.4.0')
    .constant('releaseDate', 'May-20, 2018')
    .run(themeRun);


function themeRun($window, $rootScope, $timeout) {

}


