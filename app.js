const express = require('express')
const app = express()
const port = 3000
const path=require('path')
const session = require('express-session')
const mongoose = require('mongoose');
const flash = require('connect-flash');
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/platformhtml',
    collection: 'mySessions'
  });
app.use(flash());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
  }))

app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs')
app.use(require('./routes/login.routes'))
app.use(require('./routes/register.routes'))
app.use(require('./routes/home.routes'))
app.use(require('./routes/profile.routes'))
app.use(require('./routes/accountsetting.routes'))

app.use(express.static(path.join(__dirname,'public')))
mongoose.connect('mongodb://localhost:27017/platformhtml', {useNewUrlParser: true, useUnifiedTopology: true});
app.listen(port, () => console.log(`Example app listening on port port!`))