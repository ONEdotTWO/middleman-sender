var express = require('express');
var router = express.Router();

/* Send SMS */
router.get('/', function(req, res) {
// Imports
var fs = require('fs');
var math = require('mathjs');
var MongoClient = require('mongodb').MongoClient;

// Defaults
var configFile = 'bin/config.json';

// Load config
var configuration = JSON.parse(
    fs.readFileSync(configFile)
);

// Configure clockwork
var clockwork = require('clockwork')({key:configuration.API_KEY});

// Test message
var sms_to = configuration.TEST_PHONE_NUMBERS[math.randomInt(3)];
var sms_from = configuration.MIDDLEMAN_NUMBER;
var sms_content = "MATT SPAMS ALL";

clockwork.sendSms({To:sms_to,Content:sms_content, From:sms_from}, function(error, response) {
    if (error) {
        console.log('Error', error);
    } else {
        // Connect to the db and submit change
        MongoClient.connect(configuration.MONGO_URI, function(err, db) {
            if(!err) {
                var collection = db.collection('messages');
                var document = {'to':sms_to, 'from':sms_from, 'message':sms_content};
                collection.insert(document, {w:1}, function(err, result) {
                    if(err) {
                        console.log("Couldn't send to database");
                    }
                });
            } else {
                console.log("ERROR: Couldn't connect to remote mongo");
            }
        });
    }
});
res.json("{}");
//res.status(200);
});

module.exports = router;
