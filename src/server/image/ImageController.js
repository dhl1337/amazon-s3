import Image from './ImageModel';
import config from '../configs/config';
import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretAccessKey,
    region: config.s3.region
});

let s3 = new AWS.S3();
let BucketName = config.s3.BucketName;

export function uploadImage (req, res) {
    let buf = new Buffer(req.body.imageBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    let params = {
        Bucket: BucketName,
        Key: req.body.imageName,
        Body: buf,
        ACL: 'public-read',
        ContentType: 'image/' + req.body.imageExtension
    };
    s3.upload(params, (err, data) => {
        if (err) {
            return res.send(err);
        } else {
            let imageData = { title: data.Key, url: data.Location };
            Image
                .create(imageData, (err, result) => {
                    err ? res.status(500) : res.status(200).json(result);
                })
        }
    });
}

export function getImages (req, res) {
    Image
        .find({})
        .exec((err, result) => {
            err ? res.status(500).send(err) : res.json(result);
        })
}

export function deleteImage(req, res) {
    let params = { Bucket: BucketName, Key: req.body.key };
    s3.deleteObject(params, (err) => {
        if (err) {
            return res.send(err);
        } else {
            Image
                .remove({_id: req.params.id}, (err) => {
                    err ? res.status(500).json('failed to delete') : res.json('Successfully deleted record');
                });
        }
    });
}