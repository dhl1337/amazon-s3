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
                controllerAs: 'image'
            })
            .state('pdf', {
                url: '/pdf',
                templateUrl: '../app/components/pdf/pdf.html',
                controller: 'PdfController',
                controllerAs: 'pdf'
            })
            .state('video',  {
                url: '/video',
                templateUrl: '../app/components/video/video.html',
                controller: 'VideoController',
                controllerAs: 'video'
            });
        $urlRouterProvider.otherwise('/image');
    }

})();