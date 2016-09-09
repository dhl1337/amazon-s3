var ImageController = require('../controllers/ImageController.js');

module.exports = function (app) {

    app.get('/api/v1/images', ImageController.getImages);

    app.post('/api/v1/images', ImageController.uploadImage);
    app.post('/api/v1/images', ImageController.deleteImage);

};