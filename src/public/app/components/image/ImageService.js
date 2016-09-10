(() => {
    'use strict';
    angular
        .module('amazonS3')
        .service('imageService', ['$http',imageService]);

    function imageService ($http) {

        this.storeImage = (imageData, fileName) => {
            let imageExtension = imageData.split(';')[0].split('/');
            imageExtension = imageExtension[imageExtension.length - 1];

            let newImage = {
                imageName: fileName,
                imageBody: imageData,
                imageExtension: imageExtension
            };

            $http.post('/api/v1/images', newImage).then(response => response.data);
        };

        this.getImages = () => $http.get('/api/v1/images').then(response => response.data);

        this.deleteImage = (imageId, imageData) => {
            $http.post('/api/v1/images/' + imageId, imageData).then(response => response.data);
        }
    }

})();
