const makeNewUID = require('generate-unique-id');

class User{
    constructor(email, username, password){
        this.email = email;
        this.username = username;
        this.password = password;
    }
}

const users = {};

function add(email, username, password){
    const uid = makeNewUID();
    users[uid] = new User(email, username, password);
    return uid;
}

function get(uid){
    if(users.keys().contains(uid)){
        return users[uid];
    }
    else{
        return null;
    }
}

function remove(uid){
    if(users.keys().contains(uid)){
        delete users[uid];
        return true;
    }
    else{
        return false;
    }
}

function all(){
    return users;
}

module.exports = {add, get, remove, all};