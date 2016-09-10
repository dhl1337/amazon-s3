(() => {
    angular
        .module('amazonS3')
        .config(['$stateProvider','$urlRouterProvider', config]);

    function config ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('image', {
                url: '/image',
                templateUrl: '../app/components/image/image.html',
                controller: 'ImageController',
                controllerAs: 'imageCtrl'
            });
        $urlRouterProvider.otherwise('/image');
    }

})();