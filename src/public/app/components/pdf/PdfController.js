(() => {
    angular
        .module('amazonS3')
        .controller('PdfController', ['PdfService', PdfController]);

    function PdfController (PdfService) {

    }

})();
