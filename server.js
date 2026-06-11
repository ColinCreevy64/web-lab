const express = require('express');
const app = express();
var path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

app.use(session({
    secret: 'Tajni labos',
    resave: false,
    store: new FileStore(),
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60
    }
}))

const homeRouter = require('./routes/home.routes');
const cartRouter = require('./routes/cart.routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/cart', cartRouter);

app.listen(3000);