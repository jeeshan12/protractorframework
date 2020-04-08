var HTMLReport = require('protractor-html-reporter-2');
const fs = require('fs-extra')
var jasmineReporters = require('jasmine-reporters');
exports.config = {
  framework: 'jasmine',
  capabilities: {
    browserName: 'chrome'
  },
  specs: ['./tests/oneWay.spec.js'],
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'https://www.cleartrip.com/',
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
      args: ['--disable-notifications']
    }
  },
  onPrepare: () => {
    browser.driver.manage().window().maximize();
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: './reports/xml',
      filePrefix: 'xmlresults'
    }));
    fs.emptyDir('./reports/screenshots', function (err) {
      console.log(err);
    });

    jasmine.getEnv().addReporter({
      specDone: function (result) {
        if (result.status == 'failed') {
          browser.getCapabilities().then(function (caps) {
            var browserName = caps.get('browserName');

            browser.takeScreenshot().then(function (png) {
              var stream = fs.createWriteStream('./reports/screenshots/' + browserName + '-' + result.fullName + '.png');
              stream.write(new Buffer(png, 'base64'));
              stream.end();
            });
          });
        }
      }
    });

  },

  onComplete: function () {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      platform = caps.get('platform');

      var HTMLReport = require('protractor-html-reporter-2');

      testConfig = {
        reportTitle: 'Protractor Test Execution Report',
        outputPath: './reports/',
        outputFilename: 'AutomationExecutionResult',
        screenshotPath: './screenshots',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform,
      };
      new HTMLReport().from('./reports/xml/xmlresults.xml', testConfig);
    });
    browser.quit()
  },
  directConnect: true

};