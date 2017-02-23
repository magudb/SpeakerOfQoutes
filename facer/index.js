var redis = require("redis");
var outlook = require('node-outlook');

const client = redis.createClient({
    host: "localhost",
    port: 6379
});

const subscriber = redis.createClient({
    host: "localhost",
    port: 6379
});


subscriber.on("message", function (channel, data) {
    var message = {
        text: "I see you",
        voiceId: "Kimberly"
    }
    var enveloped = JSON.stringify(message)

    client.publish("quoter", enveloped);
});

subscriber.subscribe("facer");


