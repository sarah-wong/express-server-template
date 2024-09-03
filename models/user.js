const uniqueID = require('generate-unique-id');
const validator = require('email-validator');

const CASE_REGEX = /^(?=*[A-Z])(?=*[a-z])$/;
const NUM_REGEX = /^(?=*[0-9])$/;
const SPECHAR_REGEX = /^(?=*[^A-Za-z0-9])$/;
const MIN_PASSWORD_LENGTH = 8;

class User{
    constructor(email, username, password){
        this.email = email;
        this.username = username;
        this.password = password; // TODO: Don't store passwords as plaintext!
    }
}

const users = {};

function create(email, username, password){
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

    // check password strength
    if(password.length < MIN_PASSWORD_LENGTH){
        throw new EvalError(`Password MUST be at least ${MIN_PASSWORD_LENGTH} characters long!`);
    }
    else if(!password.match(CASE_REGEX)){
        throw new EvalError('Password MUST contain at least one uppercase and one lowercase letter!')
    }
    else if(!password.match(NUM_REGEX)){
        throw new EvalError('Passowrd MUST contain at least one number!');
    }
    else if(!password.match(SPECHAR_REGEX)){
        throw new EvalError(`Password MUST contain at least one special character`);
    }
    else{
        console.log('strong password, proceeding...');
    }

    // create and cache new user
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