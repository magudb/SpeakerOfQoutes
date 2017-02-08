var redis = require("redis");
const pub = redis.createClient({
     host:"localhost",
    port:32768
});

var message = {
    text:"Hej med dig",
    voiceId:"Mads"
}
var enveloped = JSON.stringify(message)
pub.publish("quoter", enveloped);