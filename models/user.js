const uniqueID = require('generate-unique-id');
const validator = require('email-validator');

class User{
    constructor(email, username){
        this.email = email;
        this.username = username;
    }
}

const users = {};

function create(email, username){
    console.log('Attempting to create new User...');

    // check email is valid
    if(validator.validate(email)){
        console.log(`'${email}' is a valid email, proceeding...`);
    }
    else{
        throw new EvalError(`'${email}' is NOT a valid email!`)
    }

    // check username is not taken
    const nameMatch = users.values().filter((user) => user.username === username);
    if(nameMatch.length > 0){
        throw new EvalError(`Username '${username}' is taken!`)
    }
    // check username does not contain special characters
    else if(username.match(SPECHAR_REGEX)){
        throw new EvalError(`Username CANNOT contain special characters!`)
    }
    else{
        console.log(`${username} is valid and unique, proceeding...`);
    }

    const id = uniqueID();
    users.push(new User(email, username));
}

function read(id){
    if(users.keys().includes(id)){

    }
}

function update(){

}

function del(){

}

module.exports = {create, read, update, del};