const uniqueID = require('generate-unique-id');
const validator = require('email-validator');
const passwordReqs = /^(?=*[A-Z])(?=*[a-z])(?=*[0-9])(?=*[^A-Za-z0-9]).{8,}$/;
const usernameReqs = /^(?!*[^A-Za-z0-9_]).{4,}$/;
const emailMiddleChar = /^(?<=.{2}).(?=@)/gm;

class User{
    constructor(email, username, password){
        this.email = email;
        this.username = username;
        this.password = password;
    }
}

const users = {};

// Validation helpers
function checkEmail(email){
    if(validator.validate(email)){
        console.log(`'${email}' is a valid email, proceeding...`);
        return true;
    }
    else{
        console.error(`'${email}' is NOT a valid email!`);
        return false;
    }
}
function checkUsername(username){
    const nameMatch = users.values().filter((user) => user.username === username);
    if(nameMatch.length > 0){
        console.error(`Username '${username}' is taken!`)
        return false;
    }
    else if(!username.match(usernameReqs)){
        console.error(`Username does not meet requirements!`);
        return false;
    }
    else{
        console.log(`${username} is valid and unique, proceeding...`);
        return true;
    }
}
function checkPassword(password){
    if(password.match(passwordReqs)){
        console.log('Password requirements met, proceeding....');
        return true;
    }
    else{
        console.error(`Password does not meet security requirements!`);
        return false;
    }
}

// Retrieval helpers
function getUser(id){
    console.log(`Attempting to retrieve User ${id}...`);
    if(users.keys().includes(id)){
        const user = users[id];
        console.log(`Found: User ${id} is ${user.username}`);
        return user;
    }
    else{
        console.error(`No User with ID ${id}`);
        return null;
    }
}

// C.R.U.D. functions
function create(email, username, password){
    console.log('Attempting to create new User...');

    const validEmail = checkEmail(email);
    const validUsername = checkUsername(username);
    const validPassword = checkPassword(password);

    if(!(validEmail && validUsername && validPassword)){
        console.error('Validation failure!');
        return 0;
    }

    const id = uniqueID();
    users[id] = new User(email, username, password);
    console.log(`Success! New user ${username} registered (UserID: ${id})`);
    return id;
}

function read(uid){
    const user = getUser(uid);
    if(user){
        const censoredEmail = user.email.replaceAll(emailMiddleChar, '*');
        const userInfo = {
            id : uid,
            email : censoredEmail,
            username : user.username
        }
        return userInfo;
    }
    return null;
}

function update(uid, currPassword, newInfo = {email, username, password}){
    const user = getUser(uid);
    if(user){
        if(currPassword != user.password){
            console.log('Failed: Password does not match!');
            return null;
        }
        if(!newInfo){
            console.log('Failed: No new info!');
            return null;
        }
        if(newInfo.email && checkEmail(newInfo.email)){
            console.log(`Updating email to ${newInfo.email}`);
            user.email = newInfo.email;
        }
        else{
            console.log('New email is missing or invalid. skipping...');
        }
        if(newInfo.username && checkUsername(newInfo.username)){
            console.log(`Updating username to ${newInfo.username}`);
            user.username = newInfo.username;
        }
        else{
            console.log('New username is missing or invalid, skipping...');
        }
        if(newInfo.password && checkPassword(newInfo.username)){
            console.log('Updating password');
            user.password = newInfo.password;
        }
        else{
            console.log('New password is missing or invalid, skipping...');
        }
        return user;
    }
    return null;
}

function del(uid, currPassword){
    const user = getUser(uid);
    if(user){
        if(currPassword != user.password){
            console.log('Failed: Password does not match!');
            return false;
        }
        delete users[uid];
        console.log(`User ${uid} successfully deleted`);
        return true;
    }
    return false;
}

module.exports = {create, read, update, del};