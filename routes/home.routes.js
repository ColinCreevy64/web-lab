var express = require('express');
var router = express.Router();
const path = require("path");
const data = require('../data/mydata');

router.get('/', function(req, res, next) {
    res.render('home', {
        title: "Ducan"
    });
});

router.get('/getCategories', function(req, res) {
    kategorije = [];
    for (let i = 0; i < data.categories.length; i++) {
        kategorije.push(data.categories[i].name);
    }

    res.json(kategorije);
})

router.get('/getProducts/:id', function(req, res) {
    let id = parseInt(req.params.id);

    res.json(data.categories[id].products);
})

router.get("/views/partials/header", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/partials/header.ejs"));
});

router.get("/views/partials/footer", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/partials/footer.ejs"));
});

module.exports = router;