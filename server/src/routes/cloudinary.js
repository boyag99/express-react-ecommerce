const express = require('express');
const router = express.Router();

const { authCheck, adminCheck } = require('../middlewares/auth');
const { upload, remove } = require('../controllers/cloudinary');

router.post('/images/upload', authCheck, adminCheck, upload);
router.post('/images/remove', authCheck, adminCheck, remove);

module.exports = router;
