var express = require('express');
var router = express.Router();
const data = require('../data/mydata');

router.get('/', function(req, res) {
    res.render('cart', {
        title: 'Kosara'
    });
});

router.get('/add/:id', function(req, res, next) {
    let id = parseInt(req.params.id);

   if (req.session.kosara === undefined) {
        req.session.kosara = []

        for (let i = 0; i < data.categories.length; i++) {
            for (let j = 0; j < data.categories[i].products.length; j++) {
                req.session.kosara.push(0);
            }
        }
   }
   else {
        req.session.kosara[id]++;
   }

   res.send(1);
})

router.get('/remove/:id', function(req, res, next) {
    let id = parseInt(req.params.id);

   if (req.session.kosara === undefined) {
        req.session.kosara = []

        for (let i = 0; i < data.categories.length; i++) {
            for (let j = 0; j < data.categories[i].products.length; j++) {
                req.session.kosara.push(0);
            }
        }
   }
   else {
        if (req.session.kosara[id] > 0)
        req.session.kosara[id]--;
   }

   res.send(1);
})

router.get('/getAll', function(req, res) {
    if (req.session.kosara === undefined) {
        req.session.kosara = []

        for (let i = 0; i < data.categories.length; i++) {
            for (let j = 0; j < data.categories[i].products.length; j++) {
                req.session.kosara.push(0);
            }
        }
   }

   res.json(req.session.kosara);
})

module.exports = router;