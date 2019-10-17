module.exports = function afterTest(test) {
  if (test.error) {
    browser.takeScreenshot();
  }
};
