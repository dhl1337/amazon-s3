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
            })
            .state('pdf', {
                url: '/pdf',
                templateUrl: '../app/components/pdf/pdf.html',
                controller: 'PdfController',
                controllerAs: 'pdfCtrl'
            })
            .state('video',  {
                url: '/video',
                templateUrl: '../app/components/video/video.html',
                controller: 'VideoController',
                controllerAs: 'videoCtrl'
            });
        $urlRouterProvider.otherwise('/image');
    }

})();