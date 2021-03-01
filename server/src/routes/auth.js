const express = require('express');

const router = express.Router();

router.get('/create-or-update-user', (req, res) => {
    res.send({
        data: "hey u hit create-or-update-user API"
    })
});

module.exports = router;