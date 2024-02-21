const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'djg6g0udl',
    api_key: '876152514368187',
    api_secret: 'gx3ijqvLAEaUMOq-nX7eL2LJDzk',
});

// Function to upload file to Cloudinary
const uploadToCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        }).end(fileBuffer);
    });
};

module.exports = uploadToCloudinary;