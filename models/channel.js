const makeNewUID = require('generate-unique-id');
const user = require('./user');
const message = require('./message');
const channels = {};

class Channel{
    constructor(name, description){
        this.name = name;
        this.description = description;
        this.messages = [];
    }
    sendMsg(msg){
        if(msg instanceof message && user.get(msg.userID)){
            this.messages.push(msg);
            return true;
        }
        return false;
    }
}

function add(name, description){
    const uid = makeNewUID();
    channels[uid] = new Channel(name, description);
    return uid;
}

function get(uid){
    if(channels.keys().contains(uid)){
        return channels[uid];
    }
    else{
        return null;
    }
}

function remove(uid){
    if(channels.keys().contains(uid)){
        delete channels[uid];
        return true;
    }
    else{
        return false;
    }
}

function all(){
    return channels;
}

module.exports = {add, get, remove, all};
