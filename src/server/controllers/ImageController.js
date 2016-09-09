var Image = require('../models/ImageModel.js'),
    config = require('../configs/config.js'),
    AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretAccessKey,
    region: config.s3.region
});

var s3 = new AWS.S3(),
    BucketName = config.s3.BucketName;

module.exports = {
    uploadImage: function (req, res) {
        var buf = new Buffer(req.body.imageBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        var params = {
            Bucket: BucketName,
            Key: req.body.imageName,
            Body: buf,
            ACL: 'public-read',
            ContentType: 'image/' + req.body.imageExtension
        };
        s3.upload(params, function(err, data) {
            if (err) {
                return res.send(err);
            } else {
                var imageData = { title: data.Key, url: data.Location };
                Image
                    .create(imageData, function(err, result) {
                        err ? res.status(500) : res.status(200).json(result);
                    })
            }
        });
    },
    getImages: function (req, res) {
        Image
            .find({})
            .exec(function(err, result) {
                err ? res.status(500).send(err) : res.json(result);
            })
    },
    deleteImage: function (req, res) {
        var params = { Bucket: BucketName, Key: req.body.key };
        s3.deleteObject(params, function(err, data) {
            if (err) {
                res.send(err);
            } else {
                var idToDelete = req.params.id;
                Image
                    .remove({_id: idToDelete}, function(err) {
                        err ? res.status(500).json('failed to delete') : res.json('Successfully deleted record');
                    });
                res.send(data);
            }
        });
    }
};