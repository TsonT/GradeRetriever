const puppeteer = require('puppeteer');

let url = 'https://wcpss.powerschool.com/public/';

(async function main()
{
	const browser = await puppeteer.launch({headless : true});
	const page = await browser.newPage();
	await page.goto(url);
	
	await page.waitForSelector('.button-row');
	const signInLink = await page.$x("//a[contains(., 'Student Sign In')]");
	await signInLink[0].click();

	await page.waitForSelector('.placeholder-text');
	await page.type('#identification', '9354404');
	await page.keyboard.press('Enter');

	await page.waitForNavigation({ waitUntil: 'networkidle2' });
	await page.select('select#ember468', '348f84c0-768c-11e8-82fa-02f23e86e7ae');
	await page.type('#identification', 'tntran2');
	await page.keyboard.press('Enter');

	await page.waitFor('#ember542');
	await page.type('#ember542', 'asdf');
	await page.keyboard.press('Enter');

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = mm + '_' + dd + '_' + yyyy;

	await page.waitForSelector('#legend');
	await page.screenshot({ path: today + '.jpeg', type: 'jpeg', fullPage : true });

	await browser.close();

})();