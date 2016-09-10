import { getImages, uploadImage, deleteImage } from './ImageController';

export default (app) => {
    app.get('/api/v1/images', getImages);
    app.post('/api/v1/images', uploadImage);
    app.post('/api/v1/images/:id', deleteImage);
};