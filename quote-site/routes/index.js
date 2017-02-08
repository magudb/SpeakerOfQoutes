var express = require('express');
var router = express.Router();

const AWS = require('aws-sdk');
const redis = require("redis");
const client = redis.createClient({
  host: "localhost",
  port: 32768
});

const Polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: 'us-east-1'
 
});

/* GET home page. */
router.get('/', function (req, res, next) {
  var languages = ["cy-GB", "da-DK",
    "de-DE", "en-AU",
    "en-GB", "en-GB-WLS",
    "en-IN", "en-US",
    "es-ES", "es-US",
    "fr-CA", "fr-FR",
    "is-IS", "it-IT",
    "ja-JP", "nb-NO",
    "nl-NL", "pl-PL",
    "pt-BR", "pt-PT",
    "ro-RO", "ru-RU",
    "sv-SE", "tr-TR2"]

  res.render('index', { languages: languages });
});

router.post("/add", (req, res, next) => {

  var params = {
    LanguageCode: req.language
  };
  Polly.describeVoices(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      return res.redirect('/?DONE=sadness');
    } // an error occurred
    else {
      var gender = req.body.gender;
      if (gender == "Other") {
        var genders = ["Female", "Male"];
        gender = genders[Math.floor(Math.random() * genders.length)];
      }
      console.log(gender);

      var voiceId = data.Voices.filter(voice => {
        return voice.LanguageCode == req.body.language.toString() && voice.Gender == gender;
      })[0];
      console.log(voiceId);
      var model = {
        text: req.body.text,
        voiceId: voiceId
      };
      var stringed = JSON.stringify(model);
      client.set(req.body.text.replace(/\W/g, ''), stringed, redis.print);
      res.redirect('/?DONE=happiness');
    }           // successful response
  });

});

router.get('/random', function (req, res, next) {
  client.send_command('RANDOMKEY', [], (err, key) => {
    if (err) return res.json({ err: err });

    client.get(key, (err, data) => {
      if (err) return res.json({ err: err });

      res.json(JSON.parse(data));
    });
  });
  
});
module.exports = router;
