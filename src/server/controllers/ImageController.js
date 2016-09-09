var Image = require('../models/ImageModel.js'),
    config = require('../configs/config.js'),
    AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretAccessKey,
    region: config.s3.region
});

module.exports = {
    uploadImage: function (req, res) {},
    getImages: function (req, res) {},
    deleteImage: function (req, res) {}
};