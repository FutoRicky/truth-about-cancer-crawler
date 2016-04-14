var prompt = require('prompt');
var Nightmare = require('nightmare');

var randString = function()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};


var registerReferral = function(url, refAmount) {
  var nightmare = new Nightmare({show: false});
  nightmare
  .goto(url)
  .type('input[name="first_name"]', randString())
  .type('input[name="email"]', randString() + '@hotmail.com')
  .click('.pform .btn-container button')
  .end()
  .then(function() {
    console.log("Referral process #", processCount + 1, " done");
    processCount++;
    if (processCount < refAmount) {
      registerReferral(url, refAmount);
    } else {
      console.log("Referral Process Over");
    }
  });
};

var processCount = 0;

prompt.start();
prompt.get([{
    name: 'url',
    message: 'Your referral url',
    required: true
  }, {
    name: 'refAmount',
    message: 'Amount of referrals you want',
    type: 'integer'
  }], function (err, result) {
    if (!result.url) {
      console.log("Please provide valid referral url");
    } else {
      var refAmount = 25;
      url = result.url;
      if (result.refAmount) {
        refAmount = result.refAmount;
      }
      console.log("Processing, please wait...");
      registerReferral(result.url, refAmount);
    }
});
