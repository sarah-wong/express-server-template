class Message{
    constructor(user, content){
        this.user = user;
        this.content = content;
        this.timestamp = Date.now();
    }
}