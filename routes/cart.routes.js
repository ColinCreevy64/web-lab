var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('cart', {
        title: 'Kosara'
    });
});

router.get('/add/:id', function(req, res) {
    let kos = ucitaj_kosaru();
    console.log(kos);
})

module.exports = router;