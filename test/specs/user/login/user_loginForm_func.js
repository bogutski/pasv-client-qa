import { expect } from 'chai';
import loginAction from '../_actions/loginAction';
import { user } from '../_data/data';
import { url } from '../../constants';

const elements = {
  h1: {
    selector: '//h1',
    initialText: 'User Login',
    userProfileText: 'User Login',
  },
};

describe('User - Login Form - Func', () => {
  before(() => {
    browser.url(url.login);
  });

  it('should login page have a correct h1', () => {
    const actualH1Text = $(elements.h1.selector).getText();
    expect(actualH1Text).to.eq(elements.h1.initialText);
  });

  it('should fill login form', () => {
    loginAction(browser);
  });

  it('should verify correct h1 after submit form', () => {
    browser.waitUntil(
      () => {
        return $(elements.h1.selector).getText() === user.admin.name;
      },
      5000,
      'expected text to be different after 5s',
    );
  });

  it('should verify redirect to user profile page', () => {
    const currentUrl = browser.getUrl();
    const profileUrl = `${url.baseUrl}/user/${user.admin.id}`;
    expect(currentUrl).eq(profileUrl);
  });
});
