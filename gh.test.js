let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  }, 16000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 18000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  }, 20000);
});

describe("Github header tests", () => {
  test("The h2 header content 'Pricing'", async () => {
    await page.goto("https://github.com/pricing");
    const element = "#billing-frequency-header";
    const actual = await page.$eval(element, link => link.textContent);
    expect(actual).toEqual('How often do you want to pay?');
  }, 6000);

  test("The h1 header content 'sign-up'", async () => {
    await page.goto("https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2Fpricing&source=header");
    const element = "#email-container > div > label";
    const actual = await page.$eval(element, link => link.textContent);
    expect(actual).toContain('Enter your email');
  }, 10000);

  test("The h1 header content 'sign-in'", async () => {
    await page.goto("https://github.com/login");
    const element = ".auth-form-header.p-0"
    const actual = await page.$eval(element, link => link.textContent);
    expect(actual).toContain('Sign in to GitHub');
  }, 6000);
});
