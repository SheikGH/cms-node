const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/example.controller');

router.get('/', (req, res) => {
    res.send('Welcome to the API root!');
});

router.get('/example', exampleController.getExample);

module.exports = router;