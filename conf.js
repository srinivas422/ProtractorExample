var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

// solves `SyntaxError: Unexpected token import`
require("babel-register")({
    presets: [ 'es2015' ]
});

exports.config = {
    /**
     *  Uncomment ONE of the following to connect to: seleniumServerJar OR directConnect. Protractor
     *  will auto-start selenium if you uncomment the jar, or connect directly to chrome/firefox
     *  if you uncomment directConnect.
     */
    //seleniumServerJar: "node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.4.0.jar",
    directConnect: true,
    SELENIUM_PROMISE_MANAGER: false,

    specs: [
    // 'specs/friendSpec.js',
    // 'specs/nonAngularLoginSpec.js',
    'specs/qsSpec.js'
    ],
    baseUrl: 'https://demo.tst1.paywithpoli.com/PriceBuster/TestCheckout.aspx',
    framework: 'jasmine2',

    // Setup the report before any tests start
       
    onPrepare: function() {
        onPrepare: async () => {
            await browser.waitForAngularEnabled(false);
        }  
        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
        savePath: './test/reports/',
        fileName: 'testresultsreport',
        showQuickLinks: true,
        reportTitle: "Test results Summary",
        reportFailedUrl: true,
        inlineImages: true,
        ignoreSkippedSpecs: true,
        userJs: 'script.js'
     }));
   },

    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 1,
        chromeOptions: {
            args: [
                // disable chrome's wakiness
                '--disable-infobars',
                '--disable-extensions',
                'verbose',
                'log-path=/tmp/chromedriver.log'
            ],
            prefs: {
                // disable chrome's annoying password manager
                'profile.password_manager_enabled': false,
                'credentials_enable_service': false,
                'password_manager_enabled': false
            }
        }
    },

    jasmineNodeOpts: {
        showColors: true,
        displaySpecDuration: true,
        // overrides jasmine's print method to report dot syntax for custom reports
        print: () => {},
        defaultTimeoutInterval: 50000
    }
};