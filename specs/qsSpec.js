/**
 * Exammple tests of non-angular site...
 */
import qsHomePage from '../pages/poliHomePage';
import githubPage from '../pages/githubPage';

describe('Poli Ineternet Banking', () =>  {
	beforeEach(async () =>  {
		browser.ignoreSynchronization = true;
		browser.manage().timeouts().implicitlyWait(25000);
		await qsHomePage.goto();
	});

	it('Replace Merchant Code with 6100550', async () => {
		await qsHomePage.merchantText("6100550");
		await qsHomePage.enterAmount("10.03");
		await qsHomePage.clickPayButon();
		await qsHomePage.selectBankFromDropDown();
		await qsHomePage.handleSpinner();
		return qsHomePage.enterUserNameandPwd();
	});
	
});