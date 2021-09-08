class DemoPage {
  open() {
    browser.url("http://localhost:3000");
  }

  inputParams(params) {
    $("#gender").parentElement().$('[title="Open"]').click();
    browser.pause(100);
    $("#gender-option-0").click();

    $("[name=dob]").setValue(params.dob);

    $("#planCode").parentElement().$('[title="Open"]').click();
    browser.pause(100);
    $("#planCode-option-0").click();

    $("#paymentFrequency").parentElement().$('[title="Open"]').click();
    browser.pause(100);
    $("#paymentFrequency-option-0").click();

    $("[name=calculateMethod]").parentElement().click();
    browser.pause(100);
    $("#menu-calculateMethod").$('[data-value="0"]').click();
    $("[name=premiumPerYear]").setValue(params.premiumPerYear || 0);

    browser.pause(100);
  }

  get calculateButton() {
    return $("[name=calculateButton]");
  }

  get tableRows() {
    return $$(".MuiTableRow-root");
  }
}

module.exports = new DemoPage();
