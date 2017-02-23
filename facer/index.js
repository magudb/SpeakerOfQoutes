var redis = require("redis");
var outlook = require('node-outlook');

const client = redis.createClient({
    host: "localhost",
    port: 6379
});


client.on("message", function (channel, data) {
    var message = {
        text: "I see you",
        voiceId: "Kimberly"
    }
    var enveloped = JSON.stringify(message)

    client.publish("quoter", enveloped);
});

client.subscribe("facer");


