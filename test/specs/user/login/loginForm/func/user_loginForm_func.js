import { expect } from 'chai';
const loginAction = require('../../../actions/loginAction');
import { user } from '../../../constants';
import { url } from '../../../../../constants';

const elements = {
  h1: {
    selector: '//h1',
    text: 'User Login',
  },
};

describe('User --- Login Form --- Func', () => {
  before(() => {
    browser.url(url.loginUrl);
  });

  it('should have correct h1', () => {
    const actualH1Text = $(elements.h1.selector).getText();
    expect(actualH1Text).to.eq(elements.h1.text);
  });

  it('should email', () => {
    loginAction(browser);
  });

  it('should redirected to user profile page', () => {
    const currentUrl = browser.getUrl();
    const profileUrl = `${url.baseUrl}/user/${user.admin.id}`;
    expect(currentUrl).eq(profileUrl);
  });

  it('should have success h1', () => {
    const userName = user.admin.name;
    const h1 = $('//h1').getText();
    expect(h1).to.eq(userName);
  });
});
