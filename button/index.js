var redis = require("redis");
const five = require('johnny-five');
const Raspi = require('raspi-io');

const client = redis.createClient({
    host: "localhost",
    port: 6379
});

var getQuote = () => {
    return new Promise((resolved, rejected) => {
        client.send_command('RANDOMKEY', [], (err, key) => {
            if (err) rejected(err);
            client.get(key, (err, data) => {
                if (err) rejected(err);
                var model = JSON.parse(data)

                if (!model || !model.voiceId) {
                    return rejected("No data");
                }
                var message = {
                    key: data.key,
                    text: model.text,
                    voiceId: model.voiceId.Id
                }
                var enveloped = JSON.stringify(message)
                return resolved(enveloped);
            });
        });
    })
};

var board = new five.Board({
    io: new Raspi()
});

board.on('ready', function () {
    console.log("board ready \r\n");
    var led = new five.Led("4");
    var button = new five.Button({
        pin: 'GPIO14',
        isPullup: true
    });

    board.repl.inject({
        button: button
    });

    // 'down' the button is pressed
    button.on('down', () => {
        console.log("button clicked");
        led.blink();
        getQuote()
            .then(data => {
               
                client.publish("quoter", data);
                led.stop()
            })
            .catch(err=>{
                led.stop()
                console.log(err);
            })
    })

})
