import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,   // set in your .env
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadFileToS3 = (file, folderName) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${folderName}/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  return s3.upload(params).promise();
};


export const deleteFileFromS3 = (fileUrl) => {
  // fileUrl: https://bucket.s3.amazonaws.com/folder/filename.jpg
  const url = new URL(fileUrl);
  const Key = decodeURIComponent(url.pathname.substring(1)); // remove leading slash

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key,
  };

  return s3.deleteObject(params).promise();
};

