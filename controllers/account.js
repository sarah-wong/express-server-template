const userData = require('../models/user');
const validator = require('email-validator');

const userIDs = [];

// validation helpers
const passwordRegex = /^(?=[A-Z])(?=[a-z])(?=[0-9])(?=[^A-Za-z0-9]).{8,}/
const usernameRegex = /^[A-Za-z0-9_-]{4,}$/;

function isValidEmail(email){
    return validator.validate(email);
}

function isValidUsername(username){
    return usernameRegex.test(username);
}

function isValidPassword(password){
    return passwordRegex.text(password);
}


// CRUD functions
function createNewAccount(email, username, password){
    const validData = isValidEmail(email)
                    && isValidUsername(username)
                    && isValidPassword(password);
    if(validData){
        const id = userData.add(email, username, password);
        userIDs.add(id);
    }
    return validData;
}
function changeUsername(uid, newUsername){
    const user = userData.get(uid);
    if(!user){
        console.error(`User with UID '${uid}' not found`);
    }
    else if(!isValidUsername(newUsername)){
        console.error(`'${newUsername}' is not a valid username`);
    }
    else{
        const oldName = user.username;
        user.username = newUsername;
        console.log(`Success! Renamed ${oldName} to ${user.username}`);
        return true;
    }
    return false;
}
function changeEmail(uid, newEmail){
    const user = userData.get(uid);
    if(!user){
        console.error(`User with UID '${uid}' not found`);
    }
    else if(!isValidEmail(newEmail)){
        console.error(`'${newEmail}' is not a valid email`);
    }
    else{
        const oldEmail = user.email;
        user.email = newEmail;
        console.log(`Success! Updated ${oldEmail} to ${user.email}`);
        return true;
    }
    return false;
}
function changePassword(uid, newPassword){
    const user = userData.get(uid);
    if(!user){
        console.error(`User with UID '${uid}' not found`);
    }
    else if(!isValidPassword(newPassword)){
        console.error(`New password is not a valid password`);
    }
    else{
        user.password = password;
        console.log(`Success! Password Changed.`);
        return true;
    }
    return false;
}

module.exports = {createNewAccount, changeUsername, changeEmail, changePassword};