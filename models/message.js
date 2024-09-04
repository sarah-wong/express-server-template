class Message{
    constructor(userID, content, timestamp){
        this.user = userID;
        this.content = content;
        this.timestamp = timestamp;
    }
}

module.exports = Message;
