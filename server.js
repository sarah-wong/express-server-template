const express = require('express');
const user = require('./models/user');
const channel = require('./models/channel');
const message = require('./models/message');


const app = express();

const PORT = '3000';

app.engine('html', require('ejs').renderFile);

app.use((req, res, next)=>{
    console.log('New Request!');
    next();
})

app.use((req, res, next)=>{
    const httpMethod = req.method.toUpperCase();
    const path = req.path;
    console.log(`Logged ${httpMethod} Request for '${path}'`);
    next();
})

app.get('/', (req, res)=>{
    res.render('home.html');
})

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})