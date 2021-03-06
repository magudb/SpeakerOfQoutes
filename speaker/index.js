const Speaker = require('speaker');
const Stream = require('stream');
const AWS = require('aws-sdk');
const redis = require("redis");
const subscriber = redis.createClient({
    host: "localhost",
    port: 6379
});
const async = require("async");


let speak = (text, voiceId) => {
    const Polly = new AWS.Polly({
        signatureVersion: 'v4',
        region: 'us-east-1'
    });

    // Create the Speaker instance
    const Player = new Speaker({
        channels: 1,
        bitDepth: 16,
        sampleRate: 16000
    })

    let params = {
        'Text': text,
        'OutputFormat': 'pcm',
        'VoiceId': voiceId
    }
    return new Promise((resolved, rejected) => {
        Polly.synthesizeSpeech(params, (err, data) => {
            if (err) {
                console.log(err)
                return rejected(err);
            } else if (data) {
                if (data.AudioStream instanceof Buffer) {
                    // Initiate the source
                    var bufferStream = new Stream.PassThrough();
                    // convert AudioStream into a readable stream
                    bufferStream.end(data.AudioStream);
                    // Pipe into Player
                    bufferStream.pipe(Player);
                    return resolved(`I said it! - "${params.Text}`);
                }
                return rejected(`I'm not saying "${params.Text}"!!!`);
            }
        });
    })

};

var q = async.queue(function (message, callback) {
    speak(message.text, message.voiceId)
        .then((res) => {
            console.log(res);
            callback();
        })
        .catch((res) => {
            console.log(res);
            callback(res);
        });

}, 1);

subscriber.on("message", function (channel, data) {
    var message = JSON.parse(data);
    
    q.push(message, function (err) {
        if (err) console.log(err);
       return
    });

});

subscriber.subscribe("quoter");





