var prompt = require('prompt');
var Nightmare = require('nightmare');
var faker = require('faker');

var registerReferral = function(url, refAmount) {
  var nightmare = new Nightmare({show: true});
  nightmare
  .goto(url)
  .type('input[name="first_name"]', faker.name.firstName())
  .type('input[name="email"]', faker.internet.email())
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
