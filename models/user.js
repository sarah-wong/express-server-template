const uniqueID = require('generate-unique-id');
const validator = require('email-validator');
const passwordReqs = /^(?=*[A-Z])(?=*[a-z])(?=*[0-9])(?=*[^A-Za-z0-9]).{8,}$/;
const usernameReqs = /^(?!*[^A-Za-z0-9_]).{4,}$/;

class User{
    constructor(email, username, password){
        this.email = email;
        this.username = username;
        this.password = password;
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
    else if(!username.match(usernameReqs)){
        throw new EvalError(`Username does not meet requirements!`);
    }
    else{
        console.log(`${username} is valid and unique, proceeding...`);
    }
    // check password strength
    if(password.match(passwordReqs)){
        console.log('Password requirements met, proceeding....');
    }
    else{
        throw new EvalError(`Password does not meet requirements!`);
    }

    const id = uniqueID();
    users[id] = new User(email, username, password);
    console.log(`Success! New user ${username} registered (UserID: ${id})`);
    return id;
}

function read(id){
    console.log(`Attempting to retrieve UserID: ${id}`);
    if(users.keys().includes(id)){

    }
}

function update(){

}

function del(){

}

module.exports = {create, read, update, del};