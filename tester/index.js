var redis = require("redis");
var outlook = require('node-outlook');

const client = redis.createClient({
    host: "localhost",
    port: 6379
});
var message = {
    text: "You have 4 new e-mails",
    voiceId: "Kimberly"
}
var enveloped = JSON.stringify(message)

client.publish("quoter", enveloped);


