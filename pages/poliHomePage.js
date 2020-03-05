// page is non-angular
browser.ignoreSynchronization = true;
import BasePage from './basePage';
import search from './searchModule';

class PoliHomePage extends BasePage {
    constructor() {
        super();
        // include modules...
        this.search = search;

        this.posts = $$('div.post');
        this.merchantCodeTextField = element(by.id('txtMerchantCode'));
        this.amountField = element(by.id('PaymentAmount'));
        this.payButton = element(by.id('PayWithPOLi1'));   
        this.bankDropDown = element(by.id('bankdropdown')); 
        this.selectBank = element(by.cssContainingText('option', 'iBank AU 01'));
        this.userNameTxtField = element(by.xpath("//input[@name='Username']")); 
        this.passwordTxtField = element(by.xpath("//input[@name='Password']")); 
        this.loginBtn = element(by.css('button stp-button primary-button')); 
        this.spinner = element(by.id('processingLabel'));
        this.continueBtn = element(by.id('proceed-button'));
        this.continueNextBtn = element(by.cssContainingText('type','Continue'));
        this.postTitleLinks = $$('h2 a');
        this.siteTitle = $('h1 a');
        // sidebar...
        this.sidebar = $('div#sidebar');
        // social media links....
        this.githubLink = $('a#githubLink');
        // pagination
        this.prevPageLink = element(by.cssContainingText('a', '← Older Entries'));

        this.url = 'https://demo.tst1.paywithpoli.com/PriceBuster/TestCheckout.aspx';
        // pageLoaded is used by `.loaded()` to test that we're on a page
        this.pageLoaded = this.hasText(this.merchantCodeTextField, 'PriceBusterDVD_AU');
    }

     /**
     * check if a post title exists
     * @param  {string} text
     * @return {promise}
     */
    async merchantText(text) {
        await this.merchantCodeTextField.clear();
        return this.merchantCodeTextField.sendKeys(text);
    }

     /**
     * check if a post title exists
     * @param  {string} text
     * @return {promise}
     */
    async enterAmount(text) {
        await this.amountField.clear();
        return this.amountField.sendKeys(text);
    }

      /**
     * check if a post title exists
     * @param  {string} text
     * @return {promise}
     */
    async clickPayButon() {
        return this.payButton.click();
    }

     /**
     * check if a post title exists
     * @return {promise}
     */
    async selectBankFromDropDown() {
        await this.bankDropDown.click();
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf(this.selectBank), 50000);
        await this.selectBank.click();
        return this.continueBtn.click();
    }

     /**
     * check if a post title exists
     * @return {promise}
     */
    async handleSpinner() {
        browser.ignoreSynchronization = true;
        browser.manage().timeouts().implicitlyWait(25000);
        var until = protractor.ExpectedConditions;
        browser.wait(until.presenceOf(this.spinner), 1000000, 'Element taking too long to appear in the DOM');
        return await this.spinner.isPresent();
    }

     /**
     * check if a post title exists
     * @param  {string} text
     * @return {promise}
     */
    async enterUserNameandPwd() {
        browser.manage().timeouts().implicitlyWait(25000);
        browser.ignoreSynchronization = true;
        var until = protractor.ExpectedConditions;
        browser.wait(until.presenceOf(this.userNameTxtField), 100000, 'Element taking too long to appear in the DOM');
        await this.userNameTxtField.sendKeys("DemoShopper");
        await this.passwordTxtField.sendKeys("DemoShopper");
        browser.manage().timeouts().implicitlyWait(25000);
        await BasePage.hitEnter();
        browser.ignoreSynchronization = true;
        browser.manage().timeouts().implicitlyWait(100000);
        browser.wait(until.presenceOf(this.continueNextBtn), 100000, 'Element taking too long to appear in the DOM');
        return this.continueNextBtn.click();
    }
 
    /**
     * check if a post title exists
     * @param  {string} postTitle
     * @return {bool}
     */
    postTitleExists(postTitle) {
        return element(by.cssContainingText('a', postTitle)).isPresent();
    }

    /**
     * Page back till we find the post title
     * or run out of previous posts
     * @param  {string} postTitle
     * @return {bool}
     */
    async findPostByPaging(postTitle) {
        return await this.postTitleExists(postTitle).then(found => {
            if(found) {
                // found it!
                return true;
            } else {
                // prevPageLink not displayed on first page
                return this.prevPageLink.isPresent().then(async yup => {
                    if(yup) {
                        await this.prevPageLink.click();
                        await this.findPostByPaging(postTitle); // call recursively till found...
                        // wait for page to load...
                        await this.loaded();
                    } else {
                        // post not found
                        return false;
                    }
                });
            }
        });
    }
}
export default new PoliHomePage();