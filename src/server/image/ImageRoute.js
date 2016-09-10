import {getImages, uploadImage, deleteImage} from './ImageController';

module.exports = function (app) {
    app.get('/api/v1/images', getImages);
    app.post('/api/v1/images', uploadImage);
    app.post('/api/v1/images/:id', deleteImage);
};