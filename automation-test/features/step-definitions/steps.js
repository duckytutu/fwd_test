const { Given, When, Then } = require("@cucumber/cucumber");
const demoPage = require("../pages/demo.page");

Given("The user in on demo page", () => {
  demoPage.open();
});

When("calculate sum assured by premium", (data) => {
  const [params] = data.hashes();
  demoPage.inputParams(params);
});

When("click on Calculate button", () => {
  demoPage.calculateButton.click();
  browser.pause(100);
});

Then("Show list quotation product base on annual premium", () => {
  expect(demoPage.tableRows.length).toBeGreaterThan(1);
  browser.pause(2000);
});
