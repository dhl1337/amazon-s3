(() => {
    angular
        .module('amazonS3')
        .controller('VideoController', ['VideoService', VideoController]);

    function VideoController (VideoService) {

    }

})();