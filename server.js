const express = require('express');
const userModel = require('./models/user');
const channelModel = require('./models/channel');
const messageModel = require('./models/message');


const app = express();

const PORT = '3000';

app.use((req, res, next)=>{
    console.log('This is custom middleware that runs for all routes');
})


app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})