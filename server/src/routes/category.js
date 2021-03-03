const express = require('express');
const router = express.Router();

const { authCheck, adminCheck } = require('../middlewares/auth');
const {
    create,
    read,
    update,
    remove,
    list,
} = require('../controllers/category');

router.post('/category/create', authCheck, adminCheck, create);
router.get('/category/read/:slug', authCheck, adminCheck, read);
router.put('/category/update/:slug', authCheck, adminCheck, update);
router.delete('/category/remove/:slug', authCheck, adminCheck, remove);
router.get('/categories', list);

module.exports = router;
