var express = require('express');
var router = express.Router();
const data = require('../data/mydata');

router.get('/', function(req, res, next) {
    res.render('home', {
        title: "Ducan"
    });
});

module.exports = router;