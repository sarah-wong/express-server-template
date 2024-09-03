const express = require('express');
const user = require('./models/user');
const channel = require('./models/channel');
const message = require('./models/message');


const app = express();

const PORT = '3000';

app.use((req, res, next)=>{
    const httpMethod = req.method.toUpperCase();
    const path = req.path;
    console.log(`Got ${httpMethod} Request for '${path}'`);
    next();
})

app.get('/', (req, res)=>{
    res.send("Welcome to the Homepage");
})

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})