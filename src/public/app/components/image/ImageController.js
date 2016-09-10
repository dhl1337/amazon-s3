(() => {
    angular
        .module('amazonS3')
        .controller('ImageController', ['ImageService', ImageController]);

    function ImageController (ImageService) {

    }

})();
