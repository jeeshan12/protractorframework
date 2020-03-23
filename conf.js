var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');


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
      args: ['--disable-notifications', '--headless', '--no-sandbox']
    }
  },
  onPrepare: () => {
    browser.driver.manage().window().maximize();
    jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
      savePath: './target/reports/',
      screenshotsFolder: './target/screeshots/',
      takeScreenshotsOnlyOnFailures: true,
      fileNamePrefix: 'Specs',
      cleanDestination: true,
      fileNameSeparator: '_',
      fileNameDateSuffix: true,
      takeScreenshots: true

    }))

  },

  directConnect: true

};