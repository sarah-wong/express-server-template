const uniqueID = require('generate-unique-id');

class Channel{
    constructor(name, description){
        this.name = name;
        this.description = description;
        this.messages = [];
    }
}

const validChannelName = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const channels = {};


// validation helpers
function checkName(name){
    
    if(!name.match(validChannelName)){
        console.error(`'${name}' is not a valid channel name`);
        return false;
    }

    const nameMatch = channels.values().filter((channel) => channel.name === name);
    if(nameMatch.length > 0){
        console.error(`Channel called '${name}' already exists!`);
        return false;
    }
    return true;
}

// Retrieval helpers
function getChannel(id){
    console.log(`Attempting to retrieve Channel ${id}...`);
    if(channels.keys().includes(id)){
        const channel = channels[id];
        console.log(`Found: Channel ${id} is ${channel.name}`);
        return channel;
    }
    else{
        console.error(`No Channel with ID ${id}`);
        return null;
    }
}

// C.R._.D. functions
function create(name, description){
    if(checkName(name)){
        const id = uniqueID();
        const channel = new Channel(name, description);
        channels[id] = channel;
        return id;
    }
    return 0;
}
function read(cid){
    const channel = getChannel(cid);
    if(channel){
        console.log(`Sending info for Channel ${channel.name}`);
        const channelInfo = {
            id : cid,
            name : channel.name,
            description : channel.description,
            message_count : channel.messages.length,
            messages : channel.messages
        }
        return channelInfo;
    }
    return null;
}
function del(cid){
    const channel = getChannel(cid);
    if(channel){
        delete channels[cid];
        console.log(`Channel ${cid} successfully deleted`);
        return true;
    }
    else{
        console.log(`Channel ${cid} could not be deleted`);
    }
}

module.exports = {create, read, update, del};