const { expect } = require('chai');
const loginAction = require('./actions/loginAction');

describe('-----', () => {
  before(() => {
    loginAction(browser);
  });

  it('should have correct h1', () => {
    const selector = '';
    const element = $(selector);
    const actual = element.getText();
    const expected = '';

    expect(actual).to.eq(expected);
  });

});

