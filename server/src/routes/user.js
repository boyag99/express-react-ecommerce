const express = require('express');

const router = express.Router();

router.get('/user', (req, res) => {
    res.send({
        data: 'hey u hit user API',
    });
});

module.exports = router;
