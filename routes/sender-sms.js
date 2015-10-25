var express = require('express');
var router = express.Router();

/* Send SMS */
router.get('/', function (req, res) {
  // Imports
  var fs = require('fs');

  // Defaults
  var configFile = 'bin/config.json';

  // Load config
  var configuration = JSON.parse(
      fs.readFileSync(configFile)
  );

  // Configure clockwork
  var clockwork = require('clockwork')({key: configuration.API_KEY});
  // Test message
  var sms_to = req.query.to;
  var sms_from = configuration.MIDDLEMAN_NUMBER;
  var sms_content = req.query.content;
  if (sms_to == "" || sms_content == "") {
    res.status(400);
  }

  clockwork.sendSms({To: sms_to, Content: sms_content, From: sms_from}, function (error, response) {
    if (error) {
      console.log('Error', error);
    } 
  });
  res.json({});
});

module.exports = router;
