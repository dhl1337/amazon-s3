(() => {
    'use strict';
    angular
        .module('amazonS3')
        .controller('ImageController', ['imageService', ImageController]);

    function ImageController (imageService) {
        const vm = this;

        vm.addImageModal = addImageModal;
        vm.getImages = getImages;
        vm.deleteImageModal = deleteImageModal;
        vm.deleteImage = deleteImage;
        vm.addImage = addImage;

        vm.uploadingVideo = false;

        function getImages() {
            imageService.getImages().then((data) => {
                vm.images = data;
                vm.images.length === 0 ? vm.imageTable = false : vm.imageTable = true;
            })
        }

        getImages();
        function addImageModal() {
            $('#addImageModal').modal('show');
        }

        function deleteImageModal(id, key) {
            vm.imageId = id;
            vm.videoKey = key;
            $('#deleteImageModal').modal('show');
        }

        function deleteImage() {
            let videoData = { key: vm.videoKey };
            imageService.deleteImage(vm.imageId, videoData).then( () => {
                getImages();
            })
        }

        function addImage() {
            $('#file').trigger('upload');
            vm.uploadingVideo = true;
        }

        var fileName;

        $('#file').on("upload", (event) => {
            for (var f in event.target.files) {
                if (typeof event.target.files[f] === "object") {
                    uploadFile(event.target.files[f]);
                    fileName = event.target.files[0].name;
                }
            }
        });

        let uploadFile = (file) => {
            let fileReader = new FileReader();

            fileReader.onload = (loaded) => {
                //Once loaded, run this code
                let fileread = loaded.target.result;
                imageService.storeImage(fileread, fileName)
                    .then(() => {
                        getImages();
                        vm.uploadingVideo = false;
                    })
                    .catch( (err) => {
                        console.error(err);
                    });
            };
            fileReader.readAsDataURL(file);
        }

    }

})();
