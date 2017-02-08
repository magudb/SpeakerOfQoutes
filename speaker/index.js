const Speaker = require('speaker');
const Stream = require('stream');
const AWS = require('aws-sdk');
const redis = require("redis");
const subscriber = redis.createClient({
    host: "localhost",
    port: 32768
});

const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
});

// Create the Speaker instance
let Player = new Speaker({
    channels: 1,
    bitDepth: 16,
    sampleRate: 16000
})


let speak = (text, voiceId) => {
    let params = {
        'Text': text,
        'OutputFormat': 'pcm',
        'VoiceId': voiceId
    }

    Polly.synthesizeSpeech(params, (err, data) => {
        if (err) {
            console.log(err)
        } else if (data) {
            if (data.AudioStream instanceof Buffer) {
                // Initiate the source
                var bufferStream = new Stream.PassThrough()
                // convert AudioStream into a readable stream
                bufferStream.end(data.AudioStream)
                // Pipe into Player
                bufferStream.pipe(Player)
                return
            }
            console.log("not saying stuff")

        }
    });
};

subscriber.on("message", function (channel, data) {
    var message = JSON.parse(data);
    console.log(`I will say ${message.text} with voice ${message.voiceId}`);
    speak(message.text, message.voiceId)
});

subscriber.subscribe("quoter");





