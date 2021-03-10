const v2 = require('cloudinary').v2;

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.upload = async (req, res) => {
    try {
        const result = await v2.uploader.upload(req.body.image, {
            public_id: `${Date.now()}`,
            resource_type: 'auto',
        });

        res.json({
            public_id: result.public_id,
            url: result.secure_url,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.remove = async (req, res) => {
    try {
        let result = await v2.uploader.destroy(req.body.public_id);

        res.send('ok');
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
};
